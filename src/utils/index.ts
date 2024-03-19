import api from '@/api/index'

const util: any = {}
/**
* @desc 两数组是否相等
* @param {Array} arr 数组一
* @param {Array} targetArr 数组二
* @return {Boolean} res 是否相等，是返回true，否返回false
*/
util.arrayEquals = function (arr: any[], targetArr: any[]): boolean {
  return JSON.stringify(arr.sort()) === JSON.stringify(targetArr.sort())
}

/**
* @desc 数组是否包含
* @param {Object} ele 对象
* @param {Array} targetArr 数组
* @return {Boolean} 是否包含，是返回true，否返回false
*/
util.oneOf = function (ele: any, targetArr: any[]): boolean {
  if (targetArr.indexOf(ele) >= 0) {
    return true
  } else {
    return false
  }
}

/**
* @desc 是否为空
* @param {Object} obj 对象
* @return {Boolean} 是否为空，是返回true，否返回false
*/
util.isEmpty = function (obj: any): boolean {
  if (obj === null) return true
  if (typeof obj === 'undefined') {
    return true
  }
  if (typeof obj === 'string') {
    obj = this.trim(obj, 2)
    if (obj === '') {
      return true
    }
    const reg = new RegExp('^([ ]+)|([　]+)$')
    return reg.test(obj)
  }
  return false
}

/**
* @desc 取出两个数组的不同元素
* @param {Array} arr 数组
* @return {Array} 数组
*/
util.getArrDifference = function (arr1: any[], arr2: any[]): any[] {
  return arr1.concat(arr2).filter(function (v, i, arr) {
    return arr.indexOf(v) === arr.lastIndexOf(v)
  })
}

/**
* @desc 删除最后的逗号
* @param {String} str 字符串
* @return {String} 字符串
*/
util.removeLastComma = function (str: string): string {
  return str.lastIndexOf(',') === (str.length - 1) ? str.substring(0, str.length - 1) : str
}

/**
* @desc 去除空格
* @param {String} str 字符串
* @param {Number} 类型 1-所有空格 2-前后空格 3-前空格 4-后空格
*/
util.trim = function (str: string, type = 1): string {
  switch (type) {
    case 1:
      return str.replace(/\s/g, '')
    case 2:
      return str.replace(/(^\s)|(\s*$)/g, '')
    case 3:
      return str.replace(/(^\s)/g, '')
    case 4:
      return str.replace(/(\s$)/g, '')
    default:
      return str
  }
}

/**
* @desc 百分数转小数
* @param {String} str 字符串
* @return {Num} 数字
*/
util.changePercentToPoint = function (str: string | number): string | number {
  if (str.toString().indexOf('%') !== -1) {
    str = str.toString().replace('%', '')
    str = Number(str) / 100
  }
  return str
}

/**
* @desc 获取日期
* @param {Number} len 位数
* @param {Number} mil 毫秒数
* @return {String} 当前日期
*/
util.getDate = function (len: number, mil: number): string {
  let date = null
  if (this.isEmpty(mil)) {
    date = new Date()
  } else {
    date = new Date(mil)
  }
  const year: number = date.getFullYear()
  let month: number | string = date.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  let day: number | string = date.getDate()
  if (day < 10) {
    day = '0' + day
  }
  let hour: number | string = date.getHours()
  if (hour < 10) {
    hour = '0' + hour
  }
  let minutes: number | string = date.getMinutes()
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  let second: number | string = date.getSeconds()
  if (second < 10) {
    second = '0' + second
  }
  let temp: string = year + '-' + month + '-' + day
  if (len !== 10) {
    temp += ' ' + hour + ':' + minutes + ':' + second
  }
  return temp.substring(0, len)
}

/**
* @desc 浮点数加法运算
*/
util.FloatAdd = function (arg1: number | string, arg2: number | string): number {
  let r1, r2
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  const m = Math.pow(10, Math.max(r1, r2))
  return (Number(arg1) * m + Number(arg2) * m) / m
}

/**
* @desc 浮点数减法运算
*/
util.FloatSub = function (arg1: number | string, arg2: number | string): string {
  let r1, r2
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  const m = Math.pow(10, Math.max(r1, r2))
  // 动态控制精度长度
  const n = Math.max(r1, r2)
  return ((Number(arg1) * m - Number(arg2) * m) / m).toFixed(n)
}

/**
* @desc 浮点数乘法运算
*/
util.FloatMul = function (arg1: number | string, arg2: number | string): number {
  let m = 0
  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try { m += s1.split('.')[1].length } catch (e) {}
  try { m += s2.split('.')[1].length } catch (e) {}
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

/**
* @desc 浮点数除法运算
*/
util.FloatDiv = function (arg1: number | string, arg2: number | string): number {
  let t1 = 0
  let t2 = 0
  try { t1 = arg1.toString().split('.')[1].length } catch (e) {}
  try { t2 = arg2.toString().split('.')[1].length } catch (e) {}
  const r1 = Number(arg1.toString().replace('.', ''))
  const r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

/**
* @desc string转为Boolean
* @param {String} str 字符串
* @return {Boolean} 布尔值
*/
util.strToBool = function (str: string | boolean): boolean {
  if (str === 'true' || str === true) {
    return true
  } else if (str === 'false' || str === false) {
    return false
  } else {
    return false
  }
}

/**
* @desc 设置Cookie
* @param {String} name 名字
* @param {String} value 值
*/
util.setCookie = function (name: string, value: string) {
  const exp: any = new Date()
  exp.setTime(exp.getTime() + 30 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

/**
* @desc 取Cookie
* @param {String} name 名字
*/
util.getCookie = function (name: string) {
  let arr: any
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (document.cookie.match(reg)) {
    arr = document.cookie.match(reg)
    return unescape(arr[2])
  } else {
    return null
  }
}

/**
* @desc 删除Cookie
* @param {String} name 名字
*/
util.delCookie = function (name: string) {
  const exp: any = new Date()
  exp.setTime(exp.getTime() - 1)
  const cval = this.getCookie(name)
  if (cval !== null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

/**
* @desc 弹窗高度
*/
util.getlayerHeight = function (): number {
  let h = 600
  if (document.documentElement) {
    if (document.documentElement.clientHeight > 300) {
      h = document.documentElement.clientHeight - 40
    }
  } else {
    if (window.innerHeight > 300) {
      h = window.innerHeight - 40
    }
  }
  return h
}

/**
* @desc 根据id取数组内的数据名称
* @param {Number} id id
* @param {Array} arr 数组
* @param {String} valueName 值名称
* @param {String} fileName 字段名
*/
util.getNameFromArrayById = function (id: number | string, arr: any[], valueName = 'id', fileName = 'dictionaryName'): string {
  let name = ''
  if (!this.isEmpty(arr) && !this.isEmpty(id)) {
    const obj = arr.find(ele => ele[valueName] === id)
    if (obj !== undefined) {
      name = obj[fileName]
    }
  }
  return name
}

/**
* @desc 从地址栏获取参数
* @param {String} name 参数名
*/
util.getUrlParam = function (name: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  const r = window.location.href.substr(1).match(reg) // 匹配目标参数
  if (r != null) return decodeURI(r[2])
  return null // 返回参数值
}

/**
* 数字每三位加逗号
* @param {Number} n 数字
*/
util.formatNumber = function (n: any): string {
  const b: any = parseInt(n).toString()
  const len: number = b.length
  if (len <= 3) { return b }
  const r = len % 3
  return r > 0 ? b.slice(0, r) + ',' + b.slice(r, len).match(/\d{3}/g).join(',') : b.slice(r, len).match(/\d{3}/g).join(',')
}

/**
* 格式化文件大小
* @param {Number} value 文件大小
*/
util.renderSize = function (value: any): string {
  if (util.isEmpty(value)) {
    return '0 Bytes'
  }
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let index = 0
  const srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  let size: number | string = srcsize / Math.pow(1024, index)
  //  保留的小数位数
  size = size.toFixed(2)
  return size + unitArr[index]
}

/**
* 去除html标签
* @param {String} str 字符串
*/
util.removeHtmlTag = function (str: string): string {
  return str.replace(/<[^>]+>/g, '')
}

/**
* 对象数组扁平化
* @param {Array} arr 数组
*/
util.arrayFlatten = function (arr: any[]): any[] {
  return arr.reduce((pre, cur) => {
    if (cur.children) {
      return pre.concat(cur).concat(cur.children)
    } else {
      return pre.concat(cur)
    }
  }, [])
}

/**
* @desc 金额加千位分隔符
* @param {Number} num 金额
*/
util.amountFormat = function (num: number): string {
  const res = num.toString().replace(/\d+/, function (n) { // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
       return $1 + ','
     })
  })
  return res
}

/**
* @desc 对象转换为数组
* @param {Object} obj 对象
* @param {String} valueText 值名称
* @param {String} labelText 文本名称
*/
util.objToArray = function (obj: any, valueText: string, labelText: string): any[] {
  const arr = []
  for (const key in obj) {
    if (obj.hasOwnProperty.call(obj, key)) {
      const temp: any = {}
      temp[valueText] = key
      temp[labelText] = obj[key]
      arr.push(temp)
    }
  }
  return arr
}

/**
* @desc 深拷贝
* @param obj 数据
*/
util.deepClone = function (obj: any, parent: any = null) {
  // return JSON.parse(JSON.stringify(source))
  // parent用于递归循环引用爆栈处理
  // 创建一个新对象
  const result = new obj.constructor() // 保持继承链
  const keys = Object.keys(obj)
  let key = null
  let temp = null
  let _parent = parent
  // 该字段若有父级则需要追溯该字段的父级
  while (_parent) {
    // 如果该字段引用了它的父级则为循环引用
    if (_parent.originalParent === obj) {
      return _parent.currentParent // 循环引用直接返回同级的新对象
    }
    _parent = _parent.parent
  }
  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    temp = obj[key]
    if (temp && this.isType(temp) === 'date') {
      result[key] = new Date(temp)
      continue
    }
    if (temp && this.isType(temp) === 'regExp') {
      result[key] = new RegExp(temp)
      continue
    }
    // 若字段的值是一个对象/数组
    if (temp && (this.isType(temp) === 'object' || this.isType(temp) === 'array')) {
      // 递归执行深拷贝 将同级的待拷贝对象与新对象传递给 parent 方便追溯循环引用
      result[key] = this.deepClone(temp, {
        originalParent: obj,
        currentParent: result,
        parent: parent
      })
    } else {
      result[key] = temp
    }
  }
  return result
}

/**
 * isType 判断数据类型
 * @param obj 要检验类型的数据,必填
 * @param type 要检验的数据类型，选填
 * @returns {String|Boolean} 返回对应数据格式的字符串,或者与type参数比较的布尔值
 */
util.isType = function (obj: any, type: any): string | boolean {
    // tostring会返回对应不同的标签的构造函数
    const toString = Object.prototype.toString
    const map: any = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    }
    if (obj instanceof HTMLElement) {
      return type ? type === 'element' : 'element'
    }
    return type ? type === map[toString.call(obj)] : map[toString.call(obj)]
}

/**
* @desc 同步ajax
* @param {String} root 接口root
* @param {String} method ajax方法
* @param {String} url 接口地址
* @param {Object} obj 参数
*/
util.asyncAjax = async function (root: string, method: string, url: string, obj: any) {
  if (method === 'get') {
    return new Promise((resolve) => {
      console.log(url)
      api[method](root, url, obj, (r: any) => {
        console.log(r)
        if (r.data.code === 0) {
          resolve(r.data.data)
        } else {
          /* ViewUI.Modal.error({
            title: '网络不畅，请重新载入页面'
          }) */
          resolve('')
        }
      })
    })
  }
}

export default util
