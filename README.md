# Website Card Embed

欢迎使用 Website Card Embed，只需几个步骤， 你就可以在你的网站中支持以卡片的形式进行文章的引用。

[![使用 Website Card Embed 在你的 Blog 中以卡片形式进行文章引用](https://website-card-embed.vercel.app/api/screenshot?url=https://humble-blog.vercel.app/website-card-embed/)](https://humble-blog.vercel.app/website-card-embed/)

## 演示

![ezgif](https://cdn.jsdelivr.net/gh/Humble-Xiang/picx-images@master/geek/ezgif.7dedemoeu9o0.gif)

## 快速上手

直接访问 [Website Card Embed Demo](https://website-card-embed-demo.vercel.app/?url=https://gohugo.io/about/what-is-hugo/) 或者复制以下代码

```md
<iframe 
  src="https://website-card-embed-demo.vercel.app/?url=https://gohugo.io/about/what-is-hugo/" 
  style="width:100%;height:124px" frameborder="no">
</iframe>
```

到你的 Markdown 文章中预览看下效果。如果你的 Markdown 渲染器支持 iframe，修改 `url=` 后的文章地址来 Enjoy!

[![what-is-hugo](https://website-card-embed.vercel.app/api/screenshot?url=https://gohugo.io/about/what-is-hugo/)](https://gohugo.io/about/what-is-hugo/)

## 降级

值得注意的是上面的方式仅在支持渲染 iframe 标签的 Markdown 引擎中使用，像 Github README 文件是不支持的

[![Github Disallowed Raw HTML](https://website-card-embed.vercel.app/api/screenshot?url=https://github.github.com/gfm/#disallowed-raw-html-extension-)](https://github.github.com/gfm/#disallowed-raw-html-extension-)

Website Card Embed 提供了降级方案 `[![what-is-hugo](https://website-card-embed-demo.vercel.app/api/screenshot?url=https://gohugo.io/about/what-is-hugo/)](https://gohugo.io/about/what-is-hugo/)`，可以使用基础的 Markdown 语法渲染一张带链接的图片在 Github 中使用。

## 使用 Vercel 部署你自己的服务端

为了演示服务的安全和你自己使用时的稳定性考虑，你最好独自使用一个服务端，感谢 [Vercel](https://vercel.com/docs) 让这一切变得十分简单，只需简单几步操作你就可以拥有自己的解析服务了。

1. 点击 [Deploy](https://vercel.com/import/project?template=https://github.com/Humble-Xiang/website-card-embed)，跳转至 Vercel 进行 Server 端部署。
2. 如果你未登录的话，Vercel 会让你注册或登录，请使用 GitHub 账户进行快捷登录。
3. 输入一个你喜欢的 Vercel 项目名称并点击 Create 继续。
4. 此时 Vercel 会基于 Website Card Embed 模板帮助你新建并初始化仓库，仓库名为你之前输入的项目名。
5. 很快，满屏的烟花会庆祝你部署成功，你自己的服务端已经可以使用了。此时点击 Go to Dashboard 可以跳转到应用的控制台。
6. 你可以在 Settings - Domains 中修改 vercel 分配给你的域名，然后通过 `你的域名/?url=文章地址` 来获取文章的卡片形式的预览。

## 使用 Hugo Shortcodes 引用网站

如果你的 Blog 是使用 Hugo 来搭建的，可以使用 Hugo 的 Shortcodes 来引用网站。在你的 Blog `layouts/shortcodes/` 目录下创建 `card.html` 文件并粘贴如下代码。

```html
{{- if .IsNamedParams -}}
<iframe
  class="website-card-embed"
  src="你的域名/?url={{ .Get `url` }}&title={{ .Get `title` }}&description={{ .Get `description` }}&image={{ .Get `image` }}&favicon={{ .Get `favicon` }}"
  style="width:100%;height:124px"
  frameborder="no"
></iframe>
{{- else -}}
<iframe
  class="website-card-embed"
  src="你的域名/?url={{ .Get 0 }}"
  style="width:100%;height:124px"
  frameborder="no"
></iframe>
{{- end -}}
```

现在你可以使用 `{{</* card "https://gohugo.io/about/what-is-hugo/" */>}}` 来引用网站了。

## 静态卡片支持

当出现一个网站总是解析失败的时候，你需要考虑使用静态卡片了。仅需要添加  title、description 等而外参数就可以跳过解析直接生成卡片了。注意不要漏掉 url 参数，不然就会出现虽然渲染了卡片，但是不知道跳转到何处的问题。

```md
{{< card title="What is Hugo"
url="https://gohugo.io/about/what-is-hugo/"
description="Hugo is a fast and modern static site generator written in Go, and designed to make website creation fun again."
favicon="https://gohugo.io/favicon-32x32.png"
image="https://gohugo.io/opengraph/gohugoio-card-base-1_huf001e7df4fd9c00c4355abac7d4ca455_242906_filter_11180610884299235099.png" >}}
```

## 夜间模式支持

想要支持夜间模式你的 `layouts/shortcodes/card.html` 代码需要修改为

```html
{{- if .IsNamedParams -}}
<iframe
  class="website-card-embed"
  data-src="https://website-card-embed-demo.vercel.app/?url={{ .Get `url` }}&title={{ .Get `title` }}&description={{ .Get `description` }}&image={{ .Get `image` }}&favicon={{ .Get `favicon` }}"
  style="width: 100%; height: 124px"
  frameborder="no"
></iframe>
{{- else -}}
<iframe
  class="website-card-embed"
  data-src="https://website-card-embed-demo.vercel.app/?url={{ .Get 0 }}"
  style="width: 100%; height: 124px"
  frameborder="no"
></iframe>
{{- end -}}
```

同时你的网站需要引用如下 js 代码

```js
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
```

也可以通过 `你的域名/website-card-embed.js` 引用

[![hugo-adding-custom-css-js-themes](https://website-card-embed.vercel.app/api/screenshot?url=https://mcneilcode.com/post/web/hugo/hugo-adding-custom-css-js-themes/)](https://mcneilcode.com/post/web/hugo/hugo-adding-custom-css-js-themes/)

如果你使用的 Hugo 主题为 LoveIt 或者基于其开发的新主题，你需要引入的 JS 为 `你的域名/website-card-embed-loveit.js`，代码为

```js
/**
 * 获取渲染颜色模式的方法，基于使用的主题自定义
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
 * 初始化主题切换事件，基于使用主题自定义
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
```

如果你使用的是其他支持夜间模式切换的主题，您也可以参考 `website-card-embed-loveit.js` 来自定义您的颜色模式判断方法。
