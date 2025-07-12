from functools import wraps
from django.http import JsonResponse
from rest_framework import status

def checar_plano_ativo(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        usuario = getattr(request, "user", None)
        # Simples verificação de 'perfil'. Pode ser substituído por modelo real.
        if not getattr(getattr(usuario, "perfil", None), "plano_ativo", False):
            return JsonResponse({"detail": "Seu plano expirou. Faça upgrade para continuar."}, status=status.HTTP_400_BAD_REQUEST)
        return func(request, *args, **kwargs)
    return wrapper


 