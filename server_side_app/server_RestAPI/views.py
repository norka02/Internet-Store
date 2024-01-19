from django.http import JsonResponse, Http404
from django.core.serializers import serialize
from .models import Product, OrderDetail, CustomerAccount
from .serializer import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.db import transaction
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.generics import UpdateAPIView


class NewsletterSubscriptionView(APIView):
    def post(self, request):
        serializer = SubscriberSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']

            if Subscriber.objects.filter(email=email).exists():
                return Response({"error": "Ten adres email jest już zapisany do newslettera."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Zapisz nowego subskrybenta
            Subscriber.objects.create(email=email)
            return Response({"message": "Zapisano do newslettera!"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AllProductsView(APIView):
    def get(self, request):
        products = ProductVariant.objects.all()
        serializer = ProductVariantSerializer(products, many=True)
        return Response(serializer.data)
        

class ProductView(APIView):
    def get(self, request, product_id):
        try:
            product = ProductVariant.objects.get(id=product_id)
            serializer = ProductVariantSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({"error": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND)




class CreateOrderView(APIView):
    def post(self, request):
        with transaction.atomic():
            request_data = request.data
            customer_data = request_data['customer']
            items_data = request_data['items']
            total_amount = request_data['totalAmount']
            
            customer, created = Customer.objects.get_or_create(
                email=customer_data['email'],
                defaults={
                    'first_name': customer_data['firstName'],
                    'last_name': customer_data['lastName'],
                    'email': customer_data['email'],
                    'phone': customer_data['phone'],
                    'street': customer_data['street'],
                    'house_number': customer_data['houseNumber'],
                    'apartment_number': customer_data['apartmentNumber'],
                    'city': customer_data['city'],
                    'postal_code': customer_data['postalCode'],
                    'province': customer_data['province'],
                }) 
            
            order = Order(
                customer=customer,
                details="",
                total_amount=total_amount
            )
            order.save()
            
            for item_data in items_data:
                product_variant = ProductVariant.objects.get(
                    id=item_data['productVariantId']
                
                )
               
                order_detail = OrderDetail(
                    order=order,
                    product_variant=product_variant,
                    quantity=item_data['quantity'],
                    unit_price=product_variant.product.price
                )
                order_detail.save()
                
    

            return Response({"order_id": order.id}, status=status.HTTP_201_CREATED)

            return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class RegisterCustomer(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            # Sprawdź, czy email już istnieje w bazie danych
            existing_user = Customer.objects.filter(email=serializer.validated_data['email']).first()
            if existing_user:
                return Response({'error': 'Użytkownik o podanym adresie email już istnieje.'}, status=status.HTTP_400_BAD_REQUEST)
            
            customer = CustomerAccount.objects.create(
                email=serializer.validated_data['email'],
                first_name=serializer.validated_data['first_name'],
                last_name=serializer.validated_data['last_name'],
                password=make_password(serializer.validated_data['password']),
    
            )
            return Response({'message': 'Rejestracja zakończona sukcesem'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginCustomer(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            # Sprawdź, czy istnieje użytkownik o podanym adresie email
            customer = CustomerAccount.objects.filter(email=email).first()

            if customer and check_password(password, customer.password):
                # Zaloguj użytkownika, możesz tutaj użyć tokenów JWT, sesji Django itp.
                # Utwórz token dostępu
                # refresh = RefreshToken.for_user(customer)
                # access_token = str(refresh.access_token)

                # return Response({'access_token': access_token}, status=status.HTTP_200_OK)
                return Response({}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Błędny adres email lub hasło'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerAccountView(UpdateAPIView):
    queryset = CustomerAccount.objects.all()
    serializer_class = CustomerAccountSerializer

    def update(self, request, *args, **kwargs):
        try:
            email_check = self.kwargs.get('email_check', None)
            customer = CustomerAccount.objects.get(email=email_check)

            # Wyodrębnij tylko te pola, które są dostarczone w danych wejściowych
            partial_data = {key: request.data[key] for key in request.data.keys()}

            serializer = self.get_serializer(customer, data=partial_data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomerAccount.DoesNotExist:
            return Response(
                {"error": "Klient o podanym identyfikatorze nie istnieje. " + email_check},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": f"Wystąpił błąd: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
