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


