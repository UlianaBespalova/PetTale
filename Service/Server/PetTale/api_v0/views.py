import datetime
import sys
import json
from django.http import HttpResponse, Http404
from django.core import serializers
from goods.models import Goods, Users, Boughts, Recoms
from api_v0 import decoding
from FitfitRecommendations import recoms

# Функция для получения товаров пользователя
def get_all_items_of_one_user(user_id):
    user_boughts = Boughts.objects.filter(userid = user_id)
    user_boughts = list(item.itemid.id for item in user_boughts)
    return user_boughts

def goodList(request):
    size_param = request.GET.get("size", "all")
    sort_param = request.GET.get("sort", "newly")
    offset_param = int(request.GET.get("offset", 0))
    limit_param = int(request.GET.get("limit", 51))

    if size_param == 'all':
        goods = Goods.objects.all()
    else:
        size_param_dec = decoding.translate[size_param].encode('utf8').decode('cp1251')
        goods = Goods.objects.filter(size__icontains=size_param_dec)

    if sort_param == 'price':
        goods = goods.order_by(sort_param)
    if sort_param == 'popular':
        goods = goods.order_by('-bought_num')

    goods = goods[offset_param:offset_param+limit_param]
    goods = decoding.fixCoding(goods, decoding.decode_title_item)

    data = serializers.serialize('json', goods, fields=('id', 'title', 'price', 'image'))
    return HttpResponse(data, content_type='application/json')


def goodItem(request, item_id):
    try:
        item = Goods.objects.get(id=item_id)
    except Goods.DoesNotExist:
        return HttpResponse(json.dumps({'res': 'Error', 'body': 'No item'}), content_type='application/json')
    item = decoding.fixCoding([item], decoding.decode_all_item)
    data = serializers.serialize("json", item)
    if len(data) != 0:
        return HttpResponse(data, content_type='application/json')
    return HttpResponse(json.dumps({'res': 'Error', 'body': 'No item'}), content_type='application/json')


# ------------------------------------------------------login

def login(request):
    user_login = request.GET.get("login", "")
    userPsw = request.GET.get("psw", "")
    if user_login=="" or userPsw == "":
        return HttpResponse(json.dumps({'res': 'Error', 'body': 'Empty login or password'}),
                            content_type='application/json')

    users = Users.objects.filter(login=user_login)
    if len(users) == 0:
        return HttpResponse(json.dumps({'res': 'Error', 'body': 'No user'}), content_type='application/json')
    user = users[0]
    if user.password != userPsw:
        return HttpResponse(json.dumps({'res': 'Error', 'body': 'Wrong password'}), content_type='application/json')

    user_boughts = Boughts.objects.filter(userid = user.id)
    user_boughts = list(item.itemid.id for item in user_boughts)
    data = {
        'login': user.login,
        'id': user.id,
        'boughts': user_boughts,
    }
    return HttpResponse(json.dumps({'res': 'Ok', 'body': data}), content_type='application/json')


def register(request):
    userLogin = request.GET.get("login", "")
    userEmail = request.GET.get("email", "")
    userPsw = request.GET.get("psw", "")
    if userLogin=="" or userPsw == "":
        return HttpResponse(json.dumps({'res': 'Error', 'body': 'Empty login or password'}),
                            content_type='application/json')

    users = Users.objects.filter(login=userLogin)
    if len(users) != 0:
        return HttpResponse(json.dumps({'res': 'Error', 'body': 'Login is taken'}), content_type='application/json')

    newUser = Users(login=userLogin, username="", password=userPsw, email=userEmail, date_joined = datetime.datetime.now())
    newUser.save()
    newUserRecoms = Recoms(id=newUser, recommends="", need_update=1)
    newUserRecoms.save()

    users = Users.objects.filter(login=userLogin)
    if len(users) == 0:
        return HttpResponse(json.dumps({'res': 'Error', 'body': 'DB error'}), content_type='application/json')
    user = users[0]

    recoms.G_UMATRIX.new_user(user.id)

    data = {
        'login': user.login,
        'id': user.id,
        'boughts': [],
    }
    return HttpResponse(json.dumps({'res': 'Ok', 'body': data}), content_type='application/json')
# -----------------------------------------------------------------------------------------------



def buy(request):
    user_login = request.GET.get("login", "")
    item_id = int(request.GET.get("item", "-1"))
    if user_login=="":
        return HttpResponse(json.dumps({'res': 'Error', 'body': 'No login'}),
                            content_type='application/json')

    users = Users.objects.filter(login=user_login)
    if len(users) == 0:
        return HttpResponse(json.dumps({'res': 'Error', 'body': 'User Error'}), content_type='application/json')
    user_id = users[0].id
    try:
        item = Goods.objects.get(id=item_id)
    except Goods.DoesNotExist:
        return HttpResponse(json.dumps({'res': 'Error', 'body': 'Item Error'}), content_type='application/json')

    # 2) Запись в Покупки
    newBought = Boughts(userid=users[0], itemid=item, date=datetime.datetime.now())
    newBought.save()

    # 3) Инкремент покупок в товаре
    item.bought_num+=1
    item.save()

    # 1) обновить матрицу взаимодействия # new bought(user_id, item_id)
    recoms.G_UMATRIX.add_bought(item_id, user_id)

    # 4) Нужно обновить в рекомендациях
    try:
        user_recoms = Recoms.objects.get(id=user_id)
    except Goods.DoesNotExist:
        return HttpResponse(json.dumps({'res': 'Error', 'body': 'User Error'}), content_type='application/json')
    user_recoms.need_update = 1
    user_recoms.save()

    user_boughts = Boughts.objects.filter(userid = user_id)
    user_boughts = list(item.itemid.id for item in user_boughts)
    data = {
        'login': users[0].login,
        'boughts': user_boughts,
    }
    return HttpResponse(json.dumps({'res': 'Ok', 'body': data}), content_type='application/json')


# ------------------------------------------------------
# ------------------------------------------------------
def similar(request):
    item_id = int(request.GET.get("item", "-1"))

    items = recoms.Get_Simple_Items(item_id, 101) # Список айдишников нужных товаров
    goods = []
    for iid in items:
        try:
            item = Goods.objects.get(id=iid)
            goods.append(item)
        except Goods.DoesNotExist:
            continue

    goods = decoding.fixCoding(goods, decoding.decode_titleFull_item)
    data = serializers.serialize('json', goods,
                                 fields=('id', 'title', 'price', 'image', 'sizeparams', 'sizearray'))
    return HttpResponse(data, content_type='application/json')



def recommendations (request):
    user_id = int(request.GET.get("user", "-1"))
    item_id = int(request.GET.get("item", "-1"))

    user_recoms = -1
    try:
        user_recoms = Recoms.objects.get(id=user_id)
    except Recoms.DoesNotExist:
        pass
        # return HttpResponse(json.dumps({'res': 'Error', 'body': 'User Error'}), content_type='application/json')

    if (user_recoms == -1 or user_recoms.need_update == 1):
        if (user_recoms == -1):
            items = Get_N_Reccomendations(-1, item_id)
        else:
            items = Get_N_Reccomendations(user_id, item_id)
            recs = ""
            for item in items:
                recs += str(item) + ";"
            user_recoms.recommends = recs
            user_recoms.need_update = 0
            user_recoms.save()


    # if user_recoms.need_update == 1:
    #     items = Get_N_Reccomendations(user_id, item_id)

    else:
        items_list = user_recoms.recommends
        items = []
        itemsArr = items_list.split(';')
        for i in range(len(itemsArr)-1):
            items.append(int(itemsArr[i]))

    goods = []
    for iid in items:
        try:
            item = Goods.objects.get(id=iid)
            goods.append(item)
        except Goods.DoesNotExist:
            continue
    goods = decoding.fixCoding(goods, decoding.decode_titleFull_item)
    data = serializers.serialize('json', goods,
                                 fields=('id', 'title', 'price', 'image', 'sizeparams', 'sizearray'))
    return HttpResponse(data, content_type='application/json')




def Get_K_UserBased(user_id, K):
    u_i_matrix = recoms.G_UMATRIX.matrix
    if user_id not in u_i_matrix.index:
        return []

    getKnnUsers = recoms.GetKNearestUsers(u_i_matrix, u_i_matrix.index)
    res = getKnnUsers.neighbours_for_single_user(K + 1, [u_i_matrix.loc[user_id]])  # айдишник

    similar_users = res['id'].values.tolist()
    if user_id in similar_users:
        similar_users.remove(user_id)

    items_for_user = []

    for one_sim_user_id in similar_users:
        if one_sim_user_id == 0:
            continue
        items_for_user.extend(get_all_items_of_one_user(one_sim_user_id))

    if len(items_for_user) == 0:
        return []

    items_set = list(set(items_for_user))
    items_arr = []
    for i in items_set:
        items_arr.append([i, items_for_user.count(i)])

    df = recoms.pd.DataFrame(items_arr, columns=['itemId', 'koef'])
    df['koef'] = df['koef'] / K
    df = df.sort_values(by='koef', ascending=False)

    return list(df['itemId'])

def Get_K_PersonalContentBased(user_id, K):

    items_vector_matrix = recoms.G_ITEMS_VECTOR
    getKnnItemsCB = recoms.GetKNearestNeighbours(items_vector_matrix, items_vector_matrix.index)
    user_boughts = get_all_items_of_one_user(user_id)

    i_list = []
    for one_item_id in user_boughts:
        iitt = Goods.objects.filter(id=one_item_id)
        iitt_decoded = decoding.fixCoding(iitt, decoding.decode_all_item)[0]
        iitt_list = [iitt_decoded.id, iitt_decoded.title, iitt_decoded.brand, iitt_decoded.type, iitt_decoded.sex,
                     iitt_decoded.size, iitt_decoded.sizeparams, iitt_decoded.sizearray, iitt_decoded.color,
                     iitt_decoded.country, iitt_decoded.price, iitt_decoded.image]
        i_list.append(iitt_list)

    i_list_df = recoms.pd.DataFrame(i_list)
    i_list_df.index = user_boughts
    i_list_df.columns = ['id', 'title', 'brand', 'type', 'sex', 'size', 'sizeparams',
                         'sizearray', 'color', 'country', 'price', 'image']

    dv = recoms.DataVector()
    i_list_vector = dv.get_vector(i_list_df)  # Превратили в вектор

    personal_user_vector = []
    for col in items_vector_matrix.columns:
        if col not in i_list_vector.columns:
            personal_user_vector.append(0)
        else:
            val = round(i_list_vector[col].sum() / len(i_list_vector[col]), 3)
            personal_user_vector.append(val)

    res = getKnnItemsCB.neighbours_for_single_object(K, [personal_user_vector])
    return list(res['id'])


def Range_Recoms(recoms_UB, recoms_CB, koef_UB=0.6, koef_CB=0.4):
    recoms_df = {}
    for i in range(len(recoms_CB)):
        koef = (1 - (i // 5) * 0.05) * koef_CB
        recoms_df.setdefault(recoms_CB[i], koef)
    for i in range(len(recoms_UB)):
        item = recoms_UB[i]

        if recoms_df.get(item) == None:
            recoms_df.setdefault(item, 1 * koef_UB)
        else:
            koef_new = recoms_df.pop(item)
            koef_new += 1 * koef_UB
            recoms_df.setdefault(item, koef_new)

    return (recoms_df)

def Get_N_Reccomendations(user_id, item_id=-1, N=100):
    users_bought = get_all_items_of_one_user(user_id)
    if len(users_bought) > 0:
        recoms_UB = Get_K_UserBased(user_id, 15)
        recoms_CB = Get_K_PersonalContentBased(user_id, 90)
        recoms_ranged = Range_Recoms(recoms_UB, recoms_CB)

    else:
        recoms_CB_thisItem = []
        if item_id != -1:
            recoms_CB_thisItem.extend(recoms.Get_Simple_Items(item_id, 21))
        recoms_ranged = {}
        for i in recoms_CB_thisItem:
            recoms_ranged.setdefault(i, 0.06)

    if len(recoms_ranged) < 100:
        koef_POP = 0.1
        popular = Goods.objects.all()
        popular = popular.order_by('-bought_num')
        popular = popular[0:100]
        pop_list = list(item.id for item in popular)

        for i in range(len(pop_list)):
            pop_item = pop_list[i]
            if recoms_ranged.get(pop_item) == None:
                recoms_ranged.setdefault(pop_item, 1 * koef_POP)
            else:
                koef_new = recoms_ranged.pop(pop_item)
                koef_new += 1 * koef_POP
                recoms_ranged.setdefault(pop_item, koef_new)

    result = list(sorted(recoms_ranged, key=recoms_ranged.get, reverse=True))[0:N + len(users_bought)]
    for r_item in users_bought:
        if r_item in result:
            result.remove(r_item)
    return result
