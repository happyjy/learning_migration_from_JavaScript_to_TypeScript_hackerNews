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
