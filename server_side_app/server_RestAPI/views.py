from django.http import JsonResponse, Http404
from django.core.serializers import serialize
from .models import Product, OrderDetail, CustomerAccount
from .serializer import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.db import transaction
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
from rest_framework import generics




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
                    # product_id=item_data['productId'],
                    # size=item_data['size'],
                    # color=item_data['color']
                )
                # order_detail = OrderDetail(
                #     order=order,
                #     product_variant=product_variant,
                #     quantity=item_data['quantity'],
                #     unit_price=product_variant.product.price
                # )
                # order_detail.save()
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
                # phone=serializer.validated_data['phone', ''],
                # street=serializer.validated_data['street', ''],
                # house_number=serializer.validated_data['house_number', ''],
                # apartament_number=serializer.validated_data['apartament_number', ''],
                # city=serializer.validated_data['city', ''],
                # postal_code=serializer.validated_data['postal_code', ''],
                # province=serializer.validated_data['province', ''],
            )
            return Response({'message': 'Rejestracja zakończona sukcesem'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Both email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        if Customer.objects.filter(email=email).exists():
            return Response({'error': 'Email is already used'}, status=status.HTTP_400_BAD_REQUEST)

        user = Customer.objects.create_user(email=email, password=password)
        # Możesz także utworzyć obiekt UserProfile, jeśli potrzebujesz dodatkowych informacji o użytkowniku

        return Response({'success': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    

# class UserRegistrationView(generics.CreateAPIView):
#     serializer_class = UserRegistrationSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    

class LoginCustomer(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            # Sprawdź, czy istnieje użytkownik o podanym adresie e-mail
            user = authenticate(request, email=email, password=password)

            if user is not None:
                # Zaloguj użytkownika
                login(request, user)
                return Response({'message': 'Zalogowano pomyślnie'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Błędny adres e-mail lub hasło'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class LoginCustomer(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')

#         user = authenticate(request, email=email, password=password)

#         if user is not None:
#             login(request, user)
#             return Response({'success': 'User logged in successfully'}, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)