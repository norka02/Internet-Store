from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, AbstractUser


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
    # password = models.CharField(max_length=128)
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
    


# class CustomerAccountManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError('The Email field must be set')
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)

#         return self.create_user(email, password, **extra_fields)


# class CustomerAccount(AbstractBaseUser, PermissionsMixin):
#     first_name = models.CharField(max_length=100, null=True, blank=True)
#     last_name = models.CharField(max_length=100, null=True, blank=True)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=128)

#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)

#     objects = CustomerAccountManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['first_name', 'last_name']

#     def __str__(self):
#         return self.email





# class CustomerAccount(AbstractUser):
#     first_name = models.CharField(max_length=100, null=True, blank=True)
#     last_name = models.CharField(max_length=100, null=True, blank=True)
    
#     # Pole `password` jest dziedziczone z `AbstractUser`
    
#     # Dodaj pole username z wartością domyślną, na przykład 'default_username'
#     username = models.CharField(max_length=150, unique=True, default='default_username')

#     objects = CustomerAccountManager()

#     def __str__(self):
#         return self.email



###################################

# class CustomerAccount(AbstractBaseUser):
#     first_name = models.CharField(max_length=100)
#     last_name = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=128)

#     # Pole USERNAME_FIELD określa, które pole jest używane jako nazwa użytkownika.
#     USERNAME_FIELD = 'email'

#     # Pole REQUIRED_FIELDS określa, które pola są wymagane przy tworzeniu nowego użytkownika.
#     REQUIRED_FIELDS = ['password']

#     def __str__(self):
#         return f"{self.first_name} {self.last_name}"
    
#     def save(self, *args, **kwargs):
#         super().save(*args, **kwargs)
#         return self
    
# class CustomerAccountManager(BaseUserManager):
#     def create_user(self, email, first_name, last_name, password=None, **extra_fields):
#         if not email:
#             raise ValueError('The Email field must be set')
#         email = self.normalize_email(email)
#         user = self.model(email=email, first_name=first_name, last_name=last_name, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)

#         return self.create_user(email, first_name, last_name, password, **extra_fields)

#     def get_by_natural_key(self, email):
#         return self.get(email=email)