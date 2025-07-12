import logging
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)

class ApiExceptionMiddleware(MiddlewareMixin):
    def process_exception(self, request, exception):
        if request.path.startswith("/api/"):
            logger.exception("Erro interno na API:")
            return JsonResponse(
                {"detail": "Erro interno do servidor. Nossa equipe já foi notificada."},
                status=500
            )
        return None

