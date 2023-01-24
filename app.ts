const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/@page.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store = {
  currentPage: 1,
  feeds: [],
};

console.log("ts start");

init();
newsList();
window.addEventListener("hashchange", router);

function newsList() {
  let newsFeed = store.feeds;
  let template = `
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

  // newsFeed = store.feeds = makeList(getData(NEWS_URL.replace("@page", page)));
  // # piont3 - 구조 구축
  const newsList = [];
  for (let news of newsFeed) {
    newsList.push(`
      <div class="p-6 ${
        news.read ? "bg-red-500" : "bg-white"
      } mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
        <div class="flex">
          <div class="flex-auto">
            <a href="#/show/${news.id}">${news.title}</a>  
          </div>
          <div class="text-center text-sm">
            <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${
              news.comments_count
            }</div>
          </div>
        </div>
        <div class="flex mt-3">
          <div class="grid grid-cols-3 text-sm text-gray-500">
            <div><i class="fas fa-user mr-1"></i>${news.user}</div>
            <div><i class="fas fa-heart mr-1"></i>${news.points}</div>
            <div><i class="far fa-clock mr-1"></i>${news.time_ago}</div>
          </div>  
        </div>
      </div>    
    `);
  }

  template = template.replace("{{__news_feed__}}", newsList.join(""));
  template = template.replace("{{__current_page__}}", store.currentPage);
  template = template.replace(
    "{{__prev_page__}}",
    store.currentPage > 1 ? store.currentPage - 1 : 1
  );
  template = template.replace("{{__next_page__}}", store.currentPage + 1);

  container.innerHTML = template;
}

function newsDetail() {
  const id = getId();

  // # point1 - Template literals
  const newsContent = getData(CONTENT_URL.replace("@id", id));

  let template = `
  <div class="bg-gray-600 min-h-screen pb-8">
    <div class="bg-white text-xl">
      <div class="mx-auto px-4">
        <div class="flex justify-between items-center py-6">
          <div class="flex justify-start">
            <h1 class="font-extrabold">Hacker News</h1>
          </div>
          <div class="items-center justify-end">
            <a href="#/page/${store.currentPage}" class="text-gray-500">
              <i class="fa fa-times"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="h-full border rounded-xl bg-white m-6 p-4 ">
      <h2>${newsContent.title}</h2>
      <div class="text-gray-400 h-20">
        ${newsContent.content}
      </div>

      {{__comments__}}

    </div>
  </div>
`;

  for (let feed of store.feeds) {
    if (feed.id === Number(id)) {
      feed.read = true;
      break;
    }
  }

  function makeComment(comments, called = 0) {
    const commentString = [];

    for (let comment of comments) {
      // # point9 댓글
      commentString.push(`
      <div style="padding-left: ${called * 40}px;" class="mt-4">
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
        commentString.push(makeComment(comment.comments, called + 1));
      }
    }

    return commentString.join("");
  }

  container.innerHTML = template.replace(
    "{{__comments__}}",
    makeComment(newsContent.comments)
  );
}

/**
 * common function list
 *  - newsList, newsDetail, hashchange eventListener에서 사용되는 function
 */
function init() {
  store.currentPage = getId() || 1;
  getNewsList();
}

function getNewsList() {
  if (store.currentPage === getId() && store.feeds.length !== 0) {
    return;
  }
  store.currentPage = getId();
  store.feeds = makeList(getData(NEWS_URL.replace("@page", store.currentPage)));
}

function makeList(feeds) {
  return feeds.map((feed) => ((feed.read = false), feed));
}
// # point4 - router
function router() {
  const routePath = location.hash;

  if (routePath === "") {
    newsList();
  } else if (routePath.indexOf("#/page/") >= 0) {
    getNewsList();
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

function getId() {
  return Number(location.hash.substring(7)) || 1;
}
