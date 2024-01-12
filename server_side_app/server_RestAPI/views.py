from django.http import JsonResponse, Http404
from django.core.serializers import serialize
from .models import Product, OrderDetail
from .serializer import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.db import transaction



class AllProductsView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
        

class ProductView(APIView):
    def get(self, request, product_id):
        try:
            product_variants = ProductVariant.objects.filter(product__id=product_id)
            if not product_variants:
                return Response({"error": "No variants found for the given product"}, status=status.HTTP_404_NOT_FOUND)
           
            serializer = ProductVariantSerializer(product_variants, many=True)
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
                    product_id=item_data['productId'],
                    size=item_data['size'],
                    color=item_data['color']
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