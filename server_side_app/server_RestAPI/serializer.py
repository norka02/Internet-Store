from rest_framework import serializers
from .models import Category, Product, ProductVariant, Customer, Order, OrderDetail

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'price']

class ProductVariantSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = ProductVariant
        fields = ['id', 'product', 'size', 'color', 'stock_quantity']

class CustomerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Customer
        fields = ['first_name', 'last_name', 'email', 'phone', 'street', 'house_number', 'apartment_number', 'city', 'postal_code', 'province']


class OrderDetailSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer()

    class Meta:
        model = OrderDetail
        fields = ['product_variant', 'color', 'quantity']


class OrderSerializer(serializers.Serializer):
    customer = CustomerSerializer()
    items = OrderDetailSerializer(many=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    
    def create(self, validated_data):
        customer_data = validated_data.pop('customer')
        item_data = validated_data.pop('items')
        total_amount = validated_data.pop('total_amount')
        customer, created = Customer.objects.get_or_create(
            email=customer_data['email'],
            defaults={key: customer_data[key] for key in customer_data}
        )

        order = Order.objects.create(customer=customer, total_amount=validated_data['total_amount'])

        items_data = validated_data.pop('items')
        for item_data in items_data:
            OrderDetail.objects.create(order=order, **item_data)

        return order









