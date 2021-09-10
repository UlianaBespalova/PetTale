import pandas as pd
# ******************************** * * * * *
# Матрица схожести по списку покупок

class UtilityMatrix():

    def create_utility_martix(self, data):

        userList = data['userId'].tolist()
        itemList = data['itemId'].tolist()

        userList = list(set(userList))
        itemList = list(set(itemList))
        itemList.sort()

        X = pd.DataFrame({item: [0 for i in range(len(userList))] for item in itemList})
        X.index = userList

        number = 0
        for i, row in data.iterrows():
            print(i, end='\r')
            X[row['itemId']][row['userId']] = 1
            number += 1
        self.matrix = X
        print('added items = ', number)

    def add_ready_martix(self, data):
        self.matrix = data.copy()
        return 0

    def add_bought(self, item_id, user_id):
        try:
            self.matrix[item_id][user_id] = 1
        finally:
            return 0
        return 0

    def new_user(self, user_id):
        try:
            if user_id not in self.matrix.index:
                new_row = pd.Series([0] * len(self.matrix.columns))
                new_row.index = self.matrix.columns

                index_list = list(self.matrix.index)
                index_list.append(user_id)

                self.matrix = self.matrix.append(new_row, ignore_index=True)
                self.matrix.index = index_list
                return 0
        finally:
            return 0