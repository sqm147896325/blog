//全局Express框架
const express = require('express')
const router = express.Router()
module.exports = router
//构建express路由
let fs = require('fs')
let formdata = require('formidable')

//查询数据（all方法支持POST、GET、PUT、PATCH、DELETE传参方式）
router.all('/', (request, response) => {
  var form = new formdata.IncomingForm()
  form.uploadDir = '../blog' //指定保存文件的路径，formidable会自动保存文件
  request.files = {}
  request.data = {}
  global.res = response //将响应传入form中
  form
    .on('field', function (name, value) {
      request.data[name] = value //这里提取的是键值对数据
    })
    .on('file', function (name, file) {
      request.files[name] = file //这里提取上传的文件
    })
    .on('end', function () {
      request.startTime = new Date()
      //默认保存的文件名是随机串，需要自己重新指定文件名和后缀
      for (var k in request.files) {
        var f = request.files[k]
        var date = new Date()
        global.filename = date.getTime() + '_' + f.name
        fs.renameSync(f.path, '../blog/' + global.filename)
      }
      //上传则保存
      global.isdel = false
      fs.readdir('../blog', (err, file) => {
        file.forEach((ele, i) => {
          if (ele != global.filename) {
            let tit = ele.split('_')[1]
            if (tit == f.name) {
              global.isdel = true
            }
          }
        })
        if (global.isdel) {
          fs.unlinkSync('../blog/' + global.filename)
          res.writeHead(200, {
            'Content-Type': 'text/plain;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
          })
          response.end('文件名重复！已删除')
          global.isdel = false
        } else {
          res.writeHead(200, {
            'Content-Type': 'text/plain;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
          })
          response.end('已储存')
        }
      })
      // 如果文件名重复则删除
    })
  form.parse(request)
})
