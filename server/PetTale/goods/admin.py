from django.contrib import admin
from .models import Goods

@admin.register(Goods)
class GoodAdmin(admin.ModelAdmin):
    list_display = ['image']
