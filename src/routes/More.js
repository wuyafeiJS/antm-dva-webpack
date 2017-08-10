import React, { Component } from 'react'
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import MoreWelfare from 'components/MoreWelfare'


const gf_qy = require('images/gf_qy.jpg');
const dp_qy = require('images/dp_qy.jpg');

class More extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const body = document.getElementsByTagName('body')[0];
    document.title = '更多特权';
    const iframe = document.createElement("IFRAME");
    iframe.setAttribute("id", "setTitle")
    iframe.setAttribute("src", "/favicon.ico")
    body.appendChild(iframe);
    const frame = document.getElementById('setTitle')
    frame.onload = function () {
      console.log('hah')
      setTimeout(function() {
        iframe.onload = null;
        
        body.removeChild(iframe)
      }, 0);
    }
  }
  render() {
    const {loading, moreData, titleMore} = this.props;
    
    if (loading == false && moreData.data) {
      console.log(moreData)
      const { data } = moreData;
      const icon = moreData.id == '1' ? gf_qy : dp_qy;
      var qydata = {
        title: titleMore,
        titleIcon: icon,
        data:data.rights
      }
    }
      
    return (
      <div id="moreWel">
        {loading !== false ? <div className="indexLoading"><Icon type='loading' size='sm' /></div>:<MoreWelfare weldata={qydata}/>}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    moreData: state.indexPage.moreData,
    titleMore: state.indexPage.titleMore,
    loading: state.loading.models.indexPage
  };
}

export default connect(mapStateToProps)(More);
