# Generated by Django 4.0.5 on 2022-06-20 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_rename_humidity_humidity_value_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='humidity',
            name='time',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='temperature',
            name='time',
            field=models.TimeField(),
        ),
    ]