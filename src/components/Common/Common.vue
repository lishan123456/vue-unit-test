<template>
  <div class="common">
    <h3 class="h3">方法测试案例：</h3>
    <ul class="nav">
      <li>add(x, y):两个参数相加，add(2,3) = 5</li>
      <li>isEmpty(str):判断输入的数据是否为空，isEmpty({}) = true</li>
      <li>cutString(str, len = 0, suffix = '...'):截取指定字节的字符串，cutString('hoell world', 5, '...') = hoell</li>
      <li>checkLength('你好啊！'):获取字符串字节长度，checkLength('你好啊！') = 8 </li>
      <li>isObject(value):是否为 Object，isObject(function(){}) = true</li>
      <!-- <li>debounce:防抖动</li>
      <li>throttle:防节流</li> -->
      <li>getQueryObject(url, 'name'):获取url参数对象，或者url参数name的属性值</li>
      <li>getQueryString:键值对转换成URL参数</li>
      <li>filterMmoji</li>
      <li>arrayUnique</li>
      <li>randomString</li>
      <li>reload</li>
      <li>toURL</li>
      <li>parseOs</li>
      <li>pageScroll</li>
      <li>changeBulr</li>
      <li>validations</li>
    </ul>
  </div>
</template>

<script>
import {add,
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
  validations} from '@/common/js/common'

export default {
  name: 'common',
  data () {
    return {
    }
  },
  mounted () {
    console.log('add(2,3) = ' + add(2, 3))
    console.log('isEmpty({}) = ' + isEmpty({}))
    console.log("cutString('hoell world', 5, '...') = " + cutString('hoell world', 5, '...'))
    console.log("checkLength('你好啊！') " + checkLength('你好啊！'))
    console.log('isObject(function(){}) = ' + isObject(function(){}))
    console.log("getQueryObject('http://baidu.com?name=lishan&id=12&code=1000') =" + getQueryObject('http://baidu.com?name=lishan&id=12&code=1000'))
    console.log("getQueryObject('http://baidu.com?name=lishan&id=12&code=1000', 'id') =" + getQueryObject('http://baidu.com?name=lishan&id=12&code=1000', 'id'))
  },
}
</script>

<style lang="scss" scoped>
.h3 {font-size: 24px;text-align: left;}
.nav {list-style-type: circle;text-align: left;}
</style>