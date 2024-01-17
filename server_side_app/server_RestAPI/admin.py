from django.contrib import admin
from .models import Category, SizeVariant,Product, ProductVariant, Customer, Order, OrderDetail, ProductImage, Size, CustomerAccount

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    
class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1
    
class SizeVariantInline(admin.TabularInline):
    model = SizeVariant
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price')
    list_filter = ('category',)
    filter_horizontal = ('sizes',) 
    
@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'product_variant', 'image')
    list_filter = ['product_variant__product', 'product_variant']

    def product_variant(self, obj):
        return obj.product_variant

@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_filter = ['id', 'name']

@admin.register(SizeVariant)
class SizeVariantAdmin(admin.ModelAdmin):
    list_display = ('product_variant', 'size', 'stock_quantity')
    list_filter = ['product_variant', 'size', 'stock_quantity']

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'color')
    list_filter = ('product', 'color')
    inlines = [ProductImageInline, SizeVariantInline]

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

@admin.register(CustomerAccount)
class CustomerAccountAAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'password')
    list_filter = ('first_name', 'last_name', 'email')
