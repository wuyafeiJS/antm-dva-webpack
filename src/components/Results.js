import React, { Component } from 'react';
import { Result,Icon } from 'antd-mobile';
import { routerRedux } from 'dva/router';

const qypng = require('images/welDetail/quanyi.png')
class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    
  }
  hideModal(){
    this.props.hideDetail();
  }
  render() {
    return (
      <div className="resultWrapper" style={{display:this.props.hide?'block':'none'}}>
        <div className="mask"></div>
        <div id="results">
          <Result
            img={<img src={qypng} alt=""/>}
            title="领取成功"
            message="马上前往“我的“页面使用吧~"
            buttonText='立即使用'
            buttonClick={(e)=>{
              e.preventDefault;
              this.hideModal();
              this.props.dispatch(routerRedux.push('/mineWel'));
              
            }}
          />
        </div>
        </div>
      
    )
  }
}

export default Results;
