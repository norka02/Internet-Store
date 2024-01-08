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

    def create(self, validated_data):
        client_data = validated_data.pop('client_id')
        order_details_data = validated_data.pop('order_details')

        # Tworzenie lub aktualizacja klienta
        client_address_data = client_data.pop('address_id')
        client_detail_data = client_data.pop('client_detail_id')
        client_address = ClientAddress.objects.create(**client_address_data)
        client_detail = ClientDetail.objects.create(**client_detail_data)
        client = Client.objects.create(address_id=client_address, client_detail_id=client_detail, **client_data)

        # Tworzenie zamówienia
        order = Order.objects.create(client_id=client, **validated_data)

        # Tworzenie szczegółów zamówienia
        for detail_data in order_details_data:
            OrderDetail.objects.create(order_id=order, **detail_data)

        return order


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

