/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2020-04-30 20:09:26
 * @LastEditors: mayako
 * @LastEditTime: 2022-11-25 10:23:58
 */ 
const api = require('./api/index')

const fetchPage = (id, cb) => {
  const url = `${api}/rest/api/content/${id}?expand=body.export_view`
  console.log(url)
  return fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${new Buffer.from('peng.han:ais&ei3Yeihoo5d').toString('base64')}`
    }
  })
  .then(res => res.json())
  .then(data => {
    cb({
      title: data.title,
      body: data.body.export_view.value
    })
  })
}

module.exports = fetchPage
