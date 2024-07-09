const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 8080;

// MySQL 连接配置
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql.123', // 请根据实际情况设置密码
  database: 'simple_login'
});

// 连接到数据库
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

// 使用 body-parser 解析 JSON 请求,解析后的 JSON 数据将存储在 req.body 中：{ username: 'A', password: '123' }
app.use(bodyParser.json());

/*提供静态文件  path.join(__dirname, 'public') 
将当前脚本所在目录的路径与 'public' 目录名拼接起来，
生成一个绝对路径。这个绝对路径指向项目根目录下的 public 目录。*/
app.use(express.static(path.join(__dirname, 'public')));

// 安全登录路由



app.post('/login', (req, res) => {
  const { username, password } = req.body;
 // console.log(req.body);
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Database query error' });
      return;
    }
    if (results.length > 0) {
      res.json({ success: true ,message: '你成功了' });
    } else {
      res.json({ success: false, message: '请再试一次' });
    }
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
setTimeout(() => {
  server.close(() => {
    console.log('Server closed after 30 seconds');
  });
}, 30000); // 30 seconds


