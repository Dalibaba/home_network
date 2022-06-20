from django.contrib import admin

# Register your models here.

from .models import Sensor, SensorValue, Room

admin.site.register(Sensor)
admin.site.register(SensorValue)
admin.site.register(Room)
