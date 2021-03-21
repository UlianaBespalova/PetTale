from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *


class GoodViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Goods.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return GoodPreviewSerializer
        return GoodDetailSerializer