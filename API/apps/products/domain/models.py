from django.db import models
from simple_history.models import HistoricalRecords



class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    # Campos de auditoria
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    class Meta:
        db_table = "categories"
        ordering = ["name"]
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name
class Supplier(models.Model):
    """
    Representa um fornecedor de produtos no sistema.
    """
    name = models.CharField(max_length=200, unique=True)
    contact_name = models.CharField(max_length=150, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    # Campos de auditoria
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "suppliers"
        ordering = ["name"]
        verbose_name = "Supplier"
        verbose_name_plural = "Suppliers"

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # is_ready = models.BooleanField(default=True)
    category = models.ForeignKey('Category', on_delete=models.PROTECT, default='test')
    supplier = models.ForeignKey('Supplier', on_delete=models.PROTECT, default=1)
    history = HistoricalRecords()

    def delete(self, *args, **kwargs):
        """Soft delete."""
        self.is_active = False
        self.save()

    class Meta:
        ordering = ['-created_at']

