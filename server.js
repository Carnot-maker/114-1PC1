import http from 'http';
import router from './2b-refactored.js';// 引入手動定義的路由





const PORT = 3000;
const server = http.createServer(router);

server.listen(PORT, function(){
  // 在終端機（控制台）輸出訊息，告知開發者伺服器已啟動
  // 使用者可以透過瀏覽器訪問 http://localhost:3000 來查看網站
  console.log(`伺服器已啟動！請訪問 http://localhost:${PORT}`);
  console.log('可用路由：');
  console.log(`  - http://localhost:${PORT}`);
  console.log(`  - http://localhost:${PORT}/calculator`);
  console.log('  - 其他路徑將顯示 404 錯誤頁面');
});

