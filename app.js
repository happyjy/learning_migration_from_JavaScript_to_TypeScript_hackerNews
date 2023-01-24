const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/@page.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store = {
  currentPage: 1,
};

newsList();
window.addEventListener("hashchange", router);

function newsList() {
  const page = store.currentPage;
  const newsFeed = getData(NEWS_URL.replace("@page", page));

  if (newsFeed.length === 0) {
    location.href = `#/page/${Number(location.hash.split("/").pop()) - 1}`;
    return;
  }

  let template = `
    <div class="container mx-auto p-4">
      <h1>Hacker News</h1>
      <ul>
        {{__news_feed__}}      
      </ul>
      <div>
        <a href="#/page/{{__prev_page__}}">이전 페이지</a>
        <a href="#/page/{{__next_page__}}">다음 페이지</a>
      </div>
    </div>
  `;
  // # piont3 - 구조 구축
  const newsList = [];
  newsList.push("<ul>");
  for (let news of newsFeed) {
    newsList.push(`
    <li>
      <a href="#/show/${news.id}">
        ${news.title} (${news.comments_count})
      </a>
    </li>
  `);
  }

  template = template.replace("{{__news_feed__}}", newsList.join(""));
  template = template.replace(
    "{{__prev_page__}}",
    store.currentPage > 1 ? store.currentPage - 1 : 1
  );
  template = template.replace("{{__next_page__}}", store.currentPage + 1);

  container.innerHTML = template;
}

function newsDetail() {
  const id = location.hash.substring(7);

  // # point1 - Template literals
  const newsContent = getData(CONTENT_URL.replace("@id", id));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
      <a href="#/page/${store.currentPage}">목록으로</a>
    </div>
  `;
}

// # point4 - router
function router() {
  const routePath = location.hash;

  if (routePath === "") {
    newsList();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substring(7));
    newsList();
  } else {
    newsDetail();
  }
}
// # point2: refactoring
function getData(url) {
  // # point: 비동기 처리
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}
