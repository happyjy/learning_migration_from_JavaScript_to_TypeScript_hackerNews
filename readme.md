# point

- XMLHttpRequest객체의 open 함수 세번째 param은 뭔가?
  - XMLHttpRequest 처리를 동기적으로 처리해준다.
  - default는 비동기 처리이다.
- 3번째 param을 false로 하지 않으면?(비동기 처리하면?)
  - JSON.parse(ajax.response); 부분에 response 값이 없다.

# point1

- ui를 직접 만드는 코드를 계속 전개 한다면?
  - 시스템이 커질 수록 관리하기 어렵다
  - 그래서 FE lib에서 이 문제를 해결하려고 여려가지 시도들이 있다.
- 여기에서는 FE lib를 사용하지 않는데?
  - document.CreateElement('');를 사용하지 않는다.
  - <u>Template literals (``)을 사용해서 간소화</u>
  - 양은 늘어나도 복잡도, 내용파악하는게 어려움이 생기지 않는다.

# point2

- 중복되는 코드 정리하기
- 리팩토링
  - 외부로 변화가 많이 없어도 내부적으로 많은 변화를 통해서 복잡도를 줄이는 활동도 있다.
