function add (x, y) {
  return x + y
}

/*
*   判断输入的数据是否为空
*   @param str 输入的数据
*/
function isEmpty (str) {//字符串数组对象是否为空
  if (Object.prototype.toString.call(str) === '[object Undefined]' || Object.prototype.toString.call(str) === '[object Null]') { // undefined，null
    return true;
  } if (Object.prototype.toString.call(str) === '[object String]') { // 空字符串，有空格的空字符串
    str = str.replace(/(^\s*)|(\s*$)/g, "")
    return str.length === 0;
  } if (Object.prototype.toString.call(str) === '[object Array]') { // 空数组
    return str.length === 0;
  } if (Object.prototype.toString.call(str) === '[object Object]') { // 空对象
    return JSON.stringify(str) === '{}';
  }
  return false;
}

/**
 * 截取指定字节的字符串
 * @param str{String} 要截取的字符串
 * @param len{Number} 要截取的长度，根据字节计算
 * @param suffix 截取前len个后，其余的字符的替换字符，一般用“…”
 * @returns {*}
 * 注意：1、纯字符串比较，转换成ASCII码在进行比较；
        2、纯数字和数字字符串相比较，则将字符串数字隐式转换成数字再进行比较；
        3、纯数字和非数字字符串比较，都返回false；
 */
function cutString (str, len = 0, suffix = '...') { 
  if (Object.prototype.toString.call(str) !== '[object String]')  { //不为字符串抛出异常
    throw new TypeError ('It is not a string')
  }
  str = str.replace(/(^\s*)|(\s*$)/g, "");
  if (!str) return "";
  if (len <= 0) return "";
  if (!suffix) suffix = "";
  let templen = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) { //返回指定位置的字符的 Unicode 编码,大于255则为中文
      templen += 2;
    } else {
      templen++
    }
    if (templen == len) {
      return str.substring(0, i + 1) + suffix;
    } else if (templen > len) {
      return str.substring(0, i) + suffix;
    }
  }
  return str;
}

/**
 * 获取字符串字节长度
 * @param {String}
 * @returns {Boolean}
 */
function checkLength(str) {
  let realLength = 0;
  if (Object.prototype.toString.call(str) !== '[object String]')  { //不为字符串抛出异常
    throw new TypeError ('It is not a string')
  }
  str = str.replace(/(^\s*)|(\s*$)/g, "");
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    if ((charCode >= 0x0001 && charCode <= 0x007e) || (charCode >= 0xff60 && charCode <= 0xff9f)) realLength += 1;
    else realLength += 2;
  }
  return realLength;
}

/*
*   @param value 检查 value 是否为 Object
*   如果 value 为一个对象，那么返回 true，否则返回 false
*/
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/*
*   防抖动函数
*   @param func 要防抖动的函数
*   @param wait 需要延迟的毫秒数
*   @param options {leading: false,maxWait: 5000,trailing: true}
*   options.leading = false 指定在延迟开始前调用
*   options.maxWait = 5000 设置 func 允许被延迟的最大值
*   options.trailing = true 指定在延迟结束后调用
*   @cancel 取消延迟函数
*   @flush 立即调用函数
    注意: 如果 leading 和 trailing 选项为 true, 则 func 允许 trailing 方式调用的条件为: 在 wait 期间多次调用防抖方法。
    如果 wait 为 0 并且 leading 为 false, func调用将被推迟到下一个点，类似setTimeout为0的超时。
*/
function debounce(func, wait, options) {
    let lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError('Expected a function');
    }
    wait = Number(wait) || 0;
    if (isObject(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;

      return maxing
        ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
        (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }

    function timerExpired() {
      var time = new Date().getTime();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(new Date().getTime());
    }

    function debounced() {
      var time = new Date().getTime(),
          isInvoking = shouldInvoke(time);

      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}

/*
*   防节流函数
*   @param func 需要节流的函数
*   @param wait 时间间隔
*   @param options 选项对象
*/
function throttle(func, wait, options) {
  let leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/*
*   获取url参数对象，或者url参数name的属性值
*   @param url 获取url参数并解析为一个对象
*   @param name 获取url参数name的属性值
*/
function getQueryObject (url, name) {
  if (Object.prototype.toString.call(url) !== '[object String]')  { //不为字符串抛出异常
    throw new TypeError ('It is not a string')
  }
  let objURL = {}
  url.replace(
      new RegExp( "([^?&=]+)=([^?&=]*)", "g" ),
      function( $0, $1, $2 ){
        objURL[ $1 ] = $2;
      }
  );

  if (name) return objURL[name] ? objURL[name] : null
  return objURL;
}

/*
*   键值对转换成URL参数
*   @param data 选项对象,把对象的键值对转换成URL参数
*/
function getQueryString (data) {
  try {
    let tempArr = [];
    for (let i in data) {
      let key = encodeURIComponent(i)
      let value = encodeURIComponent(data[i]);
      tempArr.push(key + '=' + value);
    }
    let urlParamsStr = tempArr.join('&');
    return urlParamsStr;
  } catch (err) {
    return '';
  }
}

/*
*   获取URL属性name的属性值
*   @param data 选项对象,把对象的键值对转换成URL参数
*/
function getQueryName (url, name) {
  //匹配指定name的QueryString
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = url.match(reg);
  if (r != null) {
      return unescape(r[2]); //用于解码"="后的值,即$2
  }
  return null;
};

/*
*   过滤表情
*   @param txt 文本内容
*/
function filterMmoji (txt) {
  for (var i = 0; i < txt.length; i++) {
    var hs = txt.charCodeAt(i);
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (txt.length > 1) {
        var ls = txt.charCodeAt(i + 1);
        var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (txt.length > 1) {
      var ls = substring.charCodeAt(i + 1);
      if (ls == 0x20e3) {
        return true;
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true;
      } else if (0x2B05 <= hs && hs <= 0x2b07) {
        return true;
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true;
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true;
      } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
        || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
        || hs == 0x2b50) {
        return true;
      }
    }
  }
}

/*
*   数组对象通过键去重
*   @param arr 数组
*   @param name 数组对象的属性名,type:string
*/
function arrayUnique(arr, name) {
  let hash = {};
  return arr.reduce(function (item, next) {
    console.log(next)
    console.log(hash)
    hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
    return item;
  }, []);
}

/*
*   获取随机字符串
*   @param len 随机字符串的长度
*   @param 
*/
function randomString (len) {
  len = len || 32;
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

/*
*   刷新页面
*   @param 
*/
function reload () {
  const ua = window.navigator.userAgent.toLowerCase();
  setTimeout(() => {
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      const url = window.location.href;
      if (url.indexOf('?') != '-1') {
        window.location.reload(`${url}&${Date.parse(new Date())}`);
      } else {
        window.location.reload(`${url}?${Date.parse(new Date())}`);
      }
    } else {
      window.location.reload();
    }
  }, 500);
}

/*
*   根据环境，自动判断跳转页面方法
*   @param href 随机字符串的长度
*/
function toURL (url) {
  if (window.location.href.indexOf('localhost') > -1) { // 本地测试
    url = window.location.origin + url;
  } else { // 线上环境/#/Profit/ProfitIndex,/h5/#/Profit/ProfitIndex
    url = `${window.location.origin}/h5${url}`;
  }
  window.location.href = url;
};

/*
*   判断是什么浏览器
*   @param href 随机字符串的长度
*/
function parseOs () {
  const ua = navigator.userAgent.toLowerCase()
  const isWindowsPhone = (/(?:Windows Phone)/i).test(ua) // WindowsPhone手机操作系统
  const isSymbian = (/(?:SymbianOS)/i).test(ua) || isWindowsPhone //SymbianOS(塞班系统)手机操作系统
  const isAndroid = (/(?:Android)/i).test(ua) //是否在安卓手机
  const isFireFox = (/(?:Firefox)/i).test(ua) //火狐浏览器
  const isChrome = (/(?:Chrome|CriOS)/i).test(ua) //谷歌览器
  const isTablet = (/(?:iPad|PlayBook)/i).test(ua) || (isAndroid && !(/(?:Mobile)/i).test(ua)) || (isFireFox && (/(?:Tablet)/i).test(ua)) //是否在平板
  const isPhone = (/(?:iPhone)/i).test(ua) && !isTablet //是否在ipone手机
  const isWinWx = (/(?:WindowsWechat)/i).test(ua) // 是否在 windows 微信内
  const isWxPub = (/(?:MicroMessenger)/i).test(ua) && !isWinWx // 是否在手机微信内
  const isWap = !isWxPub && (isWindowsPhone || isSymbian || isAndroid || isPhone || isTablet) // 是否是手机浏览器
  const isPc = !isWap && !isWxPub && !isWinWx // 是否是电脑浏览器
  return {
    isChrome: isChrome,
    isTablet: isTablet,
    isWxPub: isWxPub,
    isWinWx: isWinWx,
    isWap: isWap,
    isPc: isPc
  }
}

/*
*   跳转到指定位置
*   @param offsetTop 元素距离顶部的距离
*   @param distance 元素的滚动条的垂直位置，相当于(scrollTop)
*   @param step 滚动的速度
*   @param 向下滚动事件(ScrollDown),向上滚动事件(ScrollUp)
*/
function pageScroll (offsetTop) {
  let total = offsetTop
  let distance = document.body.scrollTop || document.documentElement.scrollTop
  
  // 平滑滚动，时长500ms，每10ms一跳，共50跳
  let step = total / 50
  if (total > distance) {
    ScrollDown()
  } else {
    let newTotal = distance - total
    step = newTotal / 50
    ScrollUp()
  }

  //向下滚动
  function ScrollDown () {
    if (distance < total) {
      distance += step
    　document.body.scrollTop = distance
      document.documentElement.scrollTop = distance
      setTimeout(ScrollDown, 10)
    } else {
      document.body.scrollTop = total
      document.documentElement.scrollTop = total
    }
  }

  //向上滚动
  function ScrollUp () {
    if (distance > total) {
      distance -= step
      document.body.scrollTop = distance
      document.documentElement.scrollTop = distance
      setTimeout(ScrollUp, 10)
    } else {
      document.body.scrollTop = total
      document.documentElement.scrollTop = total
    }
  } 
}

/*
*   失去焦点时，执行事件
*   @param iphone手机在微信里，点击input，失去焦点不会自动返回顶部
*/
function changeBulr () {
  const ua = navigator.userAgent.toLowerCase()
  if ((/(?:iPhone)/i).test(ua) && (/(?:MicroMessenger)/i).test(ua)) {//ipone手机，微信
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }
}

/*
*   Input验证
*   @param value  验证的文本
*   @param type   验证的类型
*   @param notice 验证的提示语
*/
function validations (value, type, notice) {
  const vm = this;
  let go = true;
  value = value.replace(/\s+/g, '');
  if (type === 'tel') { // 手机号码
    if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(value))) {
      vm.$toast(notice);
      go = false;
    }
  } else if (type === 'num') { // 数字类型
    if (!(/^[0-9]*$/i.test(value)) && value.length > 0) {
      vm.$toast(notice);
      go = false;
    }
  } else if (type === 'int') { // 正整数
    if (!(/^([1-9][0-9]*)$/.test(value))) {
      vm.$toast(notice);
      go = false;
    }
  } else if (type === 'extand') { // 数字和字母
    if (!(/^[A-Za-z0-9]+$/.test(value))) {
      vm.$toast(notice);
      go = false;
    }
  } else if (type === 'email') { // 邮箱
    if (!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value))) {
      vm.$toast(notice);
      go = false;
    }
  } else if (type === 'pwd') { // 密码
    if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{7,16}$/.test(value))) {
      vm.$toast(notice);
      go = false;
    }
  } else if (type === 'cvv2') { // CVV2码
    if (!(/^[0-9]*$/i.test(value))) {
      vm.$toast(notice);
      go = false;
    }
  } else if (type === 'validity') { // 卡有效期
    if (!(/^[0-9]*$/i.test(value))) {
      vm.$toast(notice);
      go = false;
    } else if (parseInt(value.substr(0, 2)) > 12) {
      vm.$toast(notice);
      go = false;
    }
  } else if (type === 'idCardNo') { // 身份证
    if (!(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(data))) {
      vm.$toast(notice);
      go = false;
    }
  } else if (type === 'postCode') { // 邮箱编码
    if (!(/^[0-9]{6}$/.test(value))) {
      vm.$toast(notice);
      go = false;
    }
  } else if (type === 'value') { // 中文且长度在2到15位之间
    if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(value))) {
      vm.$toast(notice);
      go = false;
    }
  } else if (type === 'extandund') { // 数字、字母、下划线
    if (!(/^\w+$/.test(value))) {
      vm.$toast(notice);
      go = false;
    }
  } else if (type === 'length') { // 内容不能为空
    if (!value || value.length === 0) {
      vm.$toast(notice);
      go = false;
    }
  }
  return go;
} 
  


export {
  add,
  isEmpty,
  cutString,
  checkLength,
  isObject,
  debounce,
  throttle,
  getQueryObject,
  getQueryString,
  getQueryName,
  filterMmoji,
  arrayUnique,
  randomString,
  reload,
  toURL,
  parseOs,
  pageScroll,
  changeBulr,
  validations
}
