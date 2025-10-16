from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone
from apps.products.domain.models import Product, Category, Supplier, Tag
from decimal import Decimal
import random


class Command(BaseCommand):
    help = (
        "Seed the database with sample data: N products, C categories, S suppliers, and T tags.\n"
        "Defaults: products=10000, categories=50, suppliers=50, tags=1000."
    )

    def add_arguments(self, parser):
        parser.add_argument("--products", type=int, default=10000)
        parser.add_argument("--categories", type=int, default=50)
        parser.add_argument("--suppliers", type=int, default=50)
        parser.add_argument("--tags", type=int, default=1000)
        parser.add_argument("--batch", type=int, default=1000)

    def handle(self, *args, **options):
        num_products = options["products"]
        num_categories = options["categories"]
        num_suppliers = options["suppliers"]
        num_tags = options["tags"]
        batch_size = options["batch"]

        self.stdout.write(self.style.MIGRATE_HEADING("Seeding data"))
        self.stdout.write(f"categories={num_categories} suppliers={num_suppliers} tags={num_tags} products={num_products}")

        # Ensure categories
        categories = list(Category.objects.all()[:num_categories])
        if len(categories) < num_categories:
            to_create = [Category(name=f"Category {i:03d}") for i in range(len(categories), num_categories)]
            Category.objects.bulk_create(to_create, ignore_conflicts=True, batch_size=batch_size)
            categories = list(Category.objects.order_by("id")[:num_categories])

        # Ensure suppliers
        suppliers = list(Supplier.objects.all()[:num_suppliers])
        if len(suppliers) < num_suppliers:
            to_create = [
                Supplier(
                    name=f"Supplier {i:03d}",
                    contact_name=f"Contact {i:03d}",
                    email=f"supplier{i:03d}@example.com",
                    phone=f"+55 11 9{i:03d}{i:03d}-{i:03d}{i:03d}",
                    address=f"Rua {i:03d} Centro",
                    website=f"https://supplier{i:03d}.example.com",
                )
                for i in range(len(suppliers), num_suppliers)
            ]
            Supplier.objects.bulk_create(to_create, ignore_conflicts=True, batch_size=batch_size)
            suppliers = list(Supplier.objects.order_by("id")[:num_suppliers])

        # Ensure tags
        tags = list(Tag.objects.all()[:num_tags])
        if len(tags) < num_tags:
            to_create = [Tag(name=f"tag-{i:04d}") for i in range(len(tags), num_tags)]
            Tag.objects.bulk_create(to_create, ignore_conflicts=True, batch_size=batch_size)
            tags = list(Tag.objects.order_by("id")[:num_tags])

        # Create products in batches
        self.stdout.write(self.style.MIGRATE_HEADING("Creating products"))
        products_to_create = []
        now = timezone.now()
        for i in range(num_products):
            category = categories[i % len(categories)]
            supplier = suppliers[i % len(suppliers)]
            product = Product(
                name=f"Product {i:05d}",
                description=f"Descrição do produto {i:05d}",
                price=Decimal(random.randrange(100, 50000)) / Decimal("100"),
                stock=random.randint(0, 1000),
                is_active=True,
                category=category,
                supplier=supplier,
                created_at=now,
                updated_at=now,
            )
            products_to_create.append(product)

            if len(products_to_create) >= batch_size:
                Product.objects.bulk_create(products_to_create, batch_size=batch_size)
                products_to_create = []
        if products_to_create:
            Product.objects.bulk_create(products_to_create, batch_size=batch_size)

        # Reload created products ids for M2M
        product_qs = Product.objects.order_by("id").all()
        total = product_qs.count()
        self.stdout.write(f"Products total: {total}")

        # Assign tags to products efficiently
        # Strategy: each product gets between 1 and 5 tags chosen deterministically for reproducibility
        self.stdout.write(self.style.MIGRATE_HEADING("Assigning tags"))
        tag_ids = [t.id for t in tags]
        chunk = []
        through_model = Product.tags.through

        for p in product_qs.iterator(chunk_size=batch_size):
            rnd = (p.id % 5) + 1
            assigned = [tag_ids[(p.id + j) % len(tag_ids)] for j in range(rnd)]
            for tid in assigned:
                chunk.append(through_model(product_id=p.id, tag_id=tid))
            if len(chunk) >= batch_size * 5:
                through_model.objects.bulk_create(chunk, ignore_conflicts=True, batch_size=batch_size)
                chunk = []
        if chunk:
            through_model.objects.bulk_create(chunk, ignore_conflicts=True, batch_size=batch_size)

        self.stdout.write(self.style.SUCCESS("Seeding completed."))


