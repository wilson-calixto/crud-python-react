import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from types import SimpleNamespace
from apps.products.domain.models import Product

@pytest.fixture
def authenticated_client(db):
    user = User.objects.create_user(username='test', password='pass')
    user.perfil = SimpleNamespace(plano_ativo=True)
    client = APIClient()
    client.force_authenticate(user=user)
    return client

# -------- /api/products/ (collection) --------
def test_list_products_requires_auth(db):
    client = APIClient()
    response = client.get('/api/products/')
    assert response.status_code == 401

def test_list_products_returns_paginated(authenticated_client, db):
    # criar alguns produtos
    for i in range(3):
        Product.objects.create(name=f'P{i}', price=10, stock=1)
    resp = authenticated_client.get('/api/products/')
    assert resp.status_code == 200
    assert 'results' in resp.data
    assert resp.data['count'] == 3

def test_create_product_valid(authenticated_client, db):
    data = {"name": "Mouse", "price": "30.00", "stock": 5}
    resp = authenticated_client.post('/api/products/', data)
    assert resp.status_code == 201
    assert resp.data['name'] == "Mouse"

def test_create_product_invalid_price(authenticated_client, db):
    data = {"name": "BadMouse", "price": "-5", "stock": 2}
    resp = authenticated_client.post('/api/products/', data)
    assert resp.status_code == 400
    assert 'price' in resp.data

# -------- /api/products/{id}/ (detail) --------
@pytest.fixture
def product(db):
    return Product.objects.create(name='Keyboard', price=50, stock=4)

def test_retrieve_product_success(authenticated_client, product):
    resp = authenticated_client.get(f'/api/products/{product.id}/')
    assert resp.status_code == 200
    assert resp.data['name'] == 'Keyboard'

def test_retrieve_product_not_found(authenticated_client):
    resp = authenticated_client.get('/api/products/999/')
    assert resp.status_code == 404

def test_update_product_valid(authenticated_client, product):
    data = {"name": "Keyboard Pro", "price": "55.00", "stock": 4}
    resp = authenticated_client.put(f'/api/products/{product.id}/', data)
    assert resp.status_code == 200
    assert resp.data['name'] == "Keyboard Pro"

def test_update_product_invalid_price(authenticated_client, product):
    data = {"name": "BadKeyboard", "price": "-1.00", "stock": 2}
    resp = authenticated_client.put(f'/api/products/{product.id}/', data)
    assert resp.status_code == 400
    assert 'price' in resp.data

def test_delete_product_soft(authenticated_client, product):
    resp = authenticated_client.delete(f'/api/products/{product.id}/')
    assert resp.status_code == 204
    # Produto deve estar inativo
    product.refresh_from_db()
    assert product.is_active is False

def test_delete_product_then_get_not_found(authenticated_client, db, product):
    authenticated_client.delete(f'/api/products/{product.id}/')
    resp = authenticated_client.get(f'/api/products/{product.id}/')
    assert resp.status_code == 404

