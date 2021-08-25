/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2020-04-30 20:09:26
 * @LastEditors: mayako
 * @LastEditTime: 2021-08-25 13:50:12
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
