// // # point3 - TS - type alias
//  type Store = {
//   currentPage: number;
//   feeds: NewsList[];
// };

// // # point6 - TS - type extends
// type News = {
//   id: number;
//   time_ago: string;
//   title: string;
//   url: string;
//   user: string;
//   content: string;
// };

// type NewsList = News & {
//   comments_count: number;
//   points: number;
//   read?: boolean;
// };

// type NewsDetail = News & {
//   comments: NewsComment[];
// };

// type NewsComment = News & {
//   content: NewsComment[];
//   level: number;
// };

type Ta = {
  n: number;
};

type Tb = {
  nn: number;
};

type Tc = Ta | Tb;
// type Tc = Ta & Tb;

const obj: Tc = {
  n: 1,
  nn: 2,
};

interface Ia {
  n: number;
}
interface Ia {
  nn: number;
}

const obj1: Ia = {
  n: 1,
  nn: 2,
};

// # point7 - TS - interface, type alias
interface Store {
  currentPage: number;
  feeds: NewsFeed[];
}

// # point7 - TS - interface, type alias
interface News {
  readonly id: number;
  readonly time_ago: string;
  readonly title: string;
  readonly url: string;
  readonly user: string;
  readonly content: string;
}

interface NewsFeed extends News {
  readonly comments_count: number;
  readonly points: number;
  read?: boolean;
}

interface NewsDetail extends News {
  readonly comments: NewsComment[];
}

interface NewsComment extends News {
  readonly comments: NewsComment[];
  readonly level: number;
}

interface RouteInfo {
  path: string;
  page: View;
}

// # point2 - TS - vscode에서 기본으로 제공하는 TS definition을 확인해서 TS작성
const container: HTMLElement | null = document.getElementById("root");
const ajax: XMLHttpRequest = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/@page.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store: Store = {
  currentPage: 1,
  feeds: [],
};

// # point12 - TS - 상속을 활용한 getData function을 클래스로 변환
class Api {
  url: string;
  ajax: XMLHttpRequest;

  constructor(url: string) {
    this.url = url;
    this.ajax = new XMLHttpRequest();
  }

  protected getRequest<AjaxResponse>(): AjaxResponse {
    this.ajax.open("GET", this.url, false);
    this.ajax.send();

    return JSON.parse(this.ajax.response);
  }

  protected setUrl(url: string) {
    this.url = url;
  }
}

class NewsFeedApi extends Api {
  getData(): NewsFeed[] {
    return this.getRequest<NewsFeed[]>();
  }
}
class NewsDetailApi extends Api {
  getData(): NewsDetail {
    return this.getRequest<NewsDetail>();
  }
}

abstract class View {
  private template: string;
  private renderTemplate: string;
  private container: HTMLElement;
  private htmlList: string[];

  constructor(containerId: string, template: string) {
    const containerElement = document.getElementById(containerId);

    if (!containerElement) {
      // 프로그램을 종료
      throw "최상위 컨테이너가 없어 UI를 진행하지 못합니다.";
    }

    this.container = containerElement;
    this.template = template;
    this.renderTemplate = template;
    this.htmlList = [];
  }

  protected updateView(): void {
    this.container.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;
  }

  protected addHtml(htmlString: string): void {
    this.htmlList.push(htmlString);
  }

  protected getHtml(): string {
    const snapshot = this.htmlList.join("");
    this.clearHtmlList();
    return snapshot;
  }

  protected setTemplateData(key: string, value: string): void {
    this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
  }

  private clearHtmlList(): void {
    this.htmlList = [];
  }

  abstract render(): void;
}

class Router {
  routeTable: RouteInfo[];
  defaultRoute: RouteInfo | null;

  constructor() {
    //# point15 - TS - this.route.bind(this)
    window.addEventListener("hashchange", this.route.bind(this));

    this.routeTable = [];
    this.defaultRoute = null;
  }

  setDefaultPage(page: View): void {
    this.defaultRoute = { path: "", page };
  }

  addRoutePath(path: string, page: View): void {
    this.routeTable.push({
      path,
      page,
    });
  }

  route() {
    const routePath = location.hash;

    if (routePath === "" && this.defaultRoute) {
      // point14 - TS - 추상 메소드
      this.defaultRoute.page.render();
    }

    for (const routeInfo of this.routeTable) {
      if (routePath.indexOf(routeInfo.path) >= 0) {
        routeInfo.page.render();
        break;
      }
    }
  }
}
class NewsFeedView extends View {
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
      NEWS_URL.replace("@page", String(store.currentPage))
    );
    this.newsFeed = store.feeds;

    if (this.newsFeed.length === 0) {
      this.newsFeed = store.feeds = this.api.getData();
      this.makeFeeds();
    }
  }

  render(): void {
    store.currentPage = Number(location.hash.substring(7) || 1);

    // todo: pagination할때 적당한 위치는 어디인가?
    this.api = new NewsFeedApi(
      NEWS_URL.replace("@page", String(store.currentPage))
    );
    this.newsFeed = store.feeds = this.api.getData();
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
    this.setTemplateData("current_page", String(store.currentPage));
    this.setTemplateData(
      "prev_page",
      String(store.currentPage > 1 ? store.currentPage - 1 : 1)
    );
    this.setTemplateData("next_page", String(store.currentPage + 1));

    this.updateView();

    // this.newsFeed = store.feeds = this.api.getData();
    // this.makeFeeds();
  }

  makeFeeds(): void {
    this.newsFeed = this.newsFeed.map((feed) => ((feed.read = false), feed));
  }
}

class NewsDetailView extends View {
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

    for (let feed of store.feeds) {
      if (feed.id === Number(id)) {
        feed.read = true;
        break;
      }
    }

    this.setTemplateData("currentPage", String(store.currentPage));
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

function getId() {
  return Number(location.hash.substring(7)) || 1;
}

const router: Router = new Router();
const newsFeedView = new NewsFeedView("root");
const newsDetailView = new NewsDetailView("root");

router.setDefaultPage(newsFeedView);

router.addRoutePath("/page/", newsFeedView);
router.addRoutePath("/show/", newsDetailView);

router.route();
