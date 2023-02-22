import { NEWS_URL } from "../config";
import { NewsFeedApi } from "../core/api";
import View from "../core/view";
import { NewsFeed } from "../types";

export default class NewsFeedView extends View {
  private api: NewsFeedApi;
  private newsFeed: NewsFeed[];

  constructor(containerId: string) {
    // 상위 클래스를 상속 받으면 상위 클래스의 constructor를 호출 해줘야 한다. (= super 키워드 호출)
    const template = `
      <div class="bg-gray-600 min-h-screen">
        <div class="bg-white text-xl">
          <div class="mx-auto px-4">
            <div class="flex justify-between items-center py-6">
              <div class="flex justify-start">
                <h1 class="font-extrabold">Hacker News</h1>
                <h2 style="padding-left:30px"> current page: {{__current_page__}}<h2>
              </div>
              <div class="items-center justify-end">
                <a href="#/page/{{__prev_page__}}" class="text-gray-500">
                  Previous
                </a>
                <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
                  Next
                </a>
              </div>
            </div> 
          </div>
        </div>
        <div class="p-4 text-2xl text-gray-700">
          {{__news_feed__}}        
        </div>
      </div>
    `;

    super(containerId, template);
    this.api = new NewsFeedApi(
      NEWS_URL.replace("@page", String(window.store.currentPage))
    );
    this.newsFeed = window.store.feeds;

    if (this.newsFeed.length === 0) {
      this.newsFeed = window.store.feeds = this.api.getData();
      this.makeFeeds();
    }
  }

  render(): void {
    window.store.currentPage = Number(location.hash.substring(7) || 1);

    // todo: pagination할때 적당한 위치는 어디인가?
    this.api = new NewsFeedApi(
      NEWS_URL.replace("@page", String(window.store.currentPage))
    );
    this.newsFeed = window.store.feeds = this.api.getData();
    this.makeFeeds();

    for (let newsFeedItem of this.newsFeed) {
      const { read, id, title, comments_count, user, points, time_ago } =
        newsFeedItem;
      this.addHtml(`
        <div class="p-6 ${
          read ? "bg-red-500" : "bg-white"
        } mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
          <div class="flex">
            <div class="flex-auto">
              <a href="#/show/${id}">${title}</a>  
            </div>
            <div class="text-center text-sm">
              <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${comments_count}</div>
            </div>
          </div>
          <div class="flex mt-3">
            <div class="grid grid-cols-3 text-sm text-gray-500">
              <div><i class="fas fa-user mr-1"></i>${user}</div>
              <div><i class="fas fa-heart mr-1"></i>${points}</div>
              <div><i class="far fa-clock mr-1"></i>${time_ago}</div>
            </div>  
          </div>
        </div>    
      `);
    }

    this.setTemplateData("news_feed", this.getHtml());
    this.setTemplateData("current_page", String(window.store.currentPage));
    this.setTemplateData(
      "prev_page",
      String(window.store.currentPage > 1 ? window.store.currentPage - 1 : 1)
    );
    this.setTemplateData("next_page", String(window.store.currentPage + 1));

    this.updateView();

    // this.newsFeed = window.store.feeds = this.api.getData();
    // this.makeFeeds();
  }

  makeFeeds(): void {
    this.newsFeed = this.newsFeed.map((feed) => ((feed.read = false), feed));
  }
}
