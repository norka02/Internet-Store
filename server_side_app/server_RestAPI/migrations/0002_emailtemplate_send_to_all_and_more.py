# Generated by Django 5.0 on 2024-01-19 01:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server_RestAPI', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='emailtemplate',
            name='send_to_all',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='emailtemplate',
            name='recipients',
            field=models.ManyToManyField(blank=True, to='server_RestAPI.subscriber'),
        ),
    ]
