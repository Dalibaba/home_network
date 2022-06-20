from django.apps import AppConfig
from django.apps import AppConfig
from threading import Thread


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        from . import mqtt

        mqtt.client.loop_start()
