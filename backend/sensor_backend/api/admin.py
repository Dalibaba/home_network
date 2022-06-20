from django.contrib import admin

# Register your models here.

from .models import Sensor, Humidity, Temperature

admin.site.register(Sensor)
admin.site.register(Humidity)
admin.site.register(Temperature)
