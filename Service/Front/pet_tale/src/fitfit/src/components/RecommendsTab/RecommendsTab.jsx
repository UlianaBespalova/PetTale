import React, {useState} from 'react';
import Card from "../Card";
import SizeFilterSwitch from "../SizeFilterSwitch";
import routes from "../../../../modules/routes";

const RecommendsTab = ({itemList, params, userId}) => {

    const [recItemList, setRecItemList] = useState(null);

    return (
        <div className="accordion-collapse collapse" id="recommendations" data-bs-parent="#tabs" >
            {userId < 1 ? <div className="mx-1 my-3 text-small">Если вы авторизируетесь на сайте, это поможет улучшить качество рекомендаций.</div>
                : null}
            <div className="card card-body px-4">
                {itemList.length === 0 ? <div>Товары для рекомендаций не найдены.</div> :
                    <SizeFilterSwitch flagId={'recomsSwitch'} itemList={itemList} updateList={setRecItemList}
                                      params={params}/>
                }
                    <div className="row row-cols-3">
                    {recItemList===null ? itemList.map((item) => <div onClick={() => window.location=routes.itemPage.create(item.pk)}>
                            <Card id={item.fields.id} title={item.fields.title}
                                  price={item.fields.price} image={item.fields.image} /></div>)
                    : recItemList.length > 0?
                        recItemList.map((item) => <div onClick={() => window.location=routes.itemPage.create(item.pk)}>
                            <Card id={item.fields.id} title={item.fields.title}
                                  price={item.fields.price} image={item.fields.image} /></div>)
                            : <div className="mx-5, my-3">
                                Подходящих товаров не нашлось :(
                            </div>
                        }
                </div>
            </div>
        </div>
    )
}

export default RecommendsTab;

