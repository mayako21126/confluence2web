/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2020-04-30 20:09:26
 * @LastEditors: mayako
 * @LastEditTime: 2022-12-08 11:30:24
 */
const downloadImg = require('./downloadImg')
const chalk = require('chalk')

function handleImg (id) {
  var page = this.page

  this.page = replace3(page)

  while ((/ac:structured-macro/g).test(page)) {
    page = replace1(page)
    this.page = page
  }

  while ((/ac:image/g).test(page)) {
    page = replace2(page)
    this.page = page
  }



  function replace1 (page) {
    var ac = (/<ac:structured-macro[\s\S]+?>([\s\S]+?)<\/ac:structured-macro>/g).exec(page)

    if ((/<ac:parameter ac:name="diagramName">([\s\S]*)<\/ac:parameter>/g).test(ac[1])) {
      var imgName = (/<ac:parameter ac:name="diagramName">([\s\S]+?)<\/ac:parameter>/g).exec(ac[1])[1]
      imgName = imgName.replace(/[ :]/g, '')
      downloadImg(`${id}/${imgName}.png`, `./dist/${id}/${imgName}.png`, (info) => {
        console.log(chalk.green(`- File ${imgName}.png download completed`))
      })

      return page.replace(ac[0], `<img src='./${imgName}.png' />`)
    } else {
      var code = ac[1].replace(/<ac:parameter[\s\S]+?>[\s\S]+?<\/ac:parameter>/g, '')
      code = code.replace(/ac:plain-text-body|ac:rich-text-body/g, 'pre')
      return page.replace(ac[0], code)
    }
  }

  function replace2 (page) {
    var ac = (/<ac:image[\s\S]*?>([\s\S]+?)<\/ac:image>/g).exec(page)
    var imgName = ''

    if ((/ri:filename=/g).test(ac[1])) {
      imgName = (/ri:filename="([\s\S]+?)"/g).exec(ac[1])[1]
    } else if ((/ri:value=/g).test(ac[1])) {
      imgName = (/ri:value="([\s\S]+?)"/g).exec(ac[1])[1]
    }

    var url = (/http:\/\//g).test(imgName) ? imgName : `${id}/${imgName}`
    imgName = (/http:\/\//g).test(imgName) ? (/[\s\S]*\/([\s\S]*.png)/g).exec(imgName)[1] : imgName
    imgName = imgName.replace(/[ :]/g, '')
    img = `<img src="./${imgName}" />`

    downloadImg(url, `./dist/${id}/${imgName}`, (info) => {
      console.log(chalk.green(`- File ${imgName} download completed`))
    })

    return page.replace(ac[0], img)
  }

  function replace3 (page) {
    return page.replace(/(<img[\s\S]+?src=")([\s\S]+?)(">)/g, (match, s1, s2, s3) => {
      const src = s2.split('"')[0]
      const imgName = decodeURI((/[\s\S]*\/([\s\S]*)/g).exec(s2)[1]).replace(/\?[\x00-\xff]*/g,'')

      downloadImg(src, `./dist/${id}/${imgName}`, (info) => {
        console.log(chalk.green(`- File ${imgName} download completed`))
      })

      return `<a class="xxa" href='${imgName}'>${s1}${imgName.replace('?', '%3F')}${s3}</a>`
    })
  }
}

module.exports = handleImg
