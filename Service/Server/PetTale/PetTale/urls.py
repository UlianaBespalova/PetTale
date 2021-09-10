from django.conf.urls import url
from django.contrib import admin
from django.urls import include

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v0/', include('api_v0.urls')),
    url(r'^', include('main.urls')),
]
