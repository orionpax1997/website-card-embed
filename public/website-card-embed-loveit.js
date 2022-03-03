/**
 * 获取渲染颜色模式的方法，基于现有的主题自定义
 * @returns {string} 'dark' or 'light'
 */
function getWebsiteCardEmbedColorMode() {
  return document.body.getAttribute('theme') !== 'light' && document.body.getAttribute('theme') !== 'white'
    ? 'dark'
    : 'light';
}

/**
 * 初始化网站卡片
 */
function initWebsiteCardEmbed() {
  Array.from(document.getElementsByClassName('website-card-embed')).forEach(function (item) {
    item.src = item.getAttribute('data-src') + '&colorMode=' + getWebsiteCardEmbedColorMode();
  });
}

/**
 * 初始化主题切换事件
 */
function initSelectThemeListener() {
  var selects = document.getElementsByClassName('color-theme-select');
  for (var i = 0; i < selects.length; i++) {
    selects[i].addEventListener('change', function () {
      setTimeout(function () {
        initWebsiteCardEmbed();
      }, 200);
    });
  }
}

initWebsiteCardEmbed();
initSelectThemeListener();
