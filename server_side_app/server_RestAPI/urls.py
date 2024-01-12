from django.urls import path

from . import views

urlpatterns = [
    path('products/', views.AllProductsView.as_view(), name='show_products'),
    path('products/<int:product_id>/', views.ProductView.as_view(), name='show_product'),
    path('orders/', views.CreateOrderView.as_view(), name='create_order')
] 
