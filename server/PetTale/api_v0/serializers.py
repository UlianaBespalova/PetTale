from rest_framework import serializers
from goods.models import Goods


class GoodPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goods
        fields = [
            'title',
            'price',
            'image',
        ]

    title = serializers.CharField(source='get_title')



class GoodDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goods
        fields = '__all__'

    title = serializers.CharField(source='get_title')
    brand = serializers.CharField(source='get_brand')
    type = serializers.CharField(source='get_type')
    sex = serializers.CharField(source='get_sex')
    size = serializers.CharField(source='get_size')
    sizeparams = serializers.CharField(source='get_sizeparams')
    sizearray = serializers.CharField(source='get_sizearray')
    color = serializers.CharField(source='get_color')
    country = serializers.CharField(source='get_country')
