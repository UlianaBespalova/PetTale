from django.conf.urls import url
from api_v0 import views


urlpatterns = [
    url(r'^itemlist$', views.goodList, name='goodList'),
    url(r'^item/(\d+)$', views.goodItem, name='goodItem')
]