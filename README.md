# 식스샵 프론트개발자 채용 과제

- [과제 안내 링크](https://www.notion.so/sixshop/af7f8a9586b648e6ba92a8c24ff0ef66)
- 과제 제출 기한은 과제 메일 발송일로부터 7일 후 자정 12시까지 입니다. 기한을 꼭 지켜주세요.

# MSW 서버사이드에서 사용 안됨
SSR및 ISR을 사용하는 페이지의 경우, 서버 사이드에서 MSW를 사용하기 위해서 MSW에 추가 설정이 필요해 보입니다.
추가 설정을 개인적으로 진행하진 않았고 기본 값을 prop으로 반환해주는 방식을 선택하였습니다.

# Error 처리
Error Boundary 컴포넌트를 사용하여 에러를 캐치하는 방식을 선택했습니다.

# 전역상태관리 라이브러리
평소 Redux를 대부분 사용하였기에 Redux에 친숙하지만 Redux의 반복적인 코드의 사용을 피하고 싶었고
새로운 라이브러리를 사용해 보기 위해 recoil을 선택하였습니다.

# Header 공통 컴포넌트로 분리
모든 페이지에 header가 존재하는 것에 대한 의문이 들어 컴포넌트로 분리하여 App 컴포넌트에 적용하였습니다.

# 인피니티 스크롤
스크롤 이벤트핸들러를 사용하는 것보다 엘레멘트의 뷰포트가 교차되는 부분을 비동기적으로 관찰하는 IntersectionObserver API를 사용하여 효율적으로 무한 스크롤을 구현하였습니다.

또한 상세 페이지 이동시에만 해당 스크롤의 정보를 전역 상태에 저장 하였습니다.

