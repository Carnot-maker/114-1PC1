import path from 'path';
import handleStaticFile from './utils/staticFileHandler.js';
import renderTemplate from './utils/templateRenderer.js';


// 這個 Controller 負責接收路由決定的參數，然後執行實際的商業邏輯
function userController(res, filePath, fileOtherFile, data){
  const extname = (fileOtherFile === '') ? path.extname(filePath) : path.extname(fileOtherFile);

  if (extname === '.ejs') {
    renderTemplate(res, filePath, data)
  } else {
    handleStaticFile(res, fileOtherFile,extname)
  }
}
export default userController;