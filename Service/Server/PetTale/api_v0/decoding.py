
translate = dict (
    small='мелк',
    middle='средн',
    large='крупн'
)


def decode(str):
    try:
        str = str.encode('cp1251').decode('utf8')
    except:
        pass
    return str

def decode_all_item(item):
    item.title = decode(item.title)
    item.brand = decode(item.brand)
    item.sex = decode(item.sex)
    item.type = decode(item.title)
    item.country = decode(item.country)
    item.color = decode(item.color)
    item.size = decode(item.size)
    item.sizeparams = decode(item.sizeparams)
    item.sizearray = decode(item.sizearray)
    return item

def decode_title_item(item):
    item.title = decode(item.title)
    return item

def decode_titleFull_item(item):
    item.title = decode(item.title)
    item.sizeparams = decode(item.sizeparams)
    item.sizearray = decode(item.sizearray)
    return item

def fixCoding(q_set, decode_f):
    return list(map(decode_f, q_set))

