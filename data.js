// 餐厅清单。以后加餐厅只改这个文件。
// 每家餐厅：name 名字 / lat lng 坐标 / comment 你的评价 / info 其他资讯 / parking 停车点
// 停车点两种写法：
//   { type: "point",  name: "...", lat: ..., lng: ..., note: "..." }           一个具体位置
//   { type: "street", name: "...", coords: [[lat,lng],[lat,lng], ...], note: "..." }   一段街，画成一条线
// 营业时间 hours：按星期写，24 小时制。写法举例：
//   "8:00-21:30"                 一段
//   "11:30-14:00, 17:00-22:00"   午晚两段
//   "17:00-1:00"                 跨夜，第二天凌晨 1 点关
//   "closed"（或者不写那一天）    休息
// 没写 hours 的餐厅会显示"没填营业时间"，开"只看现在开门的"时会被藏起来。

// ---- 按区域共用的停车位 ----
// 餐厅面板按「停车」时，地图上会显示：这家餐厅自己的 parking，加上下面所有离餐厅
// 不超过 PARKING_RADIUS 米的区域停车位。餐厅专属的（店门口、店后停车场）还是写在餐厅自己的 parking 里。
// 每个区域：area 区域名 / spots 停车位列表，spots 的写法和餐厅的 parking 一样。
window.PARKING_RADIUS = 500;
window.PARKING_AREAS = [
  {
    area: "North Adelaide",
    spots: [
      {
        type: "street",
        name: "O'Connell St 路边位",
        // 南端 Brougham Place 到北端 Barton Terrace，整条街
        coords: [[-34.909400, 138.597120], [-34.906900, 138.596220], [-34.904500, 138.595380], [-34.901940, 138.594480]],
        note: "整条街都有 on street parking。"
      },
      {
        type: "street",
        name: "LeFevre Terrace 路边位",
        // 南端 Brougham Place 到北端 Barton Terrace East，整条街
        coords: [[-34.908390, 138.601390], [-34.905360, 138.600356], [-34.902350, 138.599340]],
        note: "整条街都有 on street parking。"
      },
      {
        type: "street",
        name: "Tynte St 路边位",
        // 西端 Jeffcott St 到东端 LeFevre Terrace，整条街，中间那个点是 O'Connell St 路口
        coords: [[-34.906742, 138.592151], [-34.905982, 138.595812], [-34.905012, 138.600231]],
        note: "上面也很多车位 45度角那种 因为其他很多街道都是resident car park但是这条街不是"
      }
    ]
  },

  {
    area: "Norwood",
    spots: [
      {
        type: "street",
        name: "The Parade 路边位",
        // George St 路口到 Portrush Rd 路口这一段
        coords: [[-34.921120, 138.636500], [-34.921016, 138.638685], [-34.920970, 138.640945]],
        note: "norwood 的parking就是 the parade。George street到portrush road这段。"
      },
      {
        type: "point",
        name: "Coles Norwood 后门停车场",
        // Coles 楼西侧那片停车场的中心（OSM 的停车场范围），不是 The Parade 正门
        lat: -34.921900,
        lng: 138.635000,
        note: "Coles Norwood 的后门。"
      }
    ]
  }

  // 下一个区域从这里加，记得上一个后面加逗号。spots 的写法和餐厅的 parking 一样：
  // ,{
  //   area: "CBD",
  //   spots: [
  //     { type: "point",  name: "Wilson 停车场", lat: -34.9280, lng: 138.6010, note: "周末 $10 封顶" },
  //     { type: "street", name: "Rundle St 路边位", coords: [[-34.9230, 138.6085], [-34.9225, 138.6130]], note: "晚上 6 点后免费" }
  //   ]
  // }
];

// ---- 餐厅清单 ----
window.RESTAURANTS = [
  {
    name: "Gico Eatery",
    lat: -34.9016915,
    lng: 138.6570486,
    comment: "好吃的但是吃不完，带虾的好吃。",
    info: "Unit 7/143 Glynburn Rd, Firle SA 5070。电话 08 7112 5509。",
    hours: {
      mon: "8:00-21:30", tue: "8:00-21:30", wed: "8:00-21:30", thu: "8:00-21:30",
      fri: "8:00-22:30", sat: "8:00-22:30", sun: "8:00-22:30"
    },
    parking: [
      {
        type: "point",
        name: "门口停车",
        lat: -34.90165,
        lng: 138.65680,
        note: "就在店门口。"
      }
    ]
  },

  {
    name: "Taste of Tianfu 天府小馆",
    lat: -34.9004954,
    lng: 138.6350866,
    comment: "这家好香aaaaaa",
    info: "Shop 5/297 Payneham Rd, Royston Park SA 5070。电话 0478 611 727。",
    hours: {
      mon: "closed",
      tue: "17:00-21:00", wed: "17:00-21:00", thu: "17:00-21:00",
      fri: "11:30-14:00, 17:00-21:00", sat: "11:30-14:00, 17:00-21:00", sun: "11:30-14:00, 17:00-21:00"
    },
    parking: [
      {
        type: "point",
        name: "门口停车",
        lat: -34.9005997,
        lng: 138.6351765,
        note: "店门口，位置估算。"
      }
    ]
  },

  {
    name: "Shiqi Restaurant 喜相逢",
    lat: -34.9446211,
    lng: 138.6220149,
    comment: "是粤菜香港人开的。。。",
    info: "104 Glen Osmond Rd, Parkside SA 5063。电话 08 8271 9983。",
    hours: {
      mon: "17:00-21:30", tue: "closed", wed: "17:00-21:30", thu: "17:00-21:30",
      fri: "11:30-14:30, 17:00-21:30", sat: "11:30-14:30, 17:00-21:30", sun: "17:00-21:30"
    },
    parking: [
      {
        type: "point",
        name: "店后停车场",
        lat: -34.9447809,
        lng: 138.6216757,
        note: "店门口旁边有个小小的入口，开进去后面就是停车场。位置估算。"
      }
    ]
  },

  {
    name: "Nijumaru Japanese Restaurant",
    lat: -34.9805286,
    lng: 138.5121972,
    comment: "好吃好吃好吃好吃好吃日料自助海边自己找车位8",
    info: "20 Jetty Rd, Glenelg SA 5045。电话 0401 599 111。",
    hours: {
      mon: "12:00-14:30, 17:00-21:00", tue: "17:00-21:00", wed: "17:00-21:00", thu: "12:00-14:30, 17:00-21:00",
      fri: "12:00-14:30, 17:00-21:30", sat: "12:00-14:30, 17:00-21:30", sun: "12:00-14:30, 17:00-21:00"
    },
    parking: []
  },

  {
    name: "Sushi Train Plympton",
    lat: -34.9653647,
    lng: 138.5537845,
    comment: "sushi train里面食材最新鲜的",
    info: "300B Anzac Hwy, Plympton SA 5038。电话 08 8293 3165。",
    hours: {
      mon: "11:00-21:00", tue: "11:00-21:00", wed: "11:00-21:00", thu: "11:00-21:00",
      fri: "11:00-21:00", sat: "11:00-21:00", sun: "11:00-20:30"
    },
    parking: []
  },

  {
    name: "Sushi Train Firle",
    lat: -34.9027656,
    lng: 138.6571038,
    comment: "sushi train里面食材第二新鲜的（",
    info: "Shop 3/161-167 Glynburn Rd, Firle SA 5070（Firle Shops）。电话 08 8117 3142。",
    hours: {
      mon: "11:00-21:00", tue: "11:00-21:00", wed: "11:00-21:00", thu: "11:00-21:00",
      fri: "11:00-21:00", sat: "11:00-21:00", sun: "11:00-21:00"
    },
    parking: []
  },

  {
    name: "Yakisan",
    lat: -34.9063487,
    lng: 138.5963404,
    comment: "日式fusion的fine dining 有一个带脆米的酒好喝",
    info: "88 O'Connell St, North Adelaide SA 5006（Eighty Eight O'Connell）。电话 08 8166 5866。",
    hours: {
      mon: "17:00-23:00", tue: "closed", wed: "17:00-23:00", thu: "12:00-23:00",
      fri: "12:00-23:30", sat: "12:00-23:30", sun: "12:00-23:00"
    },
    parking: [
      {
        type: "point",
        name: "LeFevre Terrace 绿地停车",
        lat: -34.9043443,
        lng: 138.5993978,
        note: "只能随缘在路边找停车位啦或者停绿地那边了qwq。东边公园旁的停车区，位置估算。"
      },
      {
        type: "point",
        name: "Brougham Gardens 绿地停车",
        lat: -34.9104244,
        lng: 138.5953283,
        note: "只能随缘在路边找停车位啦或者停绿地那边了qwq。南边 Palmer Place 路边，位置估算。"
      }
    ]
  },

  {
    name: "Krung Thep Thai",
    lat: -34.9043595,
    lng: 138.5949712,
    comment: "能吃的泰餐（",
    info: "147 O'Connell St, North Adelaide SA 5006。电话 08 8367 0932。",
    hours: {
      mon: "17:00-21:00", tue: "17:00-21:00", wed: "closed", thu: "17:00-21:00",
      fri: "17:00-21:30", sat: "17:00-21:30", sun: "17:00-21:00"
    },
    parking: []
  },

  {
    name: "ODÉ Bistro",
    lat: -34.9043553,
    lng: 138.5950023,
    comment: "华人开的fine dining嘛但是我没吃过欸",
    info: "151 O'Connell St, North Adelaide SA 5006。电话 0408 276 198。",
    hours: {
      mon: "closed", tue: "18:00-21:30", wed: "18:00-21:30", thu: "18:00-21:30",
      fri: "12:00-15:00, 17:30-22:30", sat: "12:00-15:00, 17:30-22:30", sun: "closed"
    },
    parking: []
  },

  {
    name: "Pastel Wine Bar",
    lat: -34.9078054,
    lng: 138.5962703,
    comment: "会拉丝的pasta和伟大的红酒！",
    info: "47 O'Connell St, North Adelaide SA 5006。电话 08 8361 8714。",
    hours: {
      mon: "17:00-22:30", tue: "17:00-23:00", wed: "17:00-23:00", thu: "17:00-23:00",
      fri: "12:00-0:00", sat: "17:00-0:00", sun: "closed"
    },
    parking: []
  },

  {
    name: "Ting Ting",
    lat: -34.9082666,
    lng: 138.5970928,
    comment: "最好吃的生腌qwq",
    info: "26 O'Connell St, North Adelaide SA 5006。电话 0460 312 046。",
    hours: {
      mon: "17:30-21:30", tue: "17:30-21:30", wed: "closed", thu: "17:30-21:30",
      fri: "11:00-15:00, 17:30-22:00", sat: "11:00-15:00, 17:30-22:00", sun: "11:00-15:00, 17:30-21:30"
    },
    parking: []
  },

  {
    name: "Lucky Lupitas",
    lat: -34.9039395,
    lng: 138.5949836,
    comment: "能吃的墨西哥菜",
    info: "Shop 1/163 O'Connell St, North Adelaide SA 5006。电话 08 8267 3082。",
    hours: {
      mon: "closed", tue: "17:00-22:00", wed: "17:00-22:00", thu: "17:00-22:00",
      fri: "17:00-22:00", sat: "12:00-14:30, 17:00-22:00", sun: "12:00-14:30, 17:00-21:00"
    },
    parking: []
  },

  {
    name: "Gelato Messina North Adelaide",
    lat: -34.9071282,
    lng: 138.5965194,
    comment: "好吃的冰淇淋店",
    info: "Shop AG02, 88 O'Connell St, North Adelaide SA 5006。电话 0489 911 552。",
    hours: {
      mon: "12:00-22:30", tue: "12:00-22:30", wed: "12:00-22:30", thu: "12:00-22:30",
      fri: "12:00-23:00", sat: "12:00-23:00", sun: "12:00-22:30"
    },
    parking: []
  },

  {
    name: "Da Vinci Ristorante",
    lat: -34.9089331,
    lng: 138.5971573,
    comment: "半夜才去的份量很大但是不好吃qwq",
    info: "10 O'Connell St, North Adelaide SA 5006。电话 08 7184 5105。",
    hours: {
      mon: "8:00-2:00", tue: "8:00-2:00", wed: "8:00-2:00", thu: "8:00-2:00",
      fri: "8:00-3:00", sat: "8:00-3:00", sun: "8:00-2:00"
    },
    parking: []
  },

  {
    name: "Fairview Chinese Restaurant 富景",
    lat: -34.895479,
    lng: 138.6371696,
    comment: "噢印象中能吃",
    info: "26 Lower Portrush Rd, Marden SA 5070。电话 08 8362 7270。",
    hours: {
      mon: "closed", tue: "17:00-20:30", wed: "17:00-20:30", thu: "17:00-20:30",
      fri: "12:00-14:30, 17:00-21:00", sat: "12:00-14:30, 17:00-21:00", sun: "12:00-14:30, 17:00-20:30"
    },
    parking: []
  },

  {
    name: "Madame Wu's Noodle Bar",
    lat: -34.9208683,
    lng: 138.6375506,
    comment: "真的很难吃",
    info: "5/195 The Parade, Norwood SA 5067。电话 08 8431 7188。",
    hours: {
      mon: "17:30-21:00", tue: "17:30-21:00", wed: "17:30-21:00", thu: "17:30-21:00",
      fri: "12:00-14:00, 17:30-22:00", sat: "17:30-22:00", sun: "17:30-21:00"
    },
    parking: []
  },

  {
    name: "Pastagogo Norwood",
    lat: -34.9210905,
    lng: 138.6397855,
    comment: "好吃但是芝士好腻（",
    info: "242 The Parade, Norwood SA 5067。电话 08 8361 2220。",
    hours: {
      mon: "11:30-21:30", tue: "11:30-21:30", wed: "11:30-21:30", thu: "11:30-21:30",
      fri: "11:30-21:30", sat: "11:30-21:30", sun: "11:30-21:30"
    },
    parking: []
  },

  {
    name: "BirdYakitori Bar",
    lat: -34.953069,
    lng: 138.6002,
    comment: "能吃",
    info: "Shop 2, 151/153 King William Rd, Unley SA 5061。电话 0451 837 999。",
    hours: {
      mon: "closed", tue: "12:00-14:30, 17:30-21:00", wed: "17:30-21:00", thu: "12:00-14:30, 17:30-21:00",
      fri: "12:00-15:00, 17:30-22:00", sat: "12:00-15:00, 17:30-22:00", sun: "12:00-15:00, 17:30-21:00"
    },
    parking: []
  },

  {
    name: "Ambra Spirits Distillery Bar & Restaurant",
    lat: -34.9141552,
    lng: 138.5732464,
    comment: "他有车轮芝士意面aaaa而且还是个做酒的aaaaa",
    info: "43 Phillips St, Thebarton SA 5031。电话 08 8354 0611。",
    hours: {
      mon: "closed", tue: "closed", wed: "12:00-22:00", thu: "12:00-22:00",
      fri: "12:00-0:00", sat: "12:00-0:00", sun: "12:00-21:00"
    },
    parking: []
  },

  {
    name: "Vietnam Restaurant",
    lat: -34.8571053,
    lng: 138.5289306,
    comment: "自己包卷的那个好好吃aaaaa",
    info: "73 Addison Rd, Pennington SA 5013。电话 08 8447 3395。",
    hours: {
      mon: "closed", tue: "17:00-21:00", wed: "17:00-21:00", thu: "17:00-21:00",
      fri: "11:00-15:00, 17:00-21:30", sat: "11:00-15:00, 17:00-21:30", sun: "11:00-15:00, 17:00-21:00"
    },
    parking: []
  }

  // 下一家餐厅从这里加，记得上一家后面加逗号。
  // ,{
  //   name: "示例餐厅",
  //   lat: -34.9285, lng: 138.6007,
  //   comment: "……",
  //   info: "……",
  //   hours: { mon: "closed", tue: "11:30-14:00, 17:00-22:00", wed: "11:30-14:00, 17:00-22:00", thu: "11:30-14:00, 17:00-22:00", fri: "11:30-14:00, 17:00-23:00", sat: "17:00-23:00", sun: "17:00-22:00" },
  //   parking: [
  //     { type: "point",  name: "Wilson 停车场", lat: -34.9280, lng: 138.6010, note: "周末 $10 封顶" },
  //     { type: "street", name: "Rundle St 路边位", coords: [[-34.9230, 138.6085], [-34.9225, 138.6130]], note: "晚上 6 点后免费" }
  //   ]
  // }
];
