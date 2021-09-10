import React, {useState} from 'react';
import Card from "../Card";
import SizeFilterSwitch from "../SizeFilterSwitch";
import routes from "../../../../modules/routes";


const PhotoTab = ({itemList, params}) => {

    const [simItemList, setSimItemList] = useState(null);

    return (
        <div className="accordion-collapse collapse" id="photo" data-bs-parent="#tabs" >
            <div className="card card-body px-4">
                {itemList.length === 0 ? <div>Похожие товары не найдены.</div> :
                    <SizeFilterSwitch flagId={'similarSwitch'} itemList={itemList} updateList={setSimItemList}
                                      params={params}/>
                }
                <div className="row row-cols-3">
                    {simItemList===null ? itemList.map((item) =>
                            <div onClick={() => window.location=routes.itemPage.create(item.pk) }>
                                <Card id={item.fields.id} title={item.fields.title}
                                      price={item.fields.price} image={item.fields.image} /></div>)
                    : simItemList.length > 0 ? simItemList.map((item) =>
                            <div onClick={() => window.location=routes.itemPage.create(item.pk) }>
                                <Card id={item.fields.id} title={item.fields.title}
                                      price={item.fields.price} image={item.fields.image} /></div>) :
                            <div className="mx-5, my-3">
                                Подходящих товаров не нашлось :(
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PhotoTab;

