/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2022-11-23 10:27:45
 * @LastEditors: mayako
 * @LastEditTime: 2022-12-08 14:21:10
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
      <link href="../child/imgbox.css" rel="stylesheet">
      <script src="../ui/jquery-2.2.4.min.js"></script>
      <script src="../child/jquery.imgbox.js"></script>
      <script>
      function resize() {
      let bh = parent.document.body.clientHeight;
      let lh = parent.document.querySelector('.left-menu').scrollHeight
      parent.document.getElementById("contentIf").style.height = bh>lh?bh+'px':lh+'px'; //將子頁面高度傳到父頁面框架
      }
  </script>
    </head>
    <body onload="resize()">
      ${this.page}
    </body>
  `
}

module.exports = handleStyle
