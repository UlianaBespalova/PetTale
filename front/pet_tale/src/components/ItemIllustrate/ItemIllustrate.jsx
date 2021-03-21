
const ItemIllustrate = ({image}) => {

    const imageUrl = `https://${image}`;
    console.log(imageUrl);
    return (
        <div className="col-sm-5 mt-2 ml-0">
            <div style = {{height: '400px', overflow: 'hidden'}}>
                <img style={{minHeight: '400px', overflow: 'hidden', marginTop: '-20%'}} src={imageUrl} className="card-img" alt="Изображение товара" />
            </div>
        </div>
    )
};

export default ItemIllustrate;
