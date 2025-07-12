# API de Produtos - Exemplos de cURL

Todas as rotas abaixo exigem autenticação via Token ou sessão.
Nos exemplos, substitua `<TOKEN>` pelo seu token de autenticação.

## Listar produtos (GET)

```bash
curl -X GET http://localhost:8000/api/products/ \
     -H "Authorization: Token <TOKEN>"
```

### Com filtros

```bash
curl -X GET "http://localhost:8000/api/products/?min_price=10&max_price=100&name=mouse" \
     -H "Authorization: Token <TOKEN>"
```

## Criar produto (POST)

```bash
curl -X POST http://localhost:8000/api/products/ \
     -H "Authorization: Token <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Mouse Gamer",
           "description": "RGB, 16000 DPI",
           "price": "150.99",
           "stock": 20
         }'
```

## Recuperar produto (GET)

```bash
curl -X GET http://localhost:8000/api/products/1/ \
     -H "Authorization: Token <TOKEN>"
```

## Atualizar produto (PUT)

```bash
curl -X PUT http://localhost:8000/api/products/1/ \
     -H "Authorization: Token <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Mouse Gamer Pro",
           "description": "Switches ópticos",
           "price": "199.99",
           "stock": 25
         }'
```

## Deletar produto (DELETE - Soft Delete)

```bash
curl -X DELETE http://localhost:8000/api/products/1/ \
     -H "Authorization: Token <TOKEN>"
```

## Documentação Swagger

Abra no navegador: `http://localhost:8000/api/docs/`

