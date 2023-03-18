import { NEWS_URL, CONTENT_URL } from "../config";
import { NewsFeed, NewsDetail } from "../types";

export default class Api {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  /**
   * async를 function앞에 붙이면 ?
   *  - 비동기 함수가 된다.
   *  - async를 붙인 함수는 Promise를 return
   *    - 그래서 return 타입은 "Promise<AjaxResponse>"
   */
  // # point20 - async, await를 활용한 콜백 함수 없는 비동기 코드 작성
  async request<AjaxResponse>(): Promise<AjaxResponse> {
    console.log("🅐🅟🅘 step 3 > api.ts > Class Api > this.url: ", this.url);
    const resultFetch = await fetch(this.url);
    console.log(
      "🅐🅟🅘 step 3-1 > api.ts > Class Api > resultFetch: ",
      resultFetch
    );
    const response = resultFetch;
    // const response = await fetch(this.url);
    const responseJson = await response.json();
    console.log(
      "🅐🅟🅘 step 3-2 > api.ts > Class Api > responseJson: ",
      responseJson
    );
    return responseJson as AjaxResponse;
  }
}

export class NewsFeedApi extends Api {
  constructor() {
    super(NEWS_URL);
  }

  // # point20 - async, await를 활용한 콜백 함수 없는 비동기 코드 작성
  async getData(): Promise<NewsFeed[]> {
    console.log("🅐🅟🅘 step 2 > NewsFeedApi > async getData");
    return this.request<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  constructor(id: string) {
    super(CONTENT_URL.replace("@id", id));
  }

  // # point20 - async, await를 활용한 콜백 함수 없는 비동기 코드 작성
  async getData(): Promise<NewsDetail> {
    console.log("🅐🅟🅘 step 2 > NewsDetailApi > async getData");
    return this.request<NewsDetail>();
  }
}
