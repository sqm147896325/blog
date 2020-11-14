const express = require('express')
const app = express()
const port = 9090 //设置端口号，如果端口号被占用需要自己修改，否则无法跑起来(建议不要用80和8080，一般情况都会被占用)
app.listen(port, () => console.log(`http://127.0.0.1:${port}/api`)) //打印一下接口用例地址
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next() //防止在预请求阶段就响应接口
})

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//加入前端需要访问的接口API名称↓↓↓↓
app.use('/api/bloglist', require('./api/bloglist'))
app.use('/api/chooseblog', require('./api/chooseblog'))
app.use('/api/editblog', require('./api/editblog'))
app.use('/api/upload', require('./api/upload'))
app.use('/api/unblog', require('./api/unblog'))
app.use('/api/md', require('./api/md'))
