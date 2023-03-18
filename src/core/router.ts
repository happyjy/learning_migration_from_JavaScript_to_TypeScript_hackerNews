import { RouteInfo } from "../types";
import View from "./view";

export default class Router {
  private isStart: boolean;
  defaultRoute: RouteInfo | null;
  routeTable: RouteInfo[];

  constructor() {
    // event type 'hashchange'는 url 주소가 변경되면 동작한다.
    console.log("### router.ts > constructor > setting hashchange");
    //# point15 - TS - this.route.bind(this)
    window.addEventListener("hashchange", this.route.bind(this));

    this.isStart = false;
    this.routeTable = [];
    this.defaultRoute = null;
  }

  setDefaultPage(page: View, params: RegExp | null = null): void {
    this.defaultRoute = {
      path: "",
      page,
      params,
    };
  }

  addRoutePath(path: string, page: View, params: RegExp | null = null): void {
    this.routeTable.push({ path, page, params });

    console.log(
      "### router.ts > addRoutePath fn > { path, page, params, this.isStart}: ",
      {
        path,
        page,
        params,
        "this.isStart": this.isStart,
      }
    );

    if (!this.isStart) {
      this.isStart = true;

      // Execute next tick
      /**
       * 앱이 초기에 전체 다 설정된 이후 route가 동작해야 하기 때문에 event loop개념을 활용해 실행 컨텍스트의 제일 마지막으로 미루는 과정
       * 그래서 app.ts에서 init 과정이 다끝난 이후 'this.route.bind(this)'가 동작한다.
       */
      setTimeout(this.route.bind(this), 0);
    }
  }

  private route() {
    console.log("### router.ts > route fn > location, routerTable: ", {
      location,
      routerTable: this.routeTable,
    });
    const routePath: string = location.hash;

    if (routePath === "" && this.defaultRoute) {
      this.defaultRoute.page.render();
      return;
    }

    for (const routeInfo of this.routeTable) {
      console.log("routeInfo.params: ", routeInfo.params);
      if (routePath.indexOf(routeInfo.path) >= 0) {
        if (routeInfo.params) {
          const parseParams = routePath.match(routeInfo.params);

          if (parseParams) {
            routeInfo.page.render.apply(null, [parseParams[1]]);
          }
        } else {
          // point14 - TS - 추상 메소드
          routeInfo.page.render();
        }
        return;
      }
    }
  }
}
