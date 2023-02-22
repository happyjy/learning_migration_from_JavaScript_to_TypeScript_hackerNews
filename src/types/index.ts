// // # point3 - TS - type alias
//  type Store = {
//   currentPage: number;
//   feeds: NewsList[];
// };

import View from "../core/view";

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
export interface Store {
  currentPage: number;
  feeds: NewsFeed[];
}

// # point7 - TS - interface, type alias
export interface News {
  readonly id: number;
  readonly time_ago: string;
  readonly title: string;
  readonly url: string;
  readonly user: string;
  readonly content: string;
}

export interface NewsFeed extends News {
  readonly comments_count: number;
  readonly points: number;
  read?: boolean;
}

export interface NewsDetail extends News {
  readonly comments: NewsComment[];
}

export interface NewsComment extends News {
  readonly comments: NewsComment[];
  readonly level: number;
}

export interface RouteInfo {
  path: string;
  page: View;
}
