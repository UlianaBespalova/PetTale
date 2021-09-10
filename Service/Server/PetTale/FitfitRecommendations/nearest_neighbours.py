import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

class GetKNearestNeighbours:
    def __init__(self, X_matrix, X_ids=[]):
        self._X_matrix = X_matrix
        self.df = pd.DataFrame({
            'id': pd.Series(X_ids, dtype='int'),
            'dist': pd.Series([], dtype='float'),
        })
        self.similarity_matrix = pd.DataFrame()

    def neighbours_for_single_object(self, K: int, X_matrix_object):

        dist = cosine_similarity(self._X_matrix, X_matrix_object)
        dist = pd.DataFrame(dist, columns=['dist'])
        self.df['dist'] = dist['dist']
        res = self.df.sort_values(by='dist', ascending=False)
        res = res.head(K)
        #         res = res[1:]
        return res

    def all_neighbours_for_single_object(self, X_matrix_object):

        dist = cosine_similarity(self._X_matrix, X_matrix_object)
        dist = pd.DataFrame(dist, columns=['dist'])
        self.df['dist'] = dist['dist']
        return self.df

    def get_similarity_matrix(self):
        self.similarity_matrix = pd.DataFrame()
        for i in range(len(self._X_matrix)):
            print(i, end='\r')
            res = self.all_neighbours_for_single_object([self._X_matrix.iloc[i]])
            self.similarity_matrix[i + 1] = res['dist']

        self.similarity_matrix.index = self.df['id']
        print('\n----------------------\nReady\n')

        # Получаем похожих по матрице схожести

    def neighbours_by_similarity_matrix(self, K, item_id):
        if item_id > len(self.similarity_matrix):
            return ''
        res = pd.DataFrame({'dist': self.similarity_matrix[item_id]})
        res = res.sort_values(by='dist', ascending=False)
        res = res.head(K)
        return res[1:]


# Класс ближайших пользователей
class GetKNearestUsers(GetKNearestNeighbours):

    def __init__(self, X_matrix, X_ids=[]):
        super().__init__(X_matrix, X_ids)

    def neighbours_for_single_user(self, K: int, X_matrix_object):
        res = self.neighbours_for_single_object(K, X_matrix_object)  # индекс, не айдишник (с 0)
        res = res.drop(res[res.dist == 0].index)  # Убираем пользователей с расстоянием 0
        return res