/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2020-04-30 20:09:26
 * @LastEditors: mayako
 * @LastEditTime: 2021-08-25 14:45:06
 */ 
const fs = require('fs')
const request = require('request')
const api = require('./api/index')
const user = require('./user')

function downloadImg (idAndName, dest, cb) {
  var url = (/http|https:\/\//g).test(idAndName)
    ? idAndName :`${api}/download/attachments/${encodeURI(idAndName)}`

  let file = fs.createWriteStream(dest)
  request.head(url, function (err, res, body) {
    request({
      url:url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${new Buffer.from(user).toString('base64')}`
      }
    })
    .pipe(file)
    .on('error', (err) => console.log('err', err))
    .on('finish', () => file.close())
    .on('close', cb)
  })
}

module.exports = downloadImg
