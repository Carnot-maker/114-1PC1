import userController from './userController.js';




function router(req, res) {
  let filePath = '';//創建filePath變數，儲存要渲染的 EJS 模板文件路徑
  let fileOtherFile = '';//儲存靜態資源（CSS、JS 等）的路徑
  var data={};

  switch (req.url) {
    case '/':
      //我增加了篩選請求方法的功能
      if (req.method === 'GET') {
      filePath = '/index.ejs';
      data = "您好 xxx";
    } else if (req.method === 'POST') {
      console.log('接收到 POST 請求');
    }
      break;
    case '/calculator':
      //我增加了篩選請求方法的功能
      if (req.method === 'GET') {
        filePath = '/index2.ejs';
        break;
      } else if (req.method === 'POST') {
        console.log('接收到 POST 請求');
      }

    default:// 如果都不是上面定義的 
      filePath = req.url;// 直接把網址當作檔案路徑
      fileOtherFile = filePath;// 標記這可能是一個靜態檔案
      break;
  }

  userController(res, filePath, fileOtherFile, data);
}




export default router;//  這裡改成 ES6 語法