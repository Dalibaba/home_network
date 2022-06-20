from django.urls import path
from .views import SensorView, HumidityView, TemperatureView

urlpatterns = [
    path('sensor', SensorView.as_view()),
    path('temperature', TemperatureView.as_view()),
    path('humidity', HumidityView.as_view()),
]
