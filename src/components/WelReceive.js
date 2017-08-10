import React, { Component } from 'react'
import { NoticeBar,Icon } from 'antd-mobile';
import request from '../utils/request';

let timer;
class WelReceive extends Component {
  constructor(props) {
    super(props)
    this.state = {
      warning:{
        msg:'',
        show: false
      },
      disabled: false,
      countdown:null,
    }
  }
  validateForm(){
    var phoneNum = this.cellNum.value; //手机号
    var imgCode = this.codeNum.value; //图形验证码
    if(phoneNum=='') {
      this.cellNum.focus();
      this.setState({
        warning:{
          show: true,
          msg: '请输入手机号码'
        },
      })
      return;
    }
    if(imgCode=='') {
      this.codeNum.focus();
      this.setState({
        warning:{
          show: true,
          msg: '请输入图形验证码'
        },
      })
      return;
    }
    // 是否可启动倒计时
    this.isVal = true;
  }

  settime() {
    console.log('hahhah')
    if (this.state.countdown == 0) {
      clearTimeout(timer);
      this.setState({
        disabled: false
      })
      return;
    } else {
      this.setState({
        disabled: true,
        countdown: this.state.countdown-1
      })
      
    }
    timer = setTimeout(function() {
      this.settime() }.bind(this)
    ,1000)
  }
  handleClick(){  
    this.cellNum.value = '';
    this.codeNum.value = '';
    this.setState({
        warning:{
          show: false,
          msg: ''
        },
      })
    this.props.hideModal();
  }
  // 变换图片验证码
  change_captcha(img) {
    const path = "https://hd.gf.com.cn/server/level2/order/image?sid="+new Date().getTime();
    img.src = path;
  }
  // 发送短信验证码
  getVerifyCode() {
    var phoneNum = this.cellNum.value.trim(); //手机号
    var imgDOM = this.imgCode;
    var imgCode = this.codeNum.value.trim(); //图形验证码
    console.log(imgCode,phoneNum,'jj')
    request(`/level2/mobile/send_code`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `ticket=${imgCode}&mobile=${phoneNum}`
    }).then(({data})=> {
      console.log(data)
      if(data.error_no=='-400'){
        this.setState({
          warning:{
            show: true,
            msg: data.error_description
          },
        })
        this.change_captcha(imgDOM);
      }
      if(data.error_no=='0'){
        this.setState({
        warning:{
          show: false,
          msg: ''
        },
      })
      }
    });
  }
  signIn(cellNum,msgNum) {
    var imgDOM = this.imgCode;
    request(`/rights/user/login`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `ticket=${msgNum}&mobile=${cellNum}`
    }).then(({data})=> {
      console.log(data,'wo')
      if(data.error_no=='-400'){
        this.setState({
          warning:{
            show: true,
            msg: data.error_description
          },
        })
        this.change_captcha(imgDOM);
      }
      if(data.code=='0'){
        this.setState({
          warning:{
            show: false,
            msg: ''
          },
        })
        this.props.hideModal();
        clearTimeout(timer);
        this.props.dispatch({
          type: 'mineWel/fetchMineWel',
          payload: {
          },
        })
        if(this.props.rightid) {
          this.props.dispatch({
            type: 'welDetail/fetchRightCode',
              payload: {
                rightid: this.props.rightid,
              },
          })
        }
        
      }

    });
  }
  componentWillReceiveProps(nextProps){
    
    const { loginData } = nextProps;
    
    if (loginData && loginData.error_no){
      this.setState({
        warning:{
          show: true,
          msg: loginData.error_description
        },
      })
    }
   
  }

  render() {
    const { dispatch,btnTxt } = this.props;
    return (
      <div style={{display:this.props.hide?'none':'block'}}>
        <div className="mask" onClick={this.handleClick.bind(this)}></div>
        <div className="welReceiveWrap">
          <div id="modal">
            <NoticeBar style={{display:this.state.warning.show?'flex':'none',marginBottom:'.2rem'}} mode="" icon={<Icon type="cross-circle" size="xs" />}>
              {this.state.warning.msg}
            </NoticeBar>
            <div id="welReceive">
              <div className="inputTxt">
                <div className="form-group">
                  <div className="cellNum ipt">
                    <input type="text" ref={input => this.cellNum = input} name="cellNum" autoFocus="autofocus" placeholder="输入手机号码"/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="codeNum ipt">
                    <input type="text" ref={input => this.codeNum = input} name="codeNum" placeholder="输入图形中的数字"/>
                  </div>
                  <div className="imgcode">
                    <img src="https://hd.gf.com.cn/server/level2/order/image" alt="" ref={img => this.imgCode = img} onClick={(e)=>{
                      this.change_captcha(e.target);
                    }} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="inputCode ipt">
                    <input type="text" name="msgNum" ref={input => this.msgNum = input} placeholder="输入短信验证码"/>
                  </div>
                  <div className="mes-idt">
                    <button disabled={this.state.disabled} ref={btn => this.validateBtn = btn} onClick={(e)=>{
                      
                      e.preventDefault();
                      this.validateForm();
                      console.log('heh')
                      this.setState({
                        countdown: 60,
                        
                      },function(){
                        this.isVal && this.settime();
                        this.getVerifyCode();
                      })
 
                    }}>{this.state.disabled?this.state.countdown+'秒':'验证'}</button>
                  </div>
                </div>
                <div className="form-group">
                  <button className="btn-receive" onClick={()=>{
                    this.validateForm();
                    const cellNum = this.cellNum.value.trim();
                    const msgNum = this.msgNum.value.trim();
                    if(msgNum=='') {
                      this.msgNum.focus();
                      this.setState({
                        warning:{
                          show: true,
                          msg: '请输入短信验证码'
                        },
                      })
                      return;
                    }
                    //登录
                    this.signIn(cellNum,msgNum);
                    // dispatch({
                    //   type: 'indexPage/fetchAccess',
                    //   payload: {
                    //     mobile: cellNum,
                    //     ticket: msgNum,
                    //     rightid: this.props.rightid || '',
                    //   }
                    // })
                  }}>{btnTxt.text}</button>
                </div>
              </div>
            </div>
        
          </div>
        </div>
      </div>
    )
  }
}

export default WelReceive;
