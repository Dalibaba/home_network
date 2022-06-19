from django.urls import path
from .views import SensorView

urlpatterns = [
    path('sensor', SensorView.as_view())
]
