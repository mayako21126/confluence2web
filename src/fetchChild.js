/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2020-04-30 20:09:26
 * @LastEditors: mayako
 * @LastEditTime: 2022-11-24 16:17:00
 */
var moment = require('moment')
const user = require('./user')
const api = require('./api/index')
const fetchChild = async (id, getPage) => {
  console.log(id)
  const treeT = []
  if (!id) {
    console.log('- 不给我Id叫我转什么?')
  }
  var fetchTree = async (id) => {
    const url = `${api}/rest/api/content/search?cql=parent=${id}&expand=history.lastUpdated`
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
  var compare = function (a, b, sortO) {
    const tmp = sortO.page.results
    return tmp.map(s => s.id).indexOf(a.id) < tmp.map(s => s.id).indexOf(b.id) ? -1 : 1
  }
  function getList (id, tree) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fetchTree(id)
        // const data = await tmpdata.json()
        // console.log('33')
        if (data.statusCode !== 500) {
          await Promise.all(data.results.map(async p => {
            const tmp = {
              id: p.id,
              href:'#'+p.id,
              text: p.title,
              title: p.title,
              lastUpdated: p.history.createdDate,
              children: []
            }
            tmp.children = await getList(p.id, tmp.children)
            getPage(p.id, tmp.children)
            if(tmp.children.length>0){
              tmp.nodes = tmp.children
            }
            tree.push(tmp)
            const sortO = await fetchTreeSort(id)
            tree = tree.sort((a, b) => compare(a, b, sortO))
          }))
        }
      } catch (error) {
        console.log(error)
      }
      resolve(tree)
    })
  }
  return getList(id, treeT)
}

module.exports = fetchChild