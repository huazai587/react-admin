import {getVerifycode}  from '../config/api';


//获取验证码
export function getAuthCode(telphone,picCode,msg,disabled,count,getPic){
   let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(168)|(17[0-9])|(18[0-9])|(19([6]|[8-9])))\d{8}$/;
        if(telphone ===''){
          this.$message.error(`请输入手机号`);
          return;
        }else if(!reg.test(telphone)){
            this.$message.error(`请正确输入手机号`);
          return;
        }else{
            let params = {
                phone:telphone,
                img_code:picCode
            };
         
           // console.log(params);
            getVerifycode(params).then(data=>{
              //console.log('发送:',data);
              let {ret_code, ret_msg} = data.data;
              //console.log(ret_code)

              if(ret_code ===200){
                msg = `重新发送${this.count}s`;
                disabled = true;
                let clock = window.setInterval(() => {
                   count--
                    this.msg = `重新发送${this.count}s`
                    if (count <= 0) {
                       window.clearInterval(clock);
                       msg = '重新发送';
                       count = 59;
                       disabled = false;
                   }
                  },1000)
              }else {
               getPic();
                this.$message({
                        duration:1000,
                        message:ret_msg,
                        type:"error"
                });
              }
            })
        }
}
// 时间转换
export function formatDateTime(time){
  var date = new Date(time);
  var y = date.getFullYear();  
  var m = date.getMonth() + 1;  
  m = m < 10 ? ('0' + m) : m;  
  var d = date.getDate();  
  d = d < 10 ? ('0' + d) : d; 
  return y + '-' + m + '-' + d;  
}

export function getUrlParam(name){
        /**
         * 纯粹  获取地址栏参数
         */
        let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)","i");
        if(reg.test(window.location.href)){
         var params = unescape(RegExp.$2.replace(/\+/g," "));
            return unescape(RegExp.$2.replace(/\+/g," "))
        }
        return undefined
    }


  export function getUrlStr(name){
        /**
         * 获取地址栏参数并存到cookie
         */
        let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)","i");
        if(reg.test(window.location.href)){
         var params = unescape(RegExp.$2.replace(/\+/g," "));
          setCookie(name,params);
            return unescape(RegExp.$2.replace(/\+/g," "))
        }else {
            return getCookie(name)
        }
        return undefined
    }

  //获取cookie
  export function getCookie(name) {
     var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
     if (arr = document.cookie.match(reg))
      return (arr[2]);
     else
      return null;
  }

  //设置cookie
  export function setCookie (key, value, t) { {
    /* var exdate = new Date();
     exdate.setDate(exdate.getDate() + expiredays);
     document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());*/


var oDate = new Date();
oDate.setDate(oDate.getDate() + t);
document.cookie = key + '=' + value + '; expires=' + oDate.toGMTString()
};
  };

  //删除cookie
  export function delCookie (name) {
     var exp = new Date();
     exp.setTime(exp.getTime() - 1);
     var cval = getCookie(name);
     if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  };

  export function getPageSize(page){
    if(localStorage.getItem("pageSize"+page)==null){
        return 10;
    }else{
      let num = localStorage.getItem("pageSize"+page);
        return parseInt(num)
    }
    
  }
  export function setPageSize(page,val){ 
    localStorage.setItem("pageSize"+page,val)
  }
 