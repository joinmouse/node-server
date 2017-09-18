//引入http、path、fs、url模块
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

let routes = {
  '/a': function(req, res) {
    res.end('match a')
  },
  '/b': function(req, res) {
    res.end('match b')
  },
  '/c': function(req, res) {
    res.end(JSON.stringify(req.query))
  },
  '/search': function(req, res) {
    res.end('username=' + req.body.username + ' '+'password=' + req.body.password)
    console.log(req.body)
  }
}

let server = http.createServer(function(req,res){
  routePath(req,res)
  staticRoot(path.resolve(__dirname,'static'), req, res)
  console.log(__dirname)
  console.log(path.resolve(__dirname,'static'))
  //__dirname是当前文件执行的文件夹，test用console.log(__dirname)
})

console.log('open http://localhost:8888 这个端口号超酷耶' )
server.listen(8888)

function routePath(req,res) {
  //解析请求的url，获取一个对象
  let pathObject = url.parse(req.url,true)
  console.log(pathObject)

  //匹配路由对应的处理函数
  let handleFunction = routes[pathObject.pathname]
  if(handleFunction){
    //将get请求的参数查询赋值给req.query
    req.query = pathObject.query

    //参考：https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
    //post json 解析
    let body = ''
    req.on('data', function(chunk){
      body += chunk
    }).on('end',function(){
      req.body = parseBody(body)
      handleFunction(req,res)
    })
  }
}

function parseBody(body) {
  let obj = {}
  body.split('&').forEach(function(str){
    obj[str.split('=')[0]] = str.split('=')[1]
  })
  return obj
}

function staticRoot(staticPath, req, res) {
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
      res.writeHead(404,'not found') 
      res.end()
    }else {
      console.log('ok')
      res.write(fileContent,'binary')
      res.end()
    }
  })

}
