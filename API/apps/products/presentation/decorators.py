from functools import wraps
from django.http import JsonResponse

def checar_plano_ativo(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        usuario = getattr(request, "user", None)
        if not usuario or not usuario.is_authenticated:
            return JsonResponse({"detail": "Autenticação obrigatória."}, status=401)

        # Simples verificação de 'perfil'. Pode ser substituído por modelo real.
        if not getattr(getattr(usuario, "perfil", None), "plano_ativo", False):
            return JsonResponse({"detail": "Seu plano expirou. Faça upgrade para continuar."}, status=402)
        return func(request, *args, **kwargs)
    return wrapper

