# 기억에 남는 배운점

- template concept

  - js에서 mark up을 쉽게 하기 위한 방법 소개

- 대댓글 기능
  - 재귀호출, 재귀호출로 넘기는 param을 통해 대댓글의 indent를 설정하는 점

# point - 비동기 처리

- XMLHttpRequest객체의 open 함수 세번째 param은 뭔가?
  - 3번째 param -> 네트워크 동기적으로 처리
  - XMLHttpRequest 처리를 동기적으로 처리해준다.
  - default는 비동기 처리이다.
- 3번째 param을 false로 하지 않으면?(비동기 처리하면?)
  - JSON.parse(ajax.response); 부분에 response 값이 없다.

# point1 - Template literals

- ui를 직접 만드는 코드를 계속 전개 한다면?
  - 시스템이 커질 수록 관리하기 어렵다
  - 그래서 FE lib에서 이 문제를 해결하려고 여려가지 시도들이 있다.
- 여기에서는 FE lib를 사용하지 않는데?
  - document.CreateElement('');를 사용하지 않는다.
  - <u>Template literals (``)을 사용해서 간소화</u>
  - 양은 늘어나도 복잡도, 내용파악하는게 어려움이 생기지 않는다.

# point2 - Template literals

- 중복되는 코드 정리하기
- 리팩토링
  - 외부로 변화가 많이 없어도 내부적으로 많은 변화를 통해서 복잡도를 줄이는 활동도 있다.

# piont3 - 구조 구축

- newList에 배열에 rendering할 dom을 Template literals안에 작성
- document.CreateElement(''); 작성해서 appendChild하는 것보다 구조적으로 간단(= 복잡도 낮아짐)

# point4 - router

- location.hash로 list, detail을 구분

# point5 - pagination

- pagination 추가와, detail 화면에서 목록 돌아가기 했을때 page를 기억하고 있는 부분을 구현

# point6 - template concept

- 양이 늘어나더 라도 복잡도 자체는 늘어나지 않게 하기 위한 방법
- 마치 제품을 만들기 위해서 금형을 만든는 것과 같은 원리

  - 현 프로젝트에서는 "{{\_\_문자_문자\_\_}}" 이런 방법으로 template을 만들었다.

- js에서 mark up 하는 방법

  1. DOM api
  2. 배열에 필요한 dom mark up -> 하나의 문자열로 합치기
  3. 원하는 모양의 ui를 만들수 있는 template 문자열을 작성

- template conept 장점
  - ui가 어떠헥 생겼는지 명확하게 구조를 확실하데 볼수 있다.
  - 어떤 데이터가 들어갈지도 명확하게 볼 수 있다.

# point7 - Tailwind CSS

- get started with cdn
  - https://tailwindcss.com/docs/installation/play-cdn
- tainwind가 규칙을 정하고 일관되게 적용하는 방식을 취하고 있다.
  - 이런 면에서 소프트웨어 공학적으로 많은 접근 방법이기 때문에 문서를 읽어 보면서
  - 이런식의 일관성을 가져가고 전반적으로 이런 것들을 적용하게 돼서 학습 비용을 좀 떨어트리는 방법을 사용하는 구나
- template concept lib 소개
  - https://handlebarsjs.com/

# point8 - font-awesome

- https://cdnjs.com/libraries/font-awesome
- cdnjs
  - 각종 lib를 제공하는 사이트

# point9 - 댓글

## point9-1 대댓글(재귀호출, 재귀호출로 넘기는 param-called)

- 재귀호출
- 재귀호출로 넘기는 param-called
  - 이 방법으로 padding-left style을 통해 화면에서 indent를 주고 있다.

# point10 - 규모 & 복잡도

- 규모가 커지더라도 복잡도가 복잡해지지 않도록 하는 코드 구조를 찾는게 중요하다
  - 시니어의 조건중 하나이지 않을까 생각해본다.
  - 그래서 design pattern이 중요하다고 생각하고
  - command pattern, proxy pattern, facade pattern을 사용해본 경험이 중요하다고 생각한다.
  - best practice를 계속 할려고 하자.
- 왜 복잡도가 높아지는 걸 막아야 할까?
  - 변경하는 걸 쉬벡 변경할 수 있도록 하기 위해서다.
  - 당연히 복잡한걸 고치는 것보다 쉬운걸 고치는게 더 쉽다.
- 프로그래밍을 배운다는 것은?
  - 어떻게 하면 복잡도를 높이지 않고
  - 큐모를 키울 수 있을까라고 하는 부분들이 큰 연구 주제중에 하나이다.

# 미구현 부분

- read 구분이 page에 관계없이 구분이 되지 않는다.

# point - TS - porting(js -> ts)

- js로 만든 해커뉴스 앱을 "HackerNews_JavaScript_version" 이 브렌치에 작업 했고
- 이 것을 TS로 porting 하는 작업을 한다.

# point1 - TS - tsconfig.json

- tsconfig.json

  - https://www.typescriptlang.org/ko/docs/handbook/tsconfig-json.html

- 설정 설명
  - noImplicitAny: any라고 되어 있는 부분을 빨간색 밑줄로 표기하면서 타이핑을 명확하게 하라고 명시하는 기능
- target, module: ts파일을 js로 변환할때 어떤 문법 체계를 사용할지 설정
- sourceMap
  - 개발환경과 실행환경을 같게 하는 것
  - 브라우저에서 에러가났을떼 개발자 도구에서 보여주는 코드를 TS파일로 보여주기 위해서 설정(추가적으로 더 설명하자면 TS파일을 js파일로 트렌스파일하고 브라우저에서 js파일을 돌리는데 코드는 우리가 작성한 TS을 보면서 디버깅 하기 쉽게 기능을 주어주기 위해서다.)

# point2 - TS - vscode에서 기본으로 제공하는 TS definition을 확인해서 TS작성

# point3 - TS - type alias

```TS
  type Store = {
    currentPage: number;
    feeds: NewsFeed[];
  };

  type NewsFeed = {
    id: number;
    comments_count: number;
    url: string;
    user: string;
    time_ago: string;
    points: number;
    title: string;
    read?: boolean;
  };
```

# point4 - TS - 타입 추론

- 타입을 작성하지 않아도 에러가 나지 않는 부분
- 아래 feed는 store의 feeds의 타입을 추론한 것이다.

```TS
  for (let feed of store.feeds)
```

# point5 - TS - 타입 가드

- null이 생기는 타입에 대해서 null을 체크 해야 하는 유형의 코드

```TS
// as-is를 보면 container가 null인 경우도 있기 때문에 to-be로 타입가드를 적용해서 코드를 작성해줬다.

// # as-is
container.innerHTML = template;


// # to-be
if (container != null) {
  container.innerHTML = template;
}
```
