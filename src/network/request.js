import axios from 'axios'

/**
 * jsonP获取数据
 * @param url
 * @returns {Promise<any>}
 */
// export function requestJsonp(url) {
//   return new Promise((resolve, reject) => {
//     window.jsonCallBack = (result) => {
//       resolve(result);
//     }
//     let scriptNode = document.createElement('script');
//     scriptNode.type = "text/javascript";
//     scriptNode.src = `${url}?callback=jsonCallBack`;
//     document.getElementsByTagName('head')[0].appendChild(scriptNode);
//     setTimeout(function () {
//       document.getElementsByTagName('head')[0].removeChild(scriptNode);
//     },1000)
//   })
// }

/**
 * axios获取数据基类
 * @param config
 * @returns {AxiosPromise}
 */
export  function  request(config) {
  const instance = axios.create({
    baseURL: '',
    timeout: 5000
  })
  // 2.axios 相应拦截器
  instance.interceptors.response.use(config => {
    return config
  }, error => {
    console.log(error);
  });
  // 3.发送网络请求
  return instance(config)
}

