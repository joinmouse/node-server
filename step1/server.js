//引入http、path、fs、url模块
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

function staticRoot(staticPath, req, res) {
  //解析请求的url，获取一个对象
  let pathObject = url.parse(req.url,true)
  console.log(pathObject)

  //根目录'/'默认导向'/index.html'
  if(pathObject.pathname === '/'){
    pathObject.pathname += 'index.html'
  }

  //拼接为一个完整的路径
  let filePath = path.join(staticPath,pathObject.pathname)
  console.log(pathObject.pathname)

  //二进制的形式异步的方式读取文件
  fs.readFile(filePath,'binary',function(err,fileContent){
    if(err) {
      console.log('404,你要找的页面被大海带走了')
      //响应写入头部
      res.setHeader('Content-Type',"text/html;charset=utf-8")
      res.writeHead(404,'not found') 
      res.write('<h1>404，你要找的页面被大海带走了</h1>')
      res.end()
    }else {
      console.log('ok')
      res.write(fileContent,'binary')
      res.end()
    }
  })

}

var server = http.createServer(function(req,res){
  staticRoot(path.resolve(__dirname,'static'), req, res)
  console.log(__dirname)
  console.log(path.resolve(__dirname,'static'))
  //__dirname是当前文件执行的文件夹，test用console.log(__dirname)
})

console.log('open http://localhost:8888 这个端口号超酷耶' )
server.listen(8888)
