import fs from 'fs';
import ejs from 'ejs';



function renderTemplate(res, filePath, data = {}) {

    fs.readFile(('.' + filePath), 'utf8', function(err, template)  { 
          //'.' ：代表 「當前目錄」
          //這行程式碼 '.' + filePath 的動作非常單純，就是 「字串拼接」
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('錯誤：無法讀取模板文件 - ' + err.message);
            return;
          }
          const html = ejs.render(template, data);//這裡用了EJS的render方法來渲染模板，並傳入資料
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });//這串文字叫做 HTTP Header (回應標頭)，它是瀏覽器的「使用說明書」。
          //直接寫死 'text/html; charset=utf-8' 反而更合理，因為 EJS 模板渲染後的內容本質上是 HTML，所以不需要受到 mimeTypes.js 的影響。
          res.end(html);
        });

} 

export default renderTemplate;// 這裡改成 ES6 語法