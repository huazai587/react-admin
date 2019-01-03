/*手机号校验*/
export function isvalidateTelphone(rule, value, callback) {
  let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(168)|(17[0-9])|(18[0-9])|(19([6]|[8-9])))\d{8}$/;
  if (value === '') {
    callback(new Error('请输入手机号'));
  } else if (!reg.test(value)) {
    callback(new Error('请正确输入手机号'));
    return false;
  } else {
    callback();
  }
};

/*联系方式校验*/
export function checkTelphone(rule, value, callback) {
  let isPhone = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
  if (value === '') {
    callback(new Error('请填写联系电话'));
  } else if (!isPhone.test(value)) {
    callback(new Error('请正确填写联系电话'));
    return false;
  } else {
    callback();
  }
};

/**/
