# Configuración de la aplicación "products" dentro del proyecto Django.
# Django la usa para registrar la app y aplicar sus ajustes al iniciar el servidor.

from django.apps import AppConfig


class ProductsConfig(AppConfig):

    # Tipo de campo que Django usará por defecto para las claves primarias
    # BigAutoField genera enteros de 64 bits, lo que evita quedarse sin ids
    default_auto_field = 'django.db.models.BigAutoField'

    # Nombre interno de la app, debe coincidir con el nombre de la carpeta
    name = 'products'