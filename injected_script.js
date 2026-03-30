(function() {
  const originalLog = console.log;
  console.log = function(...args) {
    // 元のコンソール出力を実行
    originalLog.apply(console, args);

    // 内容をContent Script経由で拡張機能へ送る
    window.postMessage({
      type: "FROM_PAGE_CONSOLE",
      text: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ')
    }, "*");
  };
})();