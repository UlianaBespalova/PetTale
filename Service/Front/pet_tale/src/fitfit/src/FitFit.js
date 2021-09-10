import './FitFit.css';
import Win from "./wins/Win";


const FitFit = ({ClothesType, itemImg, sizes, userId, itemId}) => {
    return (
        <div className="App">
            < Win ClothesType={ClothesType} sizes={sizes} itemImg={itemImg}
                  userId={userId} itemId={itemId}/>
        </div>
    );
}

export default FitFit;
