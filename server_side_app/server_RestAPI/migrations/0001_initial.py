# Generated by Django 5.0 on 2024-01-19 03:42

import ckeditor.fields
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phone', models.CharField(max_length=15)),
                ('street', models.CharField(max_length=255)),
                ('house_number', models.CharField(max_length=10)),
                ('apartment_number', models.CharField(blank=True, max_length=10, null=True)),
                ('city', models.CharField(max_length=100)),
                ('postal_code', models.CharField(max_length=10)),
                ('province', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='CustomerAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=100, null=True)),
                ('last_name', models.CharField(blank=True, max_length=100, null=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('phone', models.CharField(blank=True, default='', max_length=15)),
                ('street', models.CharField(blank=True, default='', max_length=255)),
                ('house_number', models.CharField(blank=True, default='', max_length=10)),
                ('apartment_number', models.CharField(blank=True, default='', max_length=10)),
                ('city', models.CharField(blank=True, default='', max_length=100)),
                ('postal_code', models.CharField(blank=True, default='', max_length=10)),
                ('province', models.CharField(blank=True, default='', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Subscriber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_date', models.DateTimeField(auto_now_add=True)),
                ('details', models.CharField(max_length=100)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('completed', models.BooleanField(default=False)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server_RestAPI.customer')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server_RestAPI.category')),
                ('sizes', models.ManyToManyField(to='server_RestAPI.size')),
            ],
        ),
        migrations.CreateModel(
            name='ProductVariant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(max_length=50)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server_RestAPI.product')),
            ],
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='product_images/')),
                ('product_variant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='server_RestAPI.productvariant')),
            ],
        ),
        migrations.CreateModel(
            name='OrderDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('unit_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server_RestAPI.order')),
                ('product_variant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server_RestAPI.productvariant')),
            ],
        ),
        migrations.CreateModel(
            name='SizeVariant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stock_quantity', models.IntegerField()),
                ('product_variant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='size_variants', to='server_RestAPI.productvariant')),
                ('size', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server_RestAPI.size')),
            ],
        ),
        migrations.CreateModel(
            name='EmailTemplate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=255)),
                ('message', ckeditor.fields.RichTextField()),
                ('send_to_all', models.BooleanField(default=False)),
                ('recipients', models.ManyToManyField(blank=True, to='server_RestAPI.subscriber')),
            ],
        ),
    ]
