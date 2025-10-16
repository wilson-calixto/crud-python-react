from rest_framework import serializers
from apps.products.domain.models import Product, Category, Supplier
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
        read_only_fields = ["id", "created_at", "updated_at"]

    # def validate_name(self,value):
    #     qs = Category.objects.filter(name_iexact=value)
    #     if self.instance:
    #         qs = qs.exclude(pk=self.instance.pk)
    #     if self.exists():
    #         raise serializers.ValidationError('já exixte essa categoria')
    #     return value
    


 
class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = [
            "id",
            "name",
            "contact_name",
            "email",
            "phone",
            "address",
            "website",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_name(self, value):
        """
        Valida se o nome do fornecedor já existe (case insensitive).
        """
        qs = Supplier.objects.filter(name__iexact=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("Já existe um fornecedor com esse nome.")
        return value


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Preço deve ser maior ou igual a zero.")
        return value

    def validate(self, data):
        if data.get('stock', 0) == 0 and data.get('is_active', True):
            raise serializers.ValidationError("Produto sem estoque não pode estar ativo.")
        return data

