from django.db import models
from simple_history.models import HistoricalRecords

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # is_ready = models.BooleanField(default=True)
    history = HistoricalRecords()

    def delete(self, *args, **kwargs):
        """Soft delete."""
        self.is_active = False
        self.save()

    class Meta:
        ordering = ['-created_at']

