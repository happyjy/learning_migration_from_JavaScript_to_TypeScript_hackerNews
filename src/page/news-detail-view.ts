import { CONTENT_URL } from "../config";
import { NewsDetailApi } from "../core/api";
import { getId } from "../core/util";
import View from "../core/view";
import { NewsComment, NewsDetail } from "../types";

export default class NewsDetailView extends View {
  constructor(containerId: string) {
    // # point1 - Template literals
    const template = `
    <div class="bg-gray-600 min-h-screen pb-8">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/{{__currentPage__}}" class="text-gray-500">
                <i class="fa fa-times"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
  
      <div class="h-full border rounded-xl bg-white m-6 p-4 ">
        <h2>{{__title__}}</h2>
        <div class="text-gray-400 h-20">
          {{__content__}}
        </div>
        {{__comments__}}
      </div>
    </div>
  `;
    super(containerId, template);
  }

  render() {
    const id = getId();
    const api = new NewsDetailApi(CONTENT_URL.replace("@id", String(id)));
    const newsDetail: NewsDetail = api.getData();

    for (let feed of window.store.feeds) {
      if (feed.id === Number(id)) {
        feed.read = true;
        break;
      }
    }

    this.setTemplateData("currentPage", String(window.store.currentPage));
    this.setTemplateData("title", newsDetail.title);
    this.setTemplateData("content", newsDetail.content);
    this.setTemplateData("comments", this.makeComment(newsDetail.comments));
    this.updateView();
  }

  makeComment(comments: NewsComment[]) {
    for (let comment of comments) {
      // # point9 댓글
      this.addHtml(`
      <div style="padding-left: ${comment.level * 40}px;" class="mt-4">
        <div class="text-gray-400">
          <i class="fa fa-sort-up mr-2"></i>
          <strong>${comment.user}</strong> ${comment.time_ago}
        </div>
        <p class="text-gray-700">${comment.content}</p>
      </div>      
    `);

      // # point9-1 대댓글
      if (comment.comments.length > 0) {
        // # point9-1 대댓글(재귀호출, 재귀호출로 넘기는 param-called)
        this.addHtml(this.makeComment(comment.comments));
      }
    }

    return this.getHtml();
  }
}
