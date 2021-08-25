/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2020-04-30 20:09:26
 * @LastEditors: mayako
 * @LastEditTime: 2020-07-09 09:53:44
 */ 
require('dotenv').load()
require('es6-promise').polyfill()
require('isomorphic-fetch')
const chalk = require('chalk')
const fs = require('fs')
const fetchChild = require('./src/fetchChild')
const fetchPage = require('./src/fetchPage')
const fetchPageT = require('./src/fetchPageT')
const handleImg = require('./src/handleImg')
const handleStyle = require('./src/handleStyle')
const handleX = require('./src/handleX')
const insertCatalog = require('./src/insertCatalog')

require('figlet').text('Confluence2K', (e, data) => console.log(e || data))
const id = process.argv[2]
const name = process.argv[3]

// fetchPageT(id).then((data)=>{
//   debugger
// })
fetchChild(id).then((tree) => {
  console.log(tree)
  tree.map(l => {
    getPage(l.id, tree)
    if(l.children){
      l.children.map(f => {
        getPage(f.id, tree)
      })
    }
   
  })
})


function getPage (child, tree) {
  if (!fs.existsSync(`./build/${child}`)) {
    fs.mkdirSync(`./build/${child}`)
  }

  fetchPage(child, (page) => {
    this.title = page.title
    this.page = page.body

    fs.writeFile(`./build/${child}/_tmp.html`, this.page, (err) => {})
  }).then(() => {
    insertCatalog.call(this, tree, this.title, name)
    handleX.call(this, child)
    handleStyle.call(this, child)
  }).then(() => {
    new Promise((resolve) => {
      handleImg.call(this, child)
      resolve()
    })
    .catch(() => {})
  }).then(() => {
    fs.writeFile(`./build/${child}/index.html`, this.page, (err) => {
      console.log(err || `${chalk.cyan(`- got ${child}!`)}`)
    })
  }).catch(() => {})
}
