export const setCookie = (name: string, value: string, days = 1) => {
  const expires = new Date()
  const oneDayTime = 24 * 60 * 60 * 1000 * days// ms
  expires.setTime(expires.getTime() + oneDayTime)
  document.cookie = `${name}=${escape(value)};expires=${expires['toGMTString']()}`
}
export const getCookie = (name: string) => {
  const flag = `${name}=`
  const cookies = document.cookie.split(';')
  for (let item of cookies) {
    item = item.trim()
    if (item.indexOf(flag) > -1) {
      return unescape(item.substr(flag.length))
    }
  }
  return ''
}
export const deleteCookie = (name: string) => {
  const expires = new Date()
  const oneDayTime = 24 * 60 * 60 * 1000
  const value = getCookie(name)
  expires.setTime(expires.getTime() - oneDayTime)
  document.cookie = `${name}=${escape(value)};expires=${expires['toGMTString']()}`
}