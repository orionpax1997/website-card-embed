/**
 * 获取渲染颜色模式的方法，基于现有的主题自定义
 * @returns {string} 'dark' or 'light'
 */
function getWebsiteCardEmbedColorMode() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return 'light';
}
window.getWebsiteCardEmbedColorMode = getWebsiteCardEmbedColorMode;

(function () {
  var ie = !!(window.attachEvent && !window.opera),
    wk = /webkit\/(\d+)/i.test(navigator.userAgent) && RegExp.$1 < 525;
  var fn = [],
    run = function () {
      for (var i = 0; i < fn.length; i++) fn[i]();
    },
    d = document;
  d.ready = function (f) {
    if (!ie && !wk && d.addEventListener) {
      return d.addEventListener('DOMContentLoaded', f, false);
    }
    if (fn.push(f) > 1) return;
    if (ie)
      (function () {
        try {
          d.documentElement.doScroll('left');
          run();
        } catch (err) {
          setTimeout(arguments.callee, 0);
        }
      })();
    else if (wk)
      var t = setInterval(function () {
        if (/^(loaded|complete)$/.test(d.readyState)) clearInterval(t), run();
      }, 0);
  };
})();

document.ready(function () {
  Array.from(document.getElementsByClassName('website-card-embed')).forEach(function (item) {
    item.src = item.getAttribute('data-src') + '&colorMode=' + window.getWebsiteCardEmbedColorMode();
  });
});
