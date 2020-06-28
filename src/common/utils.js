/**
 *  事件监听相关
 */
export function debounce(func, delay) {
  // 防抖函数，避免图片加载一次就发送一次请求
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay)
  }
}
