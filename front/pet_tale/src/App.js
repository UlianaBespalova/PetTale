import './App.css';
import ListPage from './pages/ListPage'
import ItemPage from "./pages/ItemPage";

import {Redirect, Route, Switch, BrowserRouter} from 'react-router-dom';
import {routes} from './modules/routes';


function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={routes.itemPage.mask} component={ItemPage} />
                <Route path={routes.listPage.mask} component={ListPage} />
                <Redirect exact from={routes.default} to={routes.listPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
