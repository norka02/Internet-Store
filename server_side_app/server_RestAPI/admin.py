from django.contrib import admin
from .models import Category, Product, ProductVariant, Customer, Order, OrderDetail, CustomerAccount

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price')
    list_filter = ('category',)

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'size', 'color', 'stock_quantity')
    list_filter = ('product', 'size', 'color')

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email', 'phone', 
                    'street', 'house_number', 'apartment_number', 'city', 
                    'postal_code', 'province')
    search_fields = ('first_name', 'last_name', 'email')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'order_date', 'details', 'total_amount')
    list_filter = ('details', 'order_date')
    search_fields = ('customer__first_name', 'customer__last_name', 'customer__email')

@admin.register(OrderDetail)
class OrderDetailAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product_variant', 'quantity', 'unit_price')
    list_filter = ('order', 'product_variant')

@admin.register(CustomerAccount)
class CustomerAccountAAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'password')
    list_filter = ('first_name', 'last_name', 'email')
