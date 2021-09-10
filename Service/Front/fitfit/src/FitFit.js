import './App.css';
import Win from "./wins/Win";


const FitFit = ({ClothesType, itemImg, sizes, itemList}) => {
    return (
        <div className="App">
            < Win ClothesType={ClothesType} itemList={itemList}
                  sizes={sizes} itemImg={itemImg}/>
        </div>
    );
}

export default FitFit;
