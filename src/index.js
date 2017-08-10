import "babel-polyfill";
import { hashHistory,browserHistory } from 'dva/router';
import dva from 'dva';
import createLoading from 'dva-loading';
import routerConfig from './router';
import appmodel from './models/app';
import welDetail from './models/welDetail';
import mineWel from './models/mineWel';
import "./styles/App.scss"

// 1. Initialize
const app = dva({
    history: hashHistory
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(appmodel)
app.model(welDetail)
app.model(mineWel)
// 4. Router
app.router(routerConfig);

// 5. Start
app.start('#app');