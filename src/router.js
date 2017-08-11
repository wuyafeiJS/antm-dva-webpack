import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import App from './routes/App';
import IndexPage from './routes/IndexPage';
import WelDetail from './routes/WelDetail';
//import MineWel from './routes/MineWel';
import More from './routes/More';
import HowTo from './components/HowTo';

const MineWel = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./routes/MineWel').default)
    },'MineWel');
}
const RouterConfig = ({ history }) => {
  return (
    <Router history={history}>
      {<Route path="/" component={App} >
        <IndexRoute component={IndexPage} />
        <Route path='detail/:id' component={WelDetail}/>
        <Route path='more/:id' component={More}/>
        <Route path='mineWel' component={MineWel}/>
        <Route path='howto' component={HowTo}/>
      
      </Route>}
    </Router>
  )
}


export default RouterConfig;
