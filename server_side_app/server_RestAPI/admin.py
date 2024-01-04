from django.contrib import admin
from .models import *


# Register your models here.

admin.site.register(Product)
admin.site.register(Photo)
admin.site.register(Order)
admin.site.register(Client)
admin.site.register(OrderDetail)
admin.site.register(NewsletterClient)
admin.site.register(Size)
admin.site.register(ClientAddress)
admin.site.register(ClientDetail)

