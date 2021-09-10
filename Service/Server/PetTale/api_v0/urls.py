from django.conf.urls import url
from api_v0 import views


urlpatterns = [
    url(r'^itemlist$', views.goodList, name='goodList'),
    url(r'^item/(\d+)$', views.goodItem, name='goodItem'),

    url(r'^login$', views.login, name='login'),
    url(r'^register$', views.register, name='register'),

    url(r'^buy$', views.buy, name='buy'),

    url(r'^fitfit/similar$', views.similar, name='similar'),
    url(r'^fitfit/recommendations$', views.recommendations, name='recommendations'),
    #
]