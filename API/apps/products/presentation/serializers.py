from rest_framework import serializers
from apps.products.domain.models import Product

class ProductSerializer(serializers.ModelSerializer):
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

