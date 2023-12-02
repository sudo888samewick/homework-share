const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // 服务器端口号
const publicDir = path.join(__dirname, 'temp'); // 静态文件目录

// 使用express中间件来指定静态文件目录
app.use(express.static(publicDir));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
