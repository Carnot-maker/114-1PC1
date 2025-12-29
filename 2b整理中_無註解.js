import http from 'http';
import fs from 'fs';
import ejs from 'ejs';
import path from 'path';


http.createServer( function(req, res)  {
  let filePath = '';//創建filePath變數，儲存要渲染的 EJS 模板文件路徑
  let fileOtherFile = '';//儲存靜態資源（CSS、JS 等）的路徑
  var data;

 
  switch (req.url) {
    case '/':
      filePath = '/index.ejs';
      data = "您好 xxx";
      break;
    case '/calculator':
      filePath = '/index2.ejs';
      break;
    default:
      filePath = req.url;
      fileOtherFile = filePath;
      
  }

 
  
  const contentTypes = {
    '.html': 'text/html; charset=utf-8',        
    '.ejs': 'text/html; charset=utf-8',         
    '.js': 'text/javascript; charset=utf-8',    
    '.css': 'text/css; charset=utf-8',          
    '.json': 'application/json',                
    '.png': 'image/png',                        
    '.jpg': 'image/jpg',                        
    '.gif': 'image/gif',                        
    '.svg': 'image/svg+xml',                    
    '.ico': 'image/x-icon'                      
  };
  const extname = (fileOtherFile === '') ? path.extname(filePath) : path.extname(fileOtherFile);
  const contentType = contentTypes[extname] || 'text/plain';
  
 
  // -------判斷副檔名---------------------------------------
  if (extname === '.ejs') {//讀取一般 EJS 頁面
    //fs.readFile(檔案路徑 , 指定文字編碼 , 回呼函式:錯誤物件＆讀取到的檔案內容)
    fs.readFile(('.' + filePath), 'utf8', 
    function(err, template)  { 
      //'.' ：代表 「當前目錄」
      //這行程式碼 '.' + filePath 的動作非常單純，就是 「字串拼接」
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('錯誤：無法讀取模板文件 - ' + err.message);
        return;
      }
      const html = ejs.render(template, data);//這裡用了EJS的render方法來渲染模板，並傳入資料
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    });

  } else {
    const staticFilePath = '.' + fileOtherFile;
    fs.readFile(staticFilePath, 'utf8' ,(err, content) => {
      if (err) {// 讀取靜態資源失敗，回傳 404
        fs.readFile(('.' + '/index3.ejs'), 'utf8', (err, template) => {
          const html = ejs.render(template);
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(html);
        });
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  }
}).listen(3000, () => {
  console.log('伺服器已啟動！請訪問 http://localhost:3000');
  console.log('可用路由：');
  console.log('  - http://localhost:3000');
  console.log('  - http://localhost:3000/calculator');
  console.log('  - 其他路徑將顯示 404 錯誤頁面');
});

  


