/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2022-11-23 16:43:21
 * @LastEditors: mayako
 * @LastEditTime: 2022-11-24 17:12:12
 */
const path = require('path')
const fs = require('fs')

const sourceDir = './src/asset'
const targetDir = './build'

const copy = (sd, td) => {
  // 读取目录下的文件，返回文件名及文件类型{name: 'xxx.txt, [Symbol(type)]: 1 }
  const sourceFile = fs.readdirSync(sd, { withFileTypes: true })
  for (const file of sourceFile) {
    // 源文件 地址+文件名
    const srcFile = path.resolve(sd, file.name)
    // 目标文件
    const tagFile = path.resolve(td, file.name)
    // 文件是目录且未创建
    if (file.isDirectory() && !fs.existsSync(tagFile)) {
      fs.mkdirSync(tagFile, err => console.log(err))
      copy(srcFile, tagFile)
    } else if (file.isDirectory() && fs.existsSync(tagFile)) {
      // 文件时目录且已存在
      copy(srcFile, tagFile)
    }
    !file.isDirectory() && fs.copyFileSync(srcFile, tagFile, fs.constants.COPYFILE_FICLONE)
  }
}

const copyAsset = async () => {
  const startTime = await new Date().getTime()
  console.log(!fs.existsSync(sourceDir),)
  if (!fs.existsSync(sourceDir)) {
    throw error('no such file or directory')
  } else if (!fs.existsSync(targetDir)) {
    await fs.mkdirSync(targetDir, err => console.log(err))
    await copy(sourceDir, targetDir)
  } else {
    await copy(sourceDir, targetDir)
  }

  const endTime = await new Date().getTime()
  console.log("耗时:", ((endTime - startTime) / 1000).toFixed(2) + "s");
}
module.exports = copyAsset