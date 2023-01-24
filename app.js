const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store = {
  currentPage: 1,
};

newsList();
window.addEventListener("hashchange", router);

function newsList() {
  const newsFeed = getData(NEWS_URL);

  // # piont3 - 구조 구축
  const newsList = [];
  newsList.push("<ul>");
  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
    <li>
      <a href="#/show/${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
    </li>
  `);
  }

  newsList.push("</ul>");
  newsList.push(`<div>
    <a href="#/page/${
      store.currentPage > 1 ? store.currentPage - 1 : 1
    }">이전 페이지</a>
    <a href="#/page/${store.currentPage + 1}">다음 페이지</a>
  </div>`);
  container.innerHTML = newsList.join("");
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
