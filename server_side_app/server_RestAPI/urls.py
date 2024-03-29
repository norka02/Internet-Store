from django.urls import path

from . import views

urlpatterns = [
    path('products/', views.AllProductsView.as_view(), name='show_products'),
    path('products/<int:product_id>/', views.ProductView.as_view(), name='show_product'),
    path('orders/', views.CreateOrderView.as_view(), name='create_order'),
    path('register/', views.RegisterCustomer.as_view(), name='register_customer'),
    path('login/', views.LoginCustomer.as_view(), name='login_customer'),
    path('customerInfoUpdate/<str:email_check>/', views.CustomerAccountView.as_view(), name='customerInfoUpdate'),    
    path('newsletter/', views.NewsletterSubscriptionView.as_view(), name='subscribe-newsletter'),
] 
