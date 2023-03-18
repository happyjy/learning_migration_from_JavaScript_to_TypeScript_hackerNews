import { NewsDetail, NewsFeed } from "../types";

// # point12 - TS - 상속을 활용한 getData function을 클래스로 변환
export class Api {
  url: string;
  xhr: XMLHttpRequest;

  constructor(url: string) {
    this.url = url;
    this.xhr = new XMLHttpRequest();
  }

  getRequestWithXHR<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    // ## point19-1 XMLHttpRequest.open() 옵션
    this.xhr.open("GET", this.url, false);
    this.xhr.open("GET", this.url);
    this.xhr.addEventListener("load", () => {
      //debugger;
      cb(JSON.parse(this.xhr.response) as AjaxResponse);
    });

    this.xhr.send();
  }

  getRequestWithPromise<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    fetch(this.url)
      .then((response) => {
        //debugger;
        // return을 해야! -> 다음 then으로 return 값이 전달
        const resposneJson = response.json();
        console.log({ "resposneJson: ": resposneJson });
        return resposneJson;
      })
      .then(cb)
      .catch(() => {
        console.error("데이타를 불러오지 못했습니다.");
      });
  }

  protected setUrl(url: string) {
    this.url = url;
  }
}
export class NewsFeedApi extends Api {
  constructor(url: string) {
    super(url);
  }

  getDataWithXHR(cb: (data: NewsFeed[]) => void): void {
    return this.getRequestWithXHR<NewsFeed[]>(cb);
  }

  getDataWithPromise(cb: (data: NewsFeed[]) => void): void {
    return this.getRequestWithPromise<NewsFeed[]>(cb);
  }
}

export class NewsDetailApi extends Api {
  constructor(url: string) {
    super(url);
  }

  getDataWithXHR(cb: (data: NewsDetail) => void): void {
    return this.getRequestWithXHR<NewsDetail>(cb);
  }

  getDataWithPromise(cb: (data: NewsDetail) => void): void {
    return this.getRequestWithPromise<NewsDetail>(cb);
  }
}
