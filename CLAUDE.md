# 餐厅地图（个人用）

一个只给一个人用的静态网页：地图 + 餐厅图钉 + 我的评价 + 停车点 + 一键导航。托管在 GitHub Pages。

## 文件

- `index.html` — 地图页面。逻辑已经写好，没有明确要求不要改。
- `data.js` — 餐厅清单。**几乎所有维护工作都是改这个文件。**
- `.claude/commands/add.md` — `/add` 命令：从 Google Maps 链接加一家餐厅。

没有构建步骤，没有依赖。改完 data.js 推到 main 分支，GitHub Pages 一两分钟后自动更新。

## data.js 的结构

```js
window.RESTAURANTS = [
  {
    name: "餐厅名",
    lat: -34.9016915, lng: 138.6570486,     // 小数点后至少 6 位
    comment: "我的评价，原样保留我的口吻，不要润色。",
    info: "地址。电话。",                      // 其他资讯，纯文本
    hours: {                                 // 24 小时制；"closed" 或不写 = 休息
      mon: "8:00-21:30",
      tue: "11:30-14:00, 17:00-22:00",       // 多段用逗号
      fri: "17:00-1:00",                     // 跨夜：结束时间小于开始时间即可
      sun: "closed"
    },
    parking: [
      { type: "point",  name: "停车点名", lat: ..., lng: ..., note: "备注" },
      { type: "street", name: "某街路边位", coords: [[lat,lng],[lat,lng]], note: "备注" }
    ]
  }
];
```

规则：
- 每家餐厅一个对象，用逗号隔开，保持文件可直接被浏览器执行（改完用 `node -e "global.window={};require('./data.js');console.log(window.RESTAURANTS.length)"` 验证）。
- `comment` 是我写的，照抄，不改措辞、不加标点润色。
- `hours` 七天都写全；拿不到营业时间就不要编，留空并告诉我。
- 停车点坐标是估的就在 `note` 里说明"位置估算"。

## 从 Google Maps 链接拿坐标

短链接 `https://maps.app.goo.gl/...` 用 WebFetch 打开，看跳转后的最终 URL，形如：

```
https://www.google.com/maps/place/Gico+Eatery/@-34.90,138.65,17z/data=...!3d-34.9016915!4d138.6570486...
```

- 餐厅名在 `/place/` 后面（`+` 是空格）。
- 坐标取 `!3d` 后面的纬度和 `!4d` 后面的经度（**不要**用 `@` 后面那组，那是地图视窗中心，不是店的位置）。
- 营业时间：Google Maps 页面是动态加载的，WebFetch 通常拿不到。用 WebSearch 搜 `"餐厅名" 地址 opening hours`，找到可靠来源（餐厅官网、Google 搜索卡片、Zomato 等）再填；找不到就留空问我。

## 发布

第一次：
```bash
git init -b main && git add . && git commit -m "init"
gh repo create <随机名字> --public --source=. --push
gh api -X POST repos/{owner}/{repo}/pages -f build_type=legacy -f "source[branch]=main" -f "source[path]=/"
```
网址：`https://<用户名>.github.io/<仓库名>/`

以后每次：`git add data.js && git commit -m "add <餐厅名>" && git push`

## 不要做的事

- 不要把 data.js 改成 JSON 文件（本地双击打开 index.html 时 fetch 会失败）。
- 不要引入任何需要 API key 的地图服务。
- 不要加构建工具、框架、包管理。
