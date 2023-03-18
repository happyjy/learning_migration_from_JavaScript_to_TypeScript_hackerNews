import Router from "./core/router";
import { NewsFeedView, NewsDetailView } from "./page";
import { Store } from "./store";

const store = new Store();

console.log("## step init - start");
const router: Router = new Router();
const newsFeedView = new NewsFeedView("root", store);
const newsDetailView = new NewsDetailView("root", store);

router.setDefaultPage(newsFeedView);

router.addRoutePath("/page/", newsFeedView, /page\/(\d+)/);
router.addRoutePath("/show/", newsDetailView, /show\/(\d+)/);

console.log("## step init - end");
setTimeout(() => {
  console.log("## step init - end > in setTimeout");
});
