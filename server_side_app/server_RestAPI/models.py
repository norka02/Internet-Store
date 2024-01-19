from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, AbstractUser
from ckeditor.fields import RichTextField
from django.core.mail import send_mail
from django.conf import settings


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Size(models.Model):
    name = models.CharField(max_length=10)  # Example: 'S', 'M', 'L', etc.

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sizes = models.ManyToManyField(Size)

    def __str__(self):
        return self.name
    
class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    color = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.product.name} - {self.color}"
    

class SizeVariant(models.Model):
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name='size_variants')
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    stock_quantity = models.IntegerField()

    def __str__(self):
        return f"{self.product_variant.product.name} - {self.product_variant.color} - {self.size.name}"


class ProductImage(models.Model):
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='product_images/')

    def __str__(self) -> str:
        return f"Image for product variant id: {self.product_variant.id}"


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    street = models.CharField(max_length=255)
    house_number = models.CharField(max_length=10)
    apartment_number = models.CharField(max_length=10, blank=True, null=True)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=10)
    province = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    details = models.CharField(max_length=100)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"Order {self.id} - {self.customer}"


class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)


class CustomerAccount(models.Model):
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    phone = models.CharField(max_length=15, blank=True, default='')
    street = models.CharField(max_length=255, blank=True, default='')
    house_number = models.CharField(max_length=10, blank=True, default='')
    apartment_number = models.CharField(max_length=10, blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    postal_code = models.CharField(max_length=10, blank=True, default='')
    province = models.CharField(max_length=100, blank=True, default='')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    
    def __str__(self) -> str:
        return self.email
    

class EmailTemplate(models.Model):
    subject = models.CharField(max_length=255)
    message = RichTextField()
    recipients = models.ManyToManyField(Subscriber, blank=True)
    send_to_all = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.subject
    
    def send_emails(self):
        if self.send_to_all:
            emails = [subscriber.email for subscriber in Subscriber.objects.all()]
        else:
            emails = [subscriber.email for subscriber in self.recipients.all()]

        send_mail(
            self.subject,
            '', 
            settings.EMAIL_HOST_USER,
            emails,
            html_message=self.message,  
            fail_silently=False,
        )

