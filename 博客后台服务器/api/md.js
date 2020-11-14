const express = require('express')
const router = express.Router()
module.exports = router
//构建express路由

let path = require('path')
let fs = require('fs')
let marked = require('marked')

let md
// 此变量中保存转格式后的md文件

router.all('/', (req, res) => {
  let choose = req.query.choose
  // 直接用一个 / 表示该文件的根位置
  global.chooseblog = choose
  fs.readdir('../blog', function (err, data) {
    if (err) {
      console.log(err)
    }
    data.forEach((e, i) => {
      if (e == choose) {
        fs.readFile(`../blog/${e}`, 'utf-8', function (err, data) {
          if (err) {
            res.write(
              '<h1 style="background: #999;text-align: center;">404!</h1>'
            )
            res.end()
          } else {
            md = marked(data)
            // md转html格式
            res.send(md)
            res.end()
            // 读取html文件
          }
        })
      }
    })
  })
})
