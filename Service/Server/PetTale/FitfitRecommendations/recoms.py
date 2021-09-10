import pandas as pd
import numpy as np
from FitfitRecommendations.item_vector import DataVector
from FitfitRecommendations.nearest_neighbours import GetKNearestNeighbours, GetKNearestUsers
from FitfitRecommendations.user_item_matrix import UtilityMatrix

G_ITEMS_VECTOR = ""
G_UMATRIX = ""

# ----------------------------pre-load data----
def get_Loaded_Items_Vector():
    items_vector = pd.read_csv('FitfitRecommendations/data/items_vector.txt', sep="|")
    items_vector.index = items_vector['id']
    global G_ITEMS_VECTOR
    G_ITEMS_VECTOR = items_vector.drop(columns=['id'])


def get_Loaded_UI_Matrix():
    um = pd.read_csv('FitfitRecommendations/data/user_item_matrix.txt', sep="|")
    um.index = um.index + 1
    um.columns = pd.to_numeric(um.columns)
    global G_UMATRIX
    G_UMATRIX = UtilityMatrix()
    G_UMATRIX.add_ready_martix(um)



# ------------User-Based----------------
# ******************** * ** * ** ** * Список рекомендуемых товаров для пользователя

def Get_K_UserBased(user_id, K, u_i_matrix, acqq_matrix):
    if user_id not in u_i_matrix.index:
        return []

    getKnnUsers = GetKNearestUsers(u_i_matrix, u_i_matrix.index)
    res = getKnnUsers.neighbours_for_single_user(K + 1, [u_i_matrix.loc[user_id]])  # айдишник

    similar_users = res['id'].values.tolist()
    if user_id in similar_users:
        similar_users.remove(user_id)

    items_for_user = []

    for one_sim_user_id in similar_users:
        if one_sim_user_id == 0:
            continue
        # items_for_user.extend(get_all_items_of_one_user(one_sim_user_id, acqq_matrix))
    if len(items_for_user) == 0:
        return []

    items_set = list(set(items_for_user))
    items_arr = []
    for i in items_set:
        items_arr.append([i, items_for_user.count(i)])

    df = pd.DataFrame(items_arr, columns=['itemId', 'koef'])
    df['koef'] = df['koef'] / K
    df = df.sort_values(by='koef', ascending=False)

    return list(df['itemId'])






# -------------------------------------------------------

def Get_Simple_Items(item_id, K):
    items_vector_matrix = G_ITEMS_VECTOR
    if item_id not in items_vector_matrix.index:
        return []
    getKnn = GetKNearestNeighbours(items_vector_matrix, items_vector_matrix.index) # Класс ближайших
    res = getKnn.neighbours_for_single_object(K, [items_vector_matrix.loc[item_id]])
    res = res[1:]
    return list(res['id'])


def ivan():
    return len(G_UMATRIX.matrix)