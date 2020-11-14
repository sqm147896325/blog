//全局Express框架
const express = require('express')
const router = express.Router()
module.exports = router
//构建express路由
let fs = require('fs')

//查询数据（all方法支持POST、GET、PUT、PATCH、DELETE传参方式）
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
        fs.readFile(`../blog/${e}`,'utf-8',function(err,data){
            res.json(data)
            res.end()
        })
      }
    })
  })
})
