把一个区域的停车位写进 data.js 的 `window.PARKING_AREAS`。同一区域里的餐厅会自动共用这些停车位（离餐厅 `PARKING_RADIUS` 米以内的才显示，默认 500）。

我给的内容：$ARGUMENTS

格式一般是：区域名，然后一条一条的停车位（街名、停车场名字、或 Google Maps 链接），后面可能带备注（费用、时限、"估的"之类）。

步骤：
1. 第一段是区域名（如 North Adelaide、CBD、Norwood）。data.js 里已经有这个区域就往它的 `spots` 里追加，没有就新建 `{ area: "...", spots: [] }`。
2. 每个停车位：
   - 有 Google Maps 链接 → 用 WebFetch 打开，按 CLAUDE.md 取 `!3d` / `!4d` 坐标，写成 point。名字用 `/place/` 后面的名字，可以加中文说明。
   - 停车场名字（Wilson、UPark、Council car park、绿地等）→ WebSearch 查它的位置，写成 point。查不到就用 Nominatim（不用 key）：
     `curl -s -A "restaurant-map" "https://nominatim.openstreetmap.org/search?q=<名字>,+<区域>,+Adelaide&format=json&limit=3"`
   - 街名路边位 → 用 Nominatim 拿这条街的线，再截取在该区域内、靠近餐厅扎堆处的一段，2–4 个点，写成 street：
     `curl -s -A "restaurant-map" "https://nominatim.openstreetmap.org/search?q=<街名>,+<区域>,+Adelaide&format=json&polygon_geojson=1&limit=3"`
     结果里 `geojson.coordinates` 是 `[lng, lat]`，写进 `coords` 时要调成 `[lat, lng]`。一条街太长就只取靠近餐厅的那一段。
   - 备注（费用、时限、周末规则）原样放进 `note`。坐标是估的就在 `note` 里加"位置估算"。
3. 运行 `node -e "global.window={};require('./data.js');console.log(window.PARKING_AREAS.map(a=>a.area+': '+a.spots.length+' 个'))"` 确认文件没写坏。
4. 给我看新加的那一段，然后 `git add data.js && git commit -m "parking: <区域名>" && git push`。

不要改 index.html。备注原样放，不润色。
