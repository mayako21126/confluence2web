/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2020-04-30 20:09:26
 * @LastEditors: mayako
 * @LastEditTime: 2022-12-08 11:23:07
 */
const fs = require('fs')
const chalk = require('chalk')

function insertChild (title) {
  // var fristPage = 99999999999

  // var link = (id, title, hasChild) => {
  //   fristPage = +id < fristPage ? id : fristPage
  //   return `<a class="link ${hasChild ? 'has-child': ''}" href="../${id}/index.html">${title}</a>`
  // }


  // var Tree = (tree) => {
  //   var cata = ''

  //   tree.map(l => {
  //     if (l.children&&l.children.length>0) {
  //       var leafs = ''
  //       l.children.map(f => {
  //         leafs += link(f.id, f.title, 0)
  //       })
  //       cata += `
  //         ${link(l.id, l.title, 1)}
  //         <ul class='cata-ul'>${leafs}</ul>`
  //     } else {
  //       var leafs = ''
  //       cata += `${link(l.id, l.title, 0)}`
  //     }
  //   })

  //   return cata
  // }

  this.title = title

//   <div class="catalog">
//   <h1 class='title'>${name}</h1>
//   <h3 style='padding-left: 20px;'>目录</h3>
//   ${Tree(tree)}
// </div>
  this.page = `
    <div class='main-view'>
      <h1 style='margin: 30px 0 50px;'>${title}</h1>
      ${this.page}
    </div>
    <script>
    $(".xxa").imgbox({
      alignment: 'auto', // Position - may be auto OR center.
      hideOnOverlayClick: true, // Hide imgBox when the overlay is clicked.
      hideOnContentClick: true, // Hide imgBox when the image is clicked.
      slideshow: false, // Display next/previous controls.
    });
  </script>`
}

module.exports = insertChild
