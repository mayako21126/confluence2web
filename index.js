/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2020-04-30 20:09:26
 * @LastEditors: mayako
 * @LastEditTime: 2022-12-09 10:09:56
 */
require('dotenv').load()
require('es6-promise').polyfill()
require('isomorphic-fetch')
const chalk = require('chalk')
const fs = require('fs')
const fetchChild = require('./src/fetchChild')
const fetchPage = require('./src/fetchPage')
const handleImg = require('./src/handleImg')
const handleStyle = require('./src/handleStyle')
const handleX = require('./src/handleX')
const insertChild = require('./src/insertChild')
const copyAsset = require('./src/copy')

require('figlet').text('Confluence2K', (e, data) => console.log(e || data))
const id = process.argv[2]
const name = process.argv[3]

fetchChild(id, getPage).then((tree) => {
  copyAsset()
  // console.log(tree)
  buildIndex(tree, name)
})


function getPage(child, tree) {
  if (!fs.existsSync(`./dist`)) {
    fs.mkdirSync(`./dist`)
  }
  if (!fs.existsSync(`./dist/${child}`)) {
    fs.mkdirSync(`./dist/${child}`)
  }

  fetchPage(child, (page) => {
    this.title = page.title
    this.page = page.body

    fs.writeFile(`./dist/${child}/_tmp.html`, this.page, (err) => {})
  }).then(() => {
    insertChild.call(this, this.title)
    handleX.call(this, child)
    handleStyle.call(this, child)
  }).then(() => {
    new Promise((resolve) => {
        handleImg.call(this, child)
        resolve()
      })
      .catch(() => {})
  }).then(() => {
    fs.writeFile(`./dist/${child}/index.html`, this.page, (err) => {
      console.log(err || `${chalk.cyan(`- got ${child}!`)}`)
    })
  }).catch(() => {})
}

function buildIndex(tree, name) {
  this.page = `
  <head>
    <meta charset="utf-8" /> 
    <link href="./ui/bootstrap.min.css" rel="stylesheet">
    <link href="./ui/bootstrap-treeview.min.css" rel="stylesheet">
    <link href="./ui/style.css" rel="stylesheet">
  </head>
  <body>
  <div class="container">
  <div class="row">
    <div class="col-sm-2 left-menu">
    <div class="menu_title">${name}</div>
      <div id="treeview-selectable" class=""></div>
    </div>
    <div class="input-group left-search">
    <span class="input-group-addon" id="basic-addon1"><span class="icon expand-icon glyphicon glyphicon-search"></span></span>
    <input type="input" class="form-control" id="input-select-node" placeholder="请输入目录章节名" aria-describedby="basic-addon1" value="">
  </div>
    <div class="col-sm-10">
    <iframe id="contentIf"  allowtransparency="true" frameborder="0" height="260" hspace="0" vspace="0" src="" scrolling=""></iframe>
    </div>
  </div>
</div>
  <script src="./ui/jquery-2.2.4.min.js"></script>
  <script src="./ui/bootstrap.min.js"></script>
  <script src="./ui/bootstrap-treeview.min.js"></script>
  <script type="text/javascript">
  var defaultData = ${JSON.stringify(tree)};
  </script>
  <script src="./ui/index.js"></script>
  </body>
`
  fs.writeFile(`./dist/index.html`, page, (err) => {
    console.log(err || chalk.blue('- The landPage was saved!'))
  })
}