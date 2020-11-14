//全局Express框架
const express = require('express')
const router = express.Router()
module.exports = router
//构建express路由
let fs = require('fs')


//查询数据（all方法支持POST、GET、PUT、PATCH、DELETE传参方式）
router.all('/',(req, res) => {
  fs.readdir('../blog', function (err, data) {
    if (err) {
      console.log(err)
    }
    data.forEach((e, i) => {
      if (e == global.chooseblog) {
        fs.rename('../blog/'+e, '../recycle/'+e,function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(`The ${e} was delete!`);
        })
      }
    })
  })
})