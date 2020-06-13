import {request, requestJsonp} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeMultidataJsonp() {
  return requestJsonp('http://123.207.32.32:8000/home/multidata')
}

