"use strict";
// index.ts 파일의 장점
// 다른 파일에 있는 것들을 한데 모아 관리 할 수 있다.
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsFeedView = exports.NewsDetailView = void 0;
var news_detail_view_1 = require("./news-detail-view");
Object.defineProperty(exports, "NewsDetailView", {
  enumerable: true,
  get: function () {
    return news_detail_view_1.default;
  },
});
var news_feed_view_1 = require("./news-feed-view");
Object.defineProperty(exports, "NewsFeedView", {
  enumerable: true,
  get: function () {
    return news_feed_view_1.default;
  },
});
//# sourceMappingURL=index.js.map
