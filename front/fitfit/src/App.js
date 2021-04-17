import './App.css';
import Win from "./wins/Win";
import mock from '../src/wins/MainWin/mockIng.png';

const mockClothesType = 'плащ';
const mockItems = [
    {
        id: 1,
        title: "Dress",
        price: 62726270,
        image: "kek",
    },
    {
        id: 2,
        title: "SuperDress",
        price: 2000,
        image: "kek",
    },
    {
        id: 3,
        title: "FFF",
        price: 3000,
        image: "kek",
    }
]
const mockSizes = "!L-мелкие,20,42-56,32-58,33;M-мелкие,18,36-54,30-42,30;" +
    "S-мелкие,16,34-54,26-40,26;XS-мелкие,14,28-48,24-40,25;" +
    "XXS-мелкие,12,26-44,24-32,23;";
const mockTitles = "Российский размер;Размер производителя;Обхват груди, в см;Обхват шеи, в см;Длина спины, в см;";


function App() {
  return (
    <div className="App">
        < Win clothesType={mockClothesType} itemList={mockItems}
              sizes={{sizes: mockSizes, titles: mockTitles}} itemImg={mock}/>
    </div>
  );
}

export default App;
