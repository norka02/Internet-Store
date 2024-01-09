from rest_framework import serializers
from .models import *



class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = [
            'size_id',
            'size_s',
            'size_m',
            'size_l',
            'size_xl',
        ]


class ProductSerializer(serializers.ModelSerializer):
    size_id = SizeSerializer(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'product_id', 
            'product_name', 
            'netto_price', 
            'brutto_price', 
            'description', 
            'color',
            'size_id'
        ]


class ClientDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientDetail
        fields = [
            'client_detail_id',
            'email',
            'password_hash',
            'phone_number',
        ]


class ClientAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientAddress
        fields = [
            'address_id',
            'city',
            'voivodeship',
            'zip_code',
            'house_number',
            'apartment_number',
            'street',
        ]


class ClientSerializer(serializers.ModelSerializer):
    address_id = ClientAddressSerializer(read_only=True)
    client_detail_id = ClientDetailSerializer(read_only=True)
    
    class Meta:
        model = Client
        fields = [
            'client_id',
            'first_name',
            'last_name',
            'address_id',
            'client_detail_id',
            'account_created_at',
            'has_account',
        ]
        
        

class OrderSerializer(serializers.ModelSerializer):
    client_id = ClientSerializer()
    # order_details = OrderDetailSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'order_id',
            'client_id',
            'price',
            'order_datetime',
            'comments',
            'order_details',
        ]


class OrderDetailSerializer(serializers.ModelSerializer):
    product_id = ProductSerializer(read_only=True)
    order_id = OrderSerializer(many=True)
    
    class Meta:
        model = OrderDetail
        fields = [
            'order_detail_id',
            'product_id',
            'order_id',
            'product_price',
            'quantity',
        ]

