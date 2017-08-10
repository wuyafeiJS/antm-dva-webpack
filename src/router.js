import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import App from './routes/App';
import IndexPage from './routes/IndexPage';
import WelDetail from './routes/WelDetail';
import MineWel from './routes/MineWel';
import More from './routes/More';
import HowTo from './components/HowTo';


const RouterConfig = ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={App} >
        <IndexRoute component={IndexPage} />
        <Route path='detail/:id' component={WelDetail}/>
        <Route path='more/:id' component={More}/>
        <Route path='mineWel' component={MineWel}/>
        <Route path='howto' component={HowTo}/>
      
      </Route>
    </Router>
  )
}

const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          // registerModel(app, require('./models/IndexPage'));//需要分析model是在全局使用，还是只在此路由内使用，如果全局使用则需要在index.js引用。如：models/login
          cb(null, { component: require('./routes/IndexPage') });
        }, 'IndexPage');
      },
      childRoutes: [
        {
          path: 'IndexPage',
          name: 'IndexPage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              
              cb(null, require('./routes/IndexPage'));
            });
          },
        },
        {
          path: 'detail/:id',
          name: 'WelDetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              
              cb(null, require('./routes/WelDetail'));
            });
          },
        },
        {
          path: 'more/:id',
          name: 'More',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
             
              cb(null, require('./routes/More'));
            });
          },
        },
        {
          path: 'mineWel',
          name: 'MineWel',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/MineWel'));
            });
          },
        },
        {
          path: 'howto',
          name: 'HowTo',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./components/HowTo'));
            });
          },
        },
      ],
    },
  ];

export default RouterConfig;
