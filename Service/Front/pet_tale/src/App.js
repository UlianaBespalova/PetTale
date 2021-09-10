import './App.css';
import ListPage from './pages/ListPage'
import ItemPage from "./pages/ItemPage";
import {Redirect, Route, Switch, BrowserRouter} from 'react-router-dom';
import routes from './modules/routes';
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {

    const WrappedListPage = () => {
        let sortParam = 'newly';
        let sizeParam = 'all';
        let offsetParam = '0';
        const strParams = window.location.href.split(/[\?&]/);
        if (strParams.length > 1) {
            strParams.shift();
            strParams.forEach((item) => {
                const elems = item.split('=');
                if (elems.length === 2) {
                    if (elems[0]==='sort') sortParam = elems[1];
                    if (elems[0]==='size') sizeParam = elems[1];
                    if (elems[0]==='offset') offsetParam = elems[1];
                }
            })
        }
        return (<ListPage sortParam={sortParam} sizeParam={sizeParam} offsetParam={offsetParam}/>);
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path={routes.itemPage.mask} component={ItemPage} />
                <Route path={routes.listPage.mask} component={WrappedListPage} />
                <Redirect exact from={routes.default} to={routes.listPage.mask} />
                <Route path={routes.notFoundPage.mask} component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
