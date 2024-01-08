from django.urls import path

from . import views

urlpatterns = [
    path('products/', views.AllProductsView.as_view(), name='show_products'),
    path('products/<int:product_id>/', views.ProductView.as_view(), name='show_product'),
    path('basket/<int:order_id>', views.BasketView.as_view(), name='show_basket'),
    # path('orders/', views.OrderView.as_view(), name='create_order')
]
