//全局Express框架
const express = require('express')
const router = express.Router()
module.exports = router
//构建express路由
let fs = require('fs')

//查询数据（all方法支持POST、GET、PUT、PATCH、DELETE传参方式）
router.all('/', (req, res) => {
  // 直接用一个 / 表示该文件的根位置
  fs.readdir('../blog', function (err, data) {
    if (err) {
      console.log(err)
    } else {
      let bloglist = new Array
      data.forEach((e, i) => {
        if (/\.md$/.test(e)) {
          bloglist.push(e.split('.')[0])
        }
      })
      res.json(bloglist)
    }
    res.end()
  })
})
