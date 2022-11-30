/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2022-11-23 10:27:45
 * @LastEditors: mayako
 * @LastEditTime: 2022-11-30 10:44:03
 */
const fs = require('fs')

function handleStyle (id) {
  // fs.createReadStream('./src/asset/child/style.css')
  // .pipe(fs.createWriteStream(`./build/${id}/style.css`))
  fs.createReadStream('./src/asset/child/dot.svg')
  .pipe(fs.createWriteStream(`./dist/${id}/dot.svg`))

  this.page = `
    <head>
      <meta charset="utf-8" /> 
      <link href="http://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" rel="stylesheet">
      <link href="../child/style.css" rel="stylesheet">
    </head>
    <body>
      ${this.page}
    </body>
  `
}

module.exports = handleStyle
