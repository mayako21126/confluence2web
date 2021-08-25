/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2020-04-30 20:09:26
 * @LastEditors: mayako
 * @LastEditTime: 2020-07-08 18:07:10
 */ 
var moment = require('moment')
const api = require('./api/index')

const fetchChild = (id, cb) => {
  console.log(id)
  if (!id) { console.log('- 不给我Id叫我转什么?') }

  var fetchTree = (id) => {
    const url = `${api}/rest/api/content/${id}/descendant?expand=page`
    console.log(url)
    return fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${new Buffer.from('peng.han:ais&ei3Yeihoo5d').toString('base64')}`
      }
    }).then(res => res.json())
  }

  var compare = (a, b) => moment(b.lastUpdated).isSameOrBefore(a.lastUpdated) ? 1 : -1

  return fetchTree(id).then((data) => {
    var tree = []
    data.results.map(p => {
      tree.push({
        id: p.id,
        title: p.title,
        lastUpdated: p.history.createdDate,
        children: [] })
    })
    return tree.sort((a, b) => compare(a, b))
  }).then((parents) =>{
    const eachFetch = parents.map(l => {
      return fetchTree(l.id).then(data => {
        if(data.statusCode===500){
          return { id: l.id,
            title: l.title}
        }
        return {
          id: l.id,
          title: l.title,
          children: data.results.map(f => {
            return {
              id: f.id,
              title: f.title,
              lastUpdated: f.history.createdDate,
            }
          }).sort((a, b) => compare(a, b))
        }
      })
    })

    return Promise.all(eachFetch)
  })
}

module.exports = fetchChild
