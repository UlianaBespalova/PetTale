from django.http import HttpResponse, Http404
from django.core import serializers
from goods.models import Goods
from api_v0 import decoding



def goodList(request):
    size_param = request.GET.get("size", "all")
    sort_param = request.GET.get("sort", "newly")

    if size_param == 'all':
        goods = Goods.objects.all()
    else:
        size_param_dec = decoding.translate[size_param].encode('utf8').decode('cp1251')
        goods = Goods.objects.filter(size__icontains=size_param_dec)

    if sort_param != 'newly':
        goods = goods.order_by(sort_param)

    goods = decoding.fixCoding(goods, decoding.decode_title_item)
    data = serializers.serialize('json', goods, fields=('id', 'title', 'price', 'image'))
    return HttpResponse(data, content_type='application/json')



def goodItem(request, item_id):
    item = Goods.objects.filter(id=item_id)
    item = decoding.fixCoding(item, decoding.decode_all_item)
    data = serializers.serialize("json", item)
    if len(data) != 0:
        return HttpResponse(data, content_type='application/json')
    return Http404