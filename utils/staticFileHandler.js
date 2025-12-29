import fs from 'fs';
import ejs from 'ejs';
import getContentType from './mimeTypes.js';

function  handleStaticFile(res,fileOtherFile,extname) {
    const staticFilePath = '.' + fileOtherFile;
    const contentType = getContentType(extname);
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

export default handleStaticFile;