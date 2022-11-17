/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2020-04-30 20:09:26
 * @LastEditors: mayako
 * @LastEditTime: 2022-11-17 10:46:02
 */ 
var moment = require('moment')
const user = require('./user')
const api = require('./api/index')

const fetchChild = (id, cb) => {
  console.log(id)
  if (!id) { console.log('- 不给我Id叫我转什么?') }

  var fetchTree = (id) => {
    const url = `${api}/rest/api/content/search?cql=parent=${id}&expand=history.lastUpdated`
    console.log(url)
    return fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${new Buffer.from(user).toString('base64')}`
      }
    }).then(res => res.json())
  }
  var fetchTreeSort = (id) => {
    const url = `${api}/rest/api/content/${id}/child?expand=page`
    return fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${new Buffer.from('peng.han:ais&ei3Yeihoo5d').toString('base64')}`
      }
    }).then(res => res.json())
  }
  var compare = function(a,b,sortO){
    const tmp = sortO.page.results
    return tmp.map(s=>s.id).indexOf(a.id)<tmp.map(s=>s.id).indexOf(b.id)?-1:1
  }
  return fetchTree(id).then(async (data) => {
    var tree = []
    data.results.map(p => {
      tree.push({
        id: p.id,
        title: p.title,
        lastUpdated: p.history.createdDate,
        children: [] })
    })
    const sortO = await fetchTreeSort(id)
    return tree.sort((a,b)=>compare(a,b,sortO))
  }).then((parents) =>{
    const eachFetch = parents.map(l => {
      return fetchTree(l.id).then(async data => {
        if(data.statusCode===500){
          return { id: l.id,
            title: l.title}
        }
        const sortO = await fetchTreeSort(l.id)
        return {
          id: l.id,
          title: l.title,
          children: data.results.map(f => {
            return {
              id: f.id,
              title: f.title,
              lastUpdated: f.history.createdDate,
            }
          }).sort((a,b)=>compare(a,b,sortO))
        }
      })
    })

    return Promise.all(eachFetch)
  })
}

module.exports = fetchChild
