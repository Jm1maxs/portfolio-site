# 计铭一 · 游戏系统策划作品集

React / Vite 作品集网站，包含五个项目的主题插画、响应式布局，以及可关闭的动态氛围。

新增作品：[梦的末班车](https://www.taptap.cn/app/956025)，TapTap 聚光灯 Game Jam 参赛作品。游戏介绍依据作品页，程序 / 策划职责依据[团队开发日志](https://www.taptap.cn/moment/861619430835093629)。封面为主题插画，并非游戏截图。

## 本地开发

需要 Node.js 22 或更高版本。

```sh
npm ci
npm run dev
```

## 更新网站

修改 `src/` 中的页面或 `public/` 中的图片，然后运行：

```sh
npm run build
```

将源码和生成的 `docs/` 文件一起提交到 `main` 分支。GitHub Pages 使用 `main` 分支的 `/docs` 文件夹发布，提交更新后会重新部署。

`docs/` 是已构建的网站，源代码保存在 `src/`。资源使用相对路径，支持 GitHub Pages 仓库子路径。

## 内容

项目说明和联系方式位于 `src/data.js`，插画封面配置位于 `src/projectVisuals.js`。插画属于主题视觉，并非实际游戏截图。
