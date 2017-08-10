import React, { Component } from 'react'
import { connect } from 'dva';

import { Icon,WhiteSpace, Toast } from 'antd-mobile';
import WelReceive from 'components/WelReceive';
import Results from 'components/Results';

const icon_call = require('images/welDetail/icon_call.jpg');
const icon_loc = require('images/welDetail/icon_loc.jpg');

class WelDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalHide: true,
      rightCode: '',
      showDetail:false,
      onclick: false// 判断是否领取按钮被点击
    }
  }
  componentWillMount() {
    const {uuid} = this.props.location.query;
    if(uuid) {
      this.setState({
        rightCode:uuid
      })
    }
  }
  componentDidMount() {
    const body = document.getElementsByTagName('body')[0];
    document.title = '尊享权益';
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
  
  hideModal(){

    this.setState({
      modalHide:true,
    })
  }
  getTime(time) {
    const t = new Date(time);
    const year = t.getFullYear();
    const month = t.getMonth();
    const day = t.getDate();
    return year + '-' + (month +1) + '-' + day;
  }
  showModal() {
     this.setState({
      modalHide:false,
    })
  }
  hideDetail() {
    this.setState({
      showDetail:false,
    })
  }
  componentWillReceiveProps(nextProps){
    
    const {loading3,rightCode,loginData} = nextProps;
    
    // 权益码
    if(loading3 == false && rightCode && this.state.onclick) {
    
      if (rightCode.code == 0) {
        this.setState({
          showDetail: true
        })
      } else if(rightCode.code == 11) {
        Toast.fail('不能重复领取',2);
      } else {
        this.showModal()
      }
      
    }
    // 登录返回信息
    // if(loginData) {
    //   this.setState({
    //     loginData
    //   })
    //   if(loginData.mobile) {
    //     this.hideModal();
    //   }
    // }
  }
  render() {
    console.log(this.state.showDetail,'show')
    const { loading, welDetailData } = this.props;
    
    // 本页数据
    if(loading == false && welDetailData) {
      var {
          startTime,
          endTime,
          price,
          name,
          logoUrl,
          sellerAddress,
          sellerCustomPhone,
          usedTimes,
          _id,
        } = welDetailData.data;
      startTime = this.getTime(startTime);
      endTime = this.getTime(endTime);
      price = (price*1).toFixed(2).toString().split('.');
      var usedTime=['仅可使用一次','可使用两次','不限次数使用']
    }
    const btnTxt = {
      text: '领取',
      id: 'receive'
    }
    const { dispatch } = this.props;
    return (
      <div id="welDetail">
        <WelReceive rightid={_id} loginData={this.state.loginData} btnTxt={btnTxt} dispatch={this.props.dispatch} hide={this.state.modalHide} hideModal={this.hideModal.bind(this)} />
        <Results hide={this.state.showDetail} dispatch={this.props.dispatch} hideDetail={this.hideDetail.bind(this)} />
        {loading !== false ?<div className="indexLoading"><Icon type='loading' size='sm' /></div>: <div>
          <div className="qy-info">
            <dl>
              <dd><img src={logoUrl} alt="滴滴"/></dd>
              <dt>{name}</dt>
              <dt>&yen; <span> {price[0]}<span>.{price[1]}</span></span></dt>
            </dl>
            <p>
              <span>有效期：{startTime}至{endTime}</span>
            </p>
          </div>
          <WhiteSpace size="sm" style={{background: '#fff',height:'.2rem'}}/>
          <div className="btn">
            {this.state.rightCode? <p>权益码：{this.state.rightCode}</p> :<button onClick={() => {
              this.setState({
                onclick: true
              })
              dispatch({ type: 'welDetail/fetchRightCode', payload: { rightid: _id } })
              
            }}>
              立即领取
            </button>}
          </div>
          <div className="use-info">
            <ul>
              <li className="title">使用须知</li>
              <li>1.使用范围：仅限广东地区使用；</li>
              <li>2.有效期：{startTime}至{endTime}；</li>
              <li>3.每张权益券{usedTime[usedTimes]}；</li>
              <li>4.权益券不可退换、变现，最终解释权归发行方所有。</li>
            </ul>
            <ul>
              <li className="title">商家信息</li>
              <li><span><img src={icon_loc} alt=""/> </span> {sellerAddress}</li>
              <li><span><img src={icon_call} alt=""/> </span> {sellerCustomPhone}</li>
            </ul>
          </div>
        </div>}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    welDetailData: state.indexPage.welDetailData,
    loginData: state.indexPage.loginData,
    loading: state.loading.models.indexPage,
    loading3: state.loading.models.welDetail,
    rightCode: state.welDetail.rightCode
  };
}

export default connect(mapStateToProps)(WelDetail);
