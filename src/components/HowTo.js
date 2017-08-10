import React, { Component } from 'react'

class HowTo extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    document.title = '如何成为广发客户';
    function setIframeHeight(iframe) {
      if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
          iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
        }
      }
    }
    
    const iframe = document.getElementById('aiframe');
    iframe.onload = function () {
      console.log(iframe.contentWindow)
      
    }
    
  }
  render() {
    const baseurl = "https://hd.gf.com.cn/gfmobile/open/accPromoNew.html?channel=dzswb00001&_gfsrc=dzswb00001";
    return (
      <iframe src={baseurl} ref={iframe => this.ifr = iframe} id="aiframe" name="mksecondary" height='3000px' width='100%' className="noborder">
      </iframe>
    )
  }
}

export default HowTo;
