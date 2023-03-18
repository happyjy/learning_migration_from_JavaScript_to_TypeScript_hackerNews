import { RouteInfo } from "../types";
import View from "./view";

export default class Router {
  private isStart: boolean;
  defaultRoute: RouteInfo | null;
  routeTable: RouteInfo[];

  constructor() {
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

    if (!this.isStart) {
      this.isStart = true;
      // Execute next tick
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
