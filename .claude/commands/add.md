从 Google Maps 链接加一家餐厅到 data.js。

我给的内容：$ARGUMENTS

步骤：
1. 找出其中的 Google Maps 链接，用 WebFetch 打开，按 CLAUDE.md 的说明从最终 URL 取餐厅名和 `!3d` / `!4d` 坐标。
2. 其余文字是我的评价和停车说明。评价原样放进 `comment`。停车说明转成 `parking`：
   - "门口停车"、"店门口" → 一个 point，坐标用餐厅坐标往街道方向偏 20 米左右，note 写"店门口，位置估算"。
   - 提到具体停车场名字 → WebSearch 查它的位置，写成 point。
   - 提到某条街 → 查那条街靠近餐厅的一段，写成 street，两三个坐标点。
   - 没提停车 → parking 留空数组。
3. 用 WebSearch 找营业时间，按 hours 格式填。找不到就留空，在最后告诉我。
4. 地址和电话放进 `info`。
5. 把新对象加到 `window.RESTAURANTS` 数组末尾，注意前一个对象后面的逗号。
6. 运行 `node -e "global.window={};require('./data.js');console.log(window.RESTAURANTS.map(r=>r.name))"` 确认文件没写坏。
7. 给我看新加的那一段，然后 `git add data.js && git commit -m "add <餐厅名>" && git push`。

不要改 index.html。不要润色我的评价。
