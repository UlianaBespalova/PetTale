package main

import (
	"fmt"
	"github.com/tebeka/selenium"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
)

var txtDB_items = "db_items.txt"
var index = 1

func getRecord(wd selenium.WebDriver, file_items *os.File, url string) (string) {

	//загружаем страницу
	if err := wd.Get(url); err != nil {
		return "Get error"
	}

	//заголовок
	titleW, err := wd.FindElement(selenium.ByCSSSelector, ".brand-and-name")
	if err != nil {
		fmt.Print("No brand name")
	}
	title, _ := titleW.Text()
	brand := strings.Split(title, " /")[0] //дополнительно берем из заголовка название бренда


	//параметры товара
	paramsW, err := wd.FindElement(selenium.ByCSSSelector, ".params")
	if err != nil {
		fmt.Print("No params name")
	}
	params, _ := paramsW.Text()
	paramsArr := strings.Split(params, "\n")

	ctype := ""
	sex := ""
	size := ""
	country := ""
	for _, str := range paramsArr {
		if strings.HasPrefix(str, "Комплектация") { ctype = strings.Split(str, "Комплектация ")[1] }
		if strings.HasPrefix(str, "Пол животного") { sex = strings.Split(str, "Пол животного ")[1] }
		if strings.HasPrefix(str, "Размер животного") { size = strings.Split(str, "Размер животного ")[1] }
		if strings.HasPrefix(str, "Страна производитель") { country = strings.Split(str, "Страна производитель ")[1] }
	}


	//Достать картинку
	img := ""
	imgW, err := wd.FindElement(selenium.ByCSSSelector, ".i-same-part-kt .card-row #photo .preview-photo, .i-same-part-kt .card-row #photo canvas")
	if err != nil {
		fmt.Print("No image")
	} else {
		img, _ = imgW.GetAttribute("src")

		imgAr := strings.Split(img, "//")
		if len(imgAr) > 1 {
			img = imgAr[1]
		} else {
			img = imgAr[0]
		}
	}

	//берем обычную цену (без скидок)
	price := ""
	priceW, err := wd.FindElement(selenium.ByCSSSelector, ".i-same-part-kt .card-row .card-right .order-block .inner-price .old-price")
	if err != nil {
		priceW, err = wd.FindElement(selenium.ByCSSSelector, ".i-same-part-kt .card-row .card-right .order-block .inner-price .final-cost")
	}
	if err != nil {
		fmt.Print("No price O_o")
	} else {
		price, _ = priceW.Text()
		price = strings.Split(price, " ₽")[0]
	}
	price = strings.Replace(price, " ", "", -1) //убрать пробелы из цены


	//цвет товара
	color := ""
	colorW, err := wd.FindElement(selenium.ByCSSSelector, ".i-same-part-kt .card-row .card-right .color span")
	if err != nil {
		fmt.Print("No color")
	} else {
		color, _ = colorW.Text()
	}


	//имитируем клик по кнопке Показать Размеры
	elem, err := wd.FindElement(selenium.ByCSSSelector, ".table-of-sizes")
	if err != nil {
		return "No sizes"
	}
	if err := elem.Click(); err != nil {
		return "No click"
	}

	//ожидание загрузки размеров
	wd.SetImplicitWaitTimeout(5000)
	tlem, err := wd.FindElement(selenium.ByTagName, "tr")
	for i:=0; err != nil && i<30; i++ {
		wd.SetImplicitWaitTimeout(2000)
		tlem, err = wd.FindElement(selenium.ByTagName, "tr")
	}
	if err != nil { //размеры не загрузились за отведенное время
		return "No Wait"
	}
	//вытаскиваем таблицу размеров
	sizesItems, _ := tlem.Text()
	sizesItemsArr := strings.Split(sizesItems, "\n")
	colNum := len(sizesItemsArr)
	//и преобразуем в масси
	itemsW, err := wd.FindElement(selenium.ByCSSSelector, ".i-tinyscrollbar-product-card .viewport")
	if err != nil {
		return "No Content"
	}
	items, _ := itemsW.Text()
	itemsArr := strings.Split(items, "\n")

	//Параметры товара - Размер;Обхват талии;и тд - разделение по точке с запятой
	//Значения размеров - разделение по запятым и точкам с запятой

	//добавляем запись в таблицу
	_, _ = file_items.WriteString(strconv.Itoa(index) +"|"+title+"|"+ brand+"|"+ctype+"|"+sex+"|"+size+"|")

	for _, val := range sizesItemsArr { //заголовки таблицы размеров
		_, _ = file_items.WriteString(val + ";")
	}
	_, _ = file_items.WriteString("|")

	for i, val := range itemsArr {//размеры
		if (i+1)%colNum!=0 {
			_, _ = file_items.WriteString(val + ",")
		} else {
			_, _ = file_items.WriteString(val + ";")
		}
	}
	_, _ = file_items.WriteString("|"+color+"|"+country+"|"+price+"|"+img+"\n")

	index++
	return "Ok"
}



func main() {

	// Connect to the WebDriver instance running locally.
	caps := selenium.Capabilities{"browserName": "firefox"}
	wd, err := selenium.NewRemote(caps, "http://localhost:4444/wd/hub")
	if err != nil {
		panic(err)
	}
	defer wd.Quit()


	fileList, err := ioutil.ReadFile("list.txt")
	if err != nil {
		fmt.Println("listFile error")
		return
	}
	urls := strings.Split(string(fileList), "\n")
	urls = urls[:len(urls)-1]


	file_items, err := os.Create(txtDB_items) //обновить существующий файл или создать новый
	if err != nil {
		fmt.Println("file error")
		return
	}
	defer file_items.Close()

	_, _ = file_items.WriteString("id|Title|Brand|Type|Sex|Size|SizeParams|SizeArray|Color|Country|Price|Image\n")

	for i, page_url := range urls {
		fmt.Print(i+1, ") ... ")
		res := getRecord(wd, file_items, page_url)
		fmt.Println(" ... ", res)
	}
}
