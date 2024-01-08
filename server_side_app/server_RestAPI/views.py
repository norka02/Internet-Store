from django.http import JsonResponse, Http404
from django.core.serializers import serialize
from .models import Product, OrderDetail
from .serializer import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status



class AllProductsView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
        

class ProductView(APIView):
    def get(self, request, product_id):
        try:
            product = Product.objects.get(pk=product_id)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({"error": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND)


class BasketView(APIView):
    def get(self, request, order_id):
        try:
            order_details = OrderDetail.objects.filter(order_id=order_id)
            serializer = OrderDetailSerializer(order_details, many=True)
            return Response(serializer.data)
        except OrderDetail.DoesNotExist:
            return Response({"error": "Order detail does not exist"}, status=status.HTTP_404_NOT_FOUND)


# class OrderView(APIView):
#     def post(self, request, *args, **kwargs):
#         # Przetwarzanie danych klienta
#         client_data = {
#             'first_name': request.data['firstName'],
#             'last_name': request.data['lastName'],
#             'address_id': {
#                 'city': request.data['city'],
#                 'house_number': request.data['houseNumber'],
#                 'street': request.data['street'],
#                 'zip_code': request.data['zipCode']
#             }
#         }
#         address_serializer = ClientAddressSerializer(data=client_data['address_id'])
#         if address_serializer.is_valid():
#             address = address_serializer.save()
#         else:
#             return Response(address_serializer.errors)

#         client_serializer = ClientSerializer(data=client_data)
#         if client_serializer.is_valid():
#             client = client_serializer.save()
#         else:
#             return Response(client_serializer.errors)

#         # Przetwarzanie danych zamówienia
#         order_data = {
#             'client_id': client,
#             'order_details': []
#         }
#         for item in request.data['cartItems']:
#             product = Product.objects.get(id=item['productId'])
#             size = getattr(Size.objects.get(id=product.size_id.id), item['sizeId'])
#             order_detail = {
#                 'product_id': product,
#                 'quantity': item['quantity'],
#                 'product_price': product.brutto_price  # Zakładając, że cena brutto jest ceną za sztukę
#             }
#             order_data['order_details'].append(order_detail)

#         order_serializer = OrderSerializer(data=order_data)
#         if order_serializer.is_valid():
#             order_serializer.save()
#             return Response({"message": "Order created successfully"}, status=status.HTTP_200_OK)
#         else:
#             return Response(order_serializer.errors)

#         return Response({"message": "Invalid data"}, status=400)