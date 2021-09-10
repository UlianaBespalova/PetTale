from sklearn.preprocessing import MinMaxScaler
import pandas as pd

# *************************************** * * * **
class DataVector():
    types = ['комбинезон', 'жилет', 'пакет', 'футболка', 'толстовка', 'пуховик',
             'свитер', 'куртка', 'дождевик', 'снуд', 'попона', 'платье', 'шуба',
             'пальто', 'дубленка', 'костюм', 'пыльник', 'худи', 'плащ', 'халат',
             'майка', 'штаны', 'рубашка', 'сарафан', 'парка', 'косынка', 'повязка']

    # -----Fix sex
    sex_types_male = ['самец', 'кабель', 'унисекс', 'мужской', 'мальчик']
    sex_types_female = ['самка', 'сука', 'унисекс', 'женский', 'девочка']

    size_types_small = ['мелк', 'все', 'мал']
    size_types_middle = ['средн', 'все', 'небольш']
    size_types_big = ['крупн', 'все', 'больш']

    color_types_red = ['красн', 'малин', 'ал', 'бордов', 'кораллов', 'марсала']
    color_types_brown = ['коричнев', 'какао', 'шоколад', 'терракот', 'бронз', 'вин', 'капучино']
    color_types_orange = ['оранж', 'рыж', 'лососев']
    color_types_beige = ['бежев', 'пудров', 'жемчужн', 'кремов', 'персик']
    color_types_yellow = ['желт', 'золот', 'лимон', 'горчичн', ]
    color_types_white = ['бел', 'сер', 'серебр', 'прозрачн']
    color_types_black = ['черн', 'графит', 'чернильн']
    color_types_pink = ['роз', 'фиолет', 'сирен', 'лаванд', 'фуксия', 'лилов', 'сумеречн']
    color_types_blue = ['син', 'голуб', 'васильков', 'лазурн', 'электрик']
    color_types_green = ['зелен', 'салат', 'хаки', 'мят', 'оливк', 'изумруд',
                         'бирюз', 'лайм', 'камуфляж']

    def __get_type(self, typ, template):
        typ_small = typ.lower()
        for elem in template:
            if typ_small.find(elem) != -1:
                return elem
        return 'unknown'

    def __get_type_bool(self, typ, template):
        typ_small = typ.lower()
        for elem in template:
            if typ_small.find(elem) != -1:
                return 1
        return 0

    def __get_type_color(self, typ):
        typ_small = typ.lower()
        for elem in self.color_types_blue:
            if typ_small.find(elem) != -1:
                return 'синий'
        for elem in self.color_types_pink:
            if typ_small.find(elem) != -1:
                return 'розовый'
        for elem in self.color_types_white:
            if typ_small.find(elem) != -1:
                return 'белый'
        for elem in self.color_types_red:
            if typ_small.find(elem) != -1:
                return 'красный'
        for elem in self.color_types_black:
            if typ_small.find(elem) != -1:
                return 'черный'
        for elem in self.color_types_orange:
            if typ_small.find(elem) != -1:
                return 'оранжевый'
        for elem in self.color_types_green:
            if typ_small.find(elem) != -1:
                return 'зеленый'
        for elem in self.color_types_yellow:
            if typ_small.find(elem) != -1:
                return 'желтый'
        for elem in self.color_types_brown:
            if typ_small.find(elem) != -1:
                return 'коричневый'
        for elem in self.color_types_beige:
            if typ_small.find(elem) != -1:
                return 'бежевый'

        return 'unknown'

    # Функция для генерации вектора
    def get_vector(self, items_matrix):

        sc = MinMaxScaler()
        items_matrix[['price']] = sc.fit_transform(items_matrix[['price']])

        d = {'brand': items_matrix['brand'], 'price': items_matrix['price']}
        items_int = pd.DataFrame(data=d)

        items_int[['type']] = items_matrix.apply(lambda x: self.__get_type(str(x['type']), self.types), axis=1)

        items_int[['sex_male']] = items_matrix.apply(lambda x: self.__get_type_bool(str(x['sex']), self.sex_types_male),
                                                     axis=1)
        items_int[['sex_female']] = items_matrix.apply(
            lambda x: self.__get_type_bool(str(x['sex']), self.sex_types_female), axis=1)

        items_int[['size_small']] = items_matrix.apply(
            lambda x: self.__get_type_bool(str(x['size']), self.size_types_small), axis=1)
        items_int[['size_middle']] = items_matrix.apply(
            lambda x: self.__get_type_bool(str(x['size']), self.size_types_middle), axis=1)
        items_int[['size_big']] = items_matrix.apply(
            lambda x: self.__get_type_bool(str(x['size']), self.size_types_big), axis=1)

        items_int[['color']] = items_matrix.apply(lambda x: self.__get_type_color(str(x['color'])), axis=1)

        res = pd.get_dummies(items_int)

        if 'color_unknown' in res.columns:
            res = res.drop(['color_unknown'], axis=1)
        if 'type_unknown' in res.columns:
            res = res.drop(['type_unknown'], axis=1)

        res.index = items_matrix['id']
        return res