import Util from '@/utils/index'
import ipJons from '@/../public/assets/json/ip.json'

// 配置API接口地址
const root:any = ipJons

// 引用axios
import axios from 'axios'
import qs from 'qs'

// 自定义判断元素类型JS
function toType (obj: any) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)![1].toLowerCase()
}
// 参数过滤函数
function filterNull (o: any) {
  for (let key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/**
* @desc 处理get,delete方法参数
* @param {String} url 接口地址
* @param {Object} params 参数对象
* @param {String} method 请求方法
*/
function handleGetParams (url: string, params: any, method: string) {
  if (['GET', 'DELETE'].includes(method.toUpperCase())) {
    if (JSON.stringify(params) !== '{}') {
      let pArry = []
      for (let key in params) {
        if (!Util.isEmpty(params[key])) {
          pArry.push({ 'key': key, 'value': params[key] })
        }
      }
      for (let i = 0; i < pArry.length; i++) {
        if (i === 0 && !url.includes('?')) {
          url += '?' + pArry[i].key + '=' + pArry[i].value
        } else {
          url += '&' + pArry[i].key + '=' + pArry[i].value
        }
      }
    }
  }
  return url
}
/**
* @desc 生成headers
* @param {String} url 接口地址
*/
function getHeaders (url: string) {
  let headers: any = {}
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  }
  if (url !== '/module/user/login' && sessionStorage.token !== null) {
    headers['token'] = sessionStorage.token
  }
  if (url === '/module/oss/upload') {
    headers['Content-Type'] = 'multipart/form-data'
  }
  if (url === '/sys/user/logout') {
    headers['refresh_token'] = JSON.parse(sessionStorage.user).refreshToken
  }
  return headers
}
/**
  接口处理函数
* @param {String} rootName root地址
* @param {String} method 请求方法
* @param {String} url 接口地址
* @param {Object} params 参数对象
* @param {Function} callback 返回处理
*/
function apiAxios (rootName: string, method: string, url: string, params: any, callback: any, isShowError: boolean, globalFlag: boolean) {
  if (params) {
    params = filterNull(params)
  }
  let paramsStr = qs.stringify(params)
  url = handleGetParams(url, params, method)
  let headers = getHeaders(url)
  let data = paramsStr
  /* if ((url.indexOf('sys') !== -1 && url.indexOf('sys/uflo') === -1)) {
    data = params
    headers['Content-Type'] = 'application/json; charset=UTF-8'
  } */
  if (url === '/module/oss/upload') {
    data = params
  }
  axios({
    method: method,
    url: url,
    data: ['POST', 'PUT'].includes(method) ? data : null,
    baseURL: globalFlag ? '' : root[rootName],
    withCredentials: false,
    headers: headers
  })
  .then(function (res: any) {
    if (res.data.msg.includes('登录过期')) {
      sessionStorage.clear()
      window.location.href = '/login'
    }
    callback(res)
  })
  .catch(function (err: any) {
    console.log(err)
    if (isShowError) {
      /* ViewUI.Modal.error({
        title: '网络不畅，请重新载入页面'
      }) */
    }
    if (err) {
      console.log('载入错误，' + err)
    }
  })
}
// 下拉接口处理函数
function apiAxiosDownload (rootName: string, url: string, params: any, callback: any, method: string) {
  if (params) {
    params = filterNull(params)
  }
  let paramsStr = qs.stringify(params)
  url = handleGetParams(url, params, method)
  let headers = getHeaders(url)
  axios({
    method: method,
    url: url,
    data: ['POST', 'PUT', 'DELETE'].includes(method) ? paramsStr : null,
    baseURL: root[rootName],
    withCredentials: false,
    headers: headers,
    responseType: 'blob'
  })
  .then(function (res) {
    callback(res)
  })
  .catch(function (err) {
    if (err) {
      console.log('载入错误，' + err)
    }
  })
}
// 下拉接口处理函数
function apiAxiosGeojson (url: string, params: any, callback: any, method: string) {
  if (params) {
    params = filterNull(params)
  }
  let paramsStr = qs.stringify(params)
  url = handleGetParams(url, params, method)
  let headers = getHeaders(url)
  axios({
    method: method,
    url: url,
    data: null,
    baseURL: '',
    withCredentials: false,
    headers: headers
  })
  .then(function (res) {
    callback(res)
  })
  .catch(function (err) {
    if (err) {
      console.log('载入错误，' + err)
    }
  })
}
// 返回在vue模板中的调用接口
export default {
  get: function (rootName: string, url: string, params: any, callback: any, isShowError = true, globalFlag = false) {
    return apiAxios(rootName, 'GET', url, params, callback, isShowError, globalFlag)
  },
  post: function (rootName: string, url: string, params: any, callback: any, isShowError = true, globalFlag = false) {
    return apiAxios(rootName, 'POST', url, params, callback, isShowError, globalFlag)
  },
  delete: function (rootName: string, url: string, params: any, callback: any, isShowError = true, globalFlag = false) {
    return apiAxios(rootName, 'DELETE', url, params, callback, isShowError, globalFlag)
  },
  put: function (rootName: string, url: string, params: any, callback: any, isShowError = true, globalFlag = false) {
    return apiAxios(rootName, 'PUT', url, params, callback, isShowError, globalFlag)
  },
  download: function (rootName: string, url: string, params: any, callback: any, method = 'GET') {
    return apiAxiosDownload(rootName, url, params, callback, method)
  },
  geojson: function (url: string, params: any, callback: any, method = 'GET') {
    return apiAxiosGeojson(url, params, callback, method)
  },
  all: async function (arr: Array<any>) {
    let axiosArr: any = []
    return new Promise((resolve) => {
      for (const iterator of arr) {
        if (iterator.params) {
          iterator.params = filterNull(iterator.params)
        }
        let paramsStr = qs.stringify(iterator.params)
        iterator.url = handleGetParams(iterator.url, iterator.params, iterator.method)
        let headers = getHeaders(iterator.url)
        axiosArr.push(axios({
          method: iterator.method,
          url: iterator.url,
          data: ['post', 'put', 'delete'].includes(iterator.method) ? paramsStr : null,
          baseURL: root[iterator.rootName],
          withCredentials: false,
          headers: headers
        }))
      }
      Promise.all(axiosArr).then((resArr) => {
        // console.log(resArr)
        for (let i = 0; i < resArr.length; i++) {
          arr[i].callback(resArr[i])
        }
        resolve(true)
      }).catch((err) => {
        console.log(err)
        resolve(false)
      })
    })
  }
}
