import React, { Component } from 'react'
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Carousel, Icon } from 'antd-mobile';
import MoreWelfare from 'components/MoreWelfare'

const banner = require('images/banner_index.png');
const gf_qy = require('images/gf_qy.jpg');
// const gfqy_01 = require('images/gfqy_01.jpg');
// const gfqy_02 = require('images/gfqy_02.jpg');
// const gfqy_03 = require('images/gfqy_03.jpg');
// const gfqy_04 = require('images/gfqy_04.jpg');
const dp_qy = require('images/dp_qy.jpg');
// const dpqy_01 = require('images/dpqy_01.jpg');
// const dpqy_02 = require('images/dpqy_02.jpg');
// const dpqy_03 = require('images/dpqy_03.jpg');
// const dpqy_04 = require('images/dpqy_04.jpg');
class IndexPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
          initialHeight: 200,
        }
    }
    componentWillMount() {
  
      this.props.dispatch({type: 'indexPage/fetchSList',payload:{ }})
    }
    componentDidMount() {
      const body = document.getElementsByTagName('body')[0];
      document.title = '首页';
      const iframe = document.createElement("IFRAME");
      iframe.setAttribute("id", "setTitle")
      iframe.setAttribute("src", "/favicon.ico")
      body.appendChild(iframe);
      const frame = document.getElementById('setTitle')
      frame.onload = function () {
     
        setTimeout(function() {
          iframe.onload = null;
          
          body.removeChild(iframe)
        }, 0);
      }
   
    }
    render() {
      const { loading, rightsData  } = this.props;
      const banner_data = [1,2];
      var gfqyData = {};
      var dpqyData = {};

      if (loading == false && rightsData) {
     
        const {gfCount, gfRights, otherCount, otherRights} = rightsData.data;
        gfqyData = {
          title: '广发好权益',
          id: 1,
          titleIcon: gf_qy,
          more: gfCount>8?'更多特权':false,
          data: gfCount>8?gfRights.slice(0,8): gfRights,
        }
        dpqyData = {
          title: '大牌好权益',
          id: 2,
          titleIcon: dp_qy,
          more: otherCount>8?'更多特权':false,
          data: otherCount>8?otherRights.slice(0,8): otherRights,
        }
      }

      return (
        <div>
          {loading !== false?<div className="indexLoading"><Icon type='loading' size='sm' /></div>:<div id="indexPage">
            {/*<Carousel
              className="my-carousel"
              autoplay={true}
              infinite
              dots={false}
              selectedIndex={1}
              swipeSpeed={35}
            
            >
            {banner_data.map(ii => (
              <a href="http://www.baidu.com" key={ii}>
                <img
                  src={banner}
                  alt="icon"
                  style={{width:'100%'}}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({
                      initialHeight: null,
                    });
                  }}
                />
              </a>
              ))}
            </Carousel>*/}
            <div className="banner">
              <a href="http://www.baidu.com">
                <img
                  src={banner}
                  alt="icon"
                  style={{width:'100%'}}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({
                      initialHeight: null,
                    });
                  }}
                />
              </a>
            </div>
            <MoreWelfare weldata={gfqyData}/>
            <MoreWelfare weldata={dpqyData}/>
            <Link to="/howto" className="howto">
            </Link>
          </div>}
        </div>
        
      )
    }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.models.indexPage,
    rightsData: state.indexPage.rightsData
  }
}


export default connect(mapStateToProps)(IndexPage)
