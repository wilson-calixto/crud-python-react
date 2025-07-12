from drf_spectacular.utils import extend_schema, OpenApiExample
from django.urls import path
from django.views.decorators.cache import cache_page
from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_protect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from apps.products.domain.models import Product
from apps.products.presentation.serializers import ProductSerializer
from apps.products.presentation.decorators import checar_plano_ativo
from apps.products.infrastructure.filters import ProductFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination

@csrf_protect
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_products(request):
    queryset = Product.objects.filter(is_active=True)
    filterset = ProductFilter(request.GET, queryset=queryset)
    paginator = PageNumberPagination()
    paginator.page_size = 10
    result_page = paginator.paginate_queryset(filterset.qs, request)
    serializer = ProductSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

 
@extend_schema(
    request=ProductSerializer,
    responses={201: ProductSerializer},
    examples=[
        OpenApiExample(
            "Exemplo de criação de produto",
            value={
                "name": "Teclado Gamer",
                "description": "Teclado com RGB e switch azul",
                "price": "349.90",
                "stock": 10,
                "is_active": True
            },
            request_only=True
        )
    ]
)
@api_view(['POST'])
def create_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    operation_id="detalhar_produto",
    responses={200: ProductSerializer},
    summary="Detalha um produto",
    description="Retorna as informações completas de um único produto pelo ID."
)
@csrf_protect
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def retrieve_product(request, pk):
    product = get_object_or_404(Product, pk=pk, is_active=True)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@extend_schema(
    request=ProductSerializer,
    responses={200: ProductSerializer},
    examples=[
        OpenApiExample(
            "Exemplo de atualização de produto",
            value={
                "name": "Teclado Mecânico Atualizado",
                "description": "Teclado RGB com switches marrons",
                "price": "299.99",
                "stock": 15,
                "is_active": True
            },
            request_only=True
        )
    ]
)
@csrf_protect
@api_view(['PUT'])
def update_product(request, pk):
    product = get_object_or_404(Product, pk=pk, is_active=True)
    serializer = ProductSerializer(product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_protect
@checar_plano_ativo
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_product(request, pk):
    product = get_object_or_404(Product, pk=pk, is_active=True)
    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



urlpatterns = [
    path('products/', list_products),
    path('products/create', create_product),
    path('products/<int:pk>/', retrieve_product),
    path('products/update/<int:pk>/', update_product),
    path('products/delete/<int:pk>/', delete_product),
]
