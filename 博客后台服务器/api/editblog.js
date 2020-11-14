//全局Express框架
const express = require('express')
const router = express.Router()
module.exports = router
//构建express路由
let fs = require('fs')

let bodyParser = require('body-parser')

//查询数据（all方法支持POST、GET、PUT、PATCH、DELETE传参方式）
router.all('/',bodyParser.json(),(req, res) => {
  edit = req.body
  // 这里要使edit传入函数，不加类型修饰
  var date = new Date(`${edit.date[0]}-${edit.date[1]}-${edit.date[2]} ${edit.date[3]}:${edit.date[4]}:${edit.date[5]}:${edit.date[6]}`);
  let time = date.valueOf();
  fs.readdir('../blog', function (err, data) {
    if (err) {
      console.log(err)
    }
    data.forEach((e, i) => {
      if (e == global.chooseblog) {
        fs.writeFile('../blog/'+e, `../blog/${edit.data}`,function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(`The ${e} was rewrite!`);
        })
        fs.rename('../blog/'+e, `../blog/${time}_${edit.tit}.md`,function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(`The ${e} was rename as ${time}_${edit.tit}!`);
        })
      }
    })
  })
  res.end()
})
