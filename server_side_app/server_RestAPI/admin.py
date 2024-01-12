from django.contrib import admin
from .models import Category, Product, ProductVariant, Customer, Order, OrderDetail, ProductImage

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    
class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price')
    list_filter = ('category',)
    inlines = [ProductImageInline, ProductVariantInline]
    
@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'image')
    list_filter = ['product']

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
    list_display = ('id', 'customer', 'order_date', 'details', 'total_amount', 'completed')
    list_filter = ('details', 'order_date', 'completed')
    search_fields = ('customer__first_name', 'customer__last_name', 'customer__email')
    list_editable = ['completed']
    
@admin.register(OrderDetail)
class OrderDetailAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product_variant', 'quantity', 'unit_price')
    list_filter = ('order', 'product_variant')
