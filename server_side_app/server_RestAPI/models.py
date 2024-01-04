from django.db import models

# Create your models here.
class NewsletterClient(models.Model):
    newsletter_client_id = models.BigAutoField(primary_key=True)
    email = models.EmailField(max_length=50, null=False)
    

class ClientAddress(models.Model):
    address_id = models.BigAutoField(primary_key=True)
    city = models.CharField(max_length=40, null=True)
    voivodeship = models.CharField(max_length=40, null=True)
    zip_code = models.CharField(max_length=60, null=True)
    house_number = models.IntegerField(null=True)
    apartment_number = models.IntegerField(null=True)
    street = models.CharField(max_length=100, null=True)


class ClientDetail(models.Model):
    client_detail_id = models.BigAutoField(primary_key=True)
    email = models.CharField(max_length=50, unique=True)
    password_hash = models.CharField(max_length=256, null=True)
    phone_number = models.CharField(max_length=20, null=False)


class Client(models.Model):
    client_id = models.BigAutoField(primary_key=True)
    first_name = models.CharField(max_length=40, null=False, default='')
    last_name = models.CharField(max_length=40, null=False, default='')
    address_id = models.ForeignKey(ClientAddress, on_delete=models.RESTRICT, null=False)
    account_created_at = models.DateTimeField(auto_now_add=True, null=True)
    has_account = models.BooleanField(default=False, null=False)


class Size(models.Model):
    size_id = models.BigAutoField(primary_key=True)
    size_s = models.IntegerField('S', default=0, null=False)
    size_m = models.IntegerField('M', default=0, null=False)
    size_l = models.IntegerField('L', default=0, null=False)
    size_xl = models.IntegerField('XL', default=0, null=False)


class Product(models.Model):
    product_id = models.BigAutoField(primary_key=True)
    product_name = models.CharField(max_length=40, null=False)
    netto_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    brutto_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    description = models.TextField(null=False)
    color = models.CharField(max_length=20, null=False)
    size_id = models.ForeignKey(Size, on_delete=models.RESTRICT, null=False)


class Photo(models.Model):
    photo_id = models.BigAutoField(primary_key=True)
    photo = models.CharField(max_length=40)
    product_id = models.ForeignKey(Product, on_delete=models.RESTRICT)
    date_added = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    photo_name = models.CharField(max_length=50, null=False)


class Order(models.Model):
    order_id = models.BigAutoField(primary_key=True)
    client_id = models.ForeignKey(Client, on_delete=models.RESTRICT)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    order_datetime = models.DateTimeField(auto_now_add=True)
    comments = models.TextField(null=False)


class OrderItem(models.Model):
    order_item_id = models.BigAutoField(primary_key=True)
    product_id = models.ForeignKey(Product, on_delete=models.RESTRICT)
    order_id = models.ForeignKey(Order, on_delete=models.RESTRICT)
    product_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    quantity = models.IntegerField(null=False)


