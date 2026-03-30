const script = document.createElement('script');
const errorLogs = []
script.src = chrome.runtime.getURL('injected_script.js');
script.onload = function() {
  this.remove(); // 読み込み後はタグを削除
};
(document.head || document.documentElement).appendChild(script);

// 注入したスクリプトからのデータを受け取る
window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data.type && event.data.type === "FROM_PAGE_CONSOLE") {
    // ここでバックグラウンドやストレージに送る処理を書く
    var isSuccessed = true
    var obj = null
    try{
        var obj = JSON.parse(event.data.text)
        console.log(obj)
        console.log(typeof obj)
    }catch(e){
        errorLogs.push(e)
        isSuccessed = false
    }finally{
        if(isSuccessed){
            var parent = document.querySelector(".cEOodl")
            var i=0
            for(var tg of parent.children){
                var id = obj.data.works[i].id
                if(tg.innerHTML.indexOf("削除済み") !== -1){
                    tg.innerHTML =  tg.innerHTML.replace("もしくは非公開",`<a href="https://www.pixiv.net/artworks/${id}/" target="_blank" >ID: ${id}</a>`)
                    console.log("FOUND A DELETED ARTWORK")
                    tg.querySelector(".bTLPZV").innerHTML += `<div class=""><a href="https://x.com/search?q=${id}%20artworks" target="_blank"><svg width="32" height="32" viewBox="0 0 24 24" xmlns=""><path d="M13.5186 10.7714L19.3439 4H17.9635L12.9054 9.87954L8.86547 4H4.20593L10.315 12.8909L4.20593 19.9918H5.58642L10.9279 13.7828L15.1943 19.9918H19.8539L13.5182 10.7714H13.5186ZM11.6278 12.9692L11.0088 12.0839L6.08383 5.03921H8.20417L12.1787 10.7245L12.7977 11.6098L17.9641 18.9998H15.8438L11.6278 12.9696V12.9692Z" fill="var(--charcoal-service-x)"></path></svg></a></div>`
                    tg.querySelector(".bTLPZV").innerHTML += `<div class=""><a href="https://www.bing.com/search?q=${id}%20pixiv" target="_blank"><img src="https://www.bing.com/favicon.ico"></a></div>`
                    tg.querySelector(".bTLPZV").innerHTML += `<div class=""><a href="https://pixivbox.com/?pid=${id}" target="_blank"><img src="https://pixivbox.com/favicon.ico"></a></div>`
                    tg.querySelector(".bTLPZV").innerHTML += `<br><div class=""><a href="https://pixiv.navirank.com/id/${id}/" target="_blank">Pixiv年鑑</a></div>`

                    
                console.log(tg)
                }
                i++
            }
        }
    }
  }
}, false);