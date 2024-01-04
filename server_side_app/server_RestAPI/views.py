

from django.http import JsonResponse, Http404
from django.core.serializers import serialize
from .models import Product


# Create your views here.
def show_products(request):
    products = Product.objects.all()
    return JsonResponse({'products': serialize('json', products)})


def show_product(request, product_id):
    try:
        product = Product.objects.filter(pk=product_id)
    except Product.DoesNotExist:
        return Http404('Product does not exist')
    return JsonResponse({'product': serialize('json', product)})

