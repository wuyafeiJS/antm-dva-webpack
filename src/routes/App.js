import React,{Component}from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { TabBar,} from 'antd-mobile';

const iconMine = require('images/menu_mine.jpg');
const iconMine02 = require('images/menu_mine_02.jpg');
const iconIndex = require('images/menu_index.jpg');
const iconIndex02 = require('images/menu_index_02.jpg');

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'indexTab',
    }
  }
  componentWillMount() {
    //Toast.loading('Loading...')
    // const { dispatch } = this.props;
    // // 判断登录态
    // const LoadingAction = (mobile) => {
    //   dispatch({ type: 'indexPage/loginState', payload: { isLogin: true, mobile } });
    // };
    // if (window.localStorage.getItem('loginInfo')) {
    //   let loginInfo = window.localStorage.getItem('loginInfo');
    //   loginInfo = JSON.parse(loginInfo);
    //   const mobile = loginInfo.mobile;
    //   LoadingAction(mobile);
    // }
  }
  touchstart() {
    let touch = event.targetTouches[0];
    this._start = touch.pageY;
  }
  touchmove() {
     //e.preventDefault();
    if (document.body.scrollTop > 0){
      return true;
    }
    let touch = event.targetTouches[0];
    this._end = ( touch.pageY - this._start);
    //const pullDom = document.getElementById('pull-down');
    // if(parseFloat(pullDom.clientHeight)<200 && this._end > 0) {
    //   console.log(pullDom.style.height,this._end,'fds')
    //   pullDom.style.height = this._end * 0.5 + 'px';
    // }
    //下滑才执行操作
    if(this._end > 200){  //200即手机下滑屏幕的距离，超过200则执行刷新动作
    location.reload();
    }
  }
  touchend(){
    // if(this._end< 200) {
    //   const pullDom = document.getElementById('pull-down');
    //    pullDom.style.height = 0;
    // }
  }
  componentDidMount() {
    //Toast.hide();
    // 下拉刷新操作
    window.addEventListener('touchstart', this.touchstart, false);
    window.addEventListener('touchmove', this.touchmove, false);
    window.addEventListener('touchend', this.touchend, false);
  
  }
  
  componentWillUnmount() {
    window.removeEventListener('touchstart', this.touchstart, false);
    window.removeEventListener('touchmove', this.touchmove, false);
    window.removeEventListener('touchend', this.touchend, false);
  }
  render() {
    const selectedTab = this.props.selected;
    return (
      <div id="app">
      {/*#pull-down为下拉加载更多的提醒*/}
      {/*<div id="pull-down" className="pull-down">
          <div className="pull-down-content">
              <Icon type="loading" size="sm"/>
          </div>
      </div>*/}
      {this.props.children}
       <TabBar
        unselectedTintColor="#aaa"
        tintColor="#ffc040"
        barTintColor="white"
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="首页"
          key="首页"
          icon={<div className="tabBar">
            <img src={iconIndex02} alt="icon"/>
          </div>
          }
          selectedIcon={<div className="tabBar">
            <img src={iconIndex} alt="icon"/>
          </div>
          }
          selected={selectedTab === 'indexTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'indexTab',
            });
            console.log('hehe')
            this.props.dispatch(routerRedux.push('/'))
          }}
        
        >
        </TabBar.Item>
        <TabBar.Item
          icon={<div className="tabBar">
            <img src={iconMine02} alt="icon"/>
          </div>
          }
          selectedIcon={<div className="tabBar">
            <img src={iconMine} alt="icon"/>
          </div>
          }
          title="我的权益"
          key="我的权益"
          selected={selectedTab === 'mineTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'mineTab',
            });
            this.props.dispatch(routerRedux.push('/mineWel'))
          }}
         
        >
        </TabBar.Item>
      </TabBar>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selected: state.mineWel.selectTab,
    loginData: {
      isLogin: state.indexPage.isLogin,
      succeed: state.indexPage.succeed,
      mobile: state.indexPage.mobile
    },
    loading: state.loading.models.indexPage,
  };
}

export default connect(mapStateToProps)(IndexPage);