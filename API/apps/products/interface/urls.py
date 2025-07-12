from django.urls import path, include
from apps.products.interface import views

urlpatterns = [
    path('', include('apps.products.interface.views')),
]

