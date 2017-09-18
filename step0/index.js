//引入http模块
const http = require('http')
//参考链接：http://nodejs.cn/api/http.html

let server = http.createServer(function(request,response){
  //设置响应头部内容
  //response.setHeader('Content-Type','text/html')
  response.setHeader('Content-Type',"text/plain;charset=utf-8")

  response.write('<html><head><meta charset="utf-8" /></head>')
  response.write('<body>')
  response.write('<h1>你好</h1>')
  response.write('</body>')

  response.end()
})

console.log('open http://localhost:8888 这个端口号超酷耶' )
server.listen(8888)

//值得思考的内容：
//setHeader的作用、Content-Type的作用、状态码、乱码的解决
//服务器的本质、HTTP协议的本质