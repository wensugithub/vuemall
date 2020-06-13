import axios from 'axios'

export  function  request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
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

