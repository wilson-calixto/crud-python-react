from django.core.management.base import BaseCommand
from django.db import connection
from apps.products.domain.models import Product, Category, Supplier, Tag


class Command(BaseCommand):
    help = "Clear all products-related data (products, tags, categories, suppliers, and historical records)."

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING("Clearing products data"))

        # Clear M2M first to avoid FK overhead
        Product.tags.through.objects.all().delete()

        # Clear products and historical records
        Product.objects.all().delete()

        # Clear tags, categories, suppliers
        Tag.objects.all().delete()
        Category.objects.all().delete()
        Supplier.objects.all().delete()

        # Optionally vacuum/analyze for SQLite/Postgres left to DBA/user
        self.stdout.write(self.style.SUCCESS("Products data cleared."))


