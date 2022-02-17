/**
 * 获取渲染颜色模式的方法，基于现有的主题自定义
 * @returns {string} 'dark' or 'light'
 */
function getWebsiteCardEmbedColorMode() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return 'light';
}

Array.from(document.getElementsByClassName('website-card-embed')).forEach(function (item) {
  item.src = item.getAttribute('data-src') + '&colorMode=' + getWebsiteCardEmbedColorMode();
});
