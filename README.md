# :dart: 목적지 룰렛
<img src="https://user-images.githubusercontent.com/71337000/126460249-db7f2e9f-be64-4bb0-8208-ea9fe7137518.gif">  

> 친구들과 여행 계획을 세우는 과정 중, 각자의 상황을 고려하다 보니 목적지를 정하는 것이 가장 큰 골칫덩이였습니다. 차라리 다른 누군가가 정해주는 게 서로의 건강에 이로울 거라 생각했고 여기에서 아이디어를 얻게 되었습니다.

## :mag: 사용 방법
:bulb: __Tab 키와 같은 방향키로도 조작 가능합니다.__

1. __[:link: 목적지 룰렛 깃허브 페이지 열기](https://ryujoonsik.github.io/Portfolio01/ "목적지 룰렛")__
2. ':heavy_plus_sign:' 버튼을 클릭하여 지역설정 대화상자를 열어줍니다.
3. 상위 행정구역 토글 버튼을 클릭하여 하위 행정구역 리스트를 펼치거나 접을 수 있습니다.
4. 하위 행정구역 토글 버튼을 클릭하여 룰렛에 추가하거나 삭제 할 수 있습니다.
5. '확인' 버튼 혹은 흰색 배경을 클릭하여 대화상자를 닫아 줍니다.
6. 'SATRT' 버튼을 클릭하면 룰렛 회전이 시작되고, 룰렛이 정지하면 결과 알림상자와 함께 결과가 출력됩니다.

## :exclamation: 주의 사항
+ 룰렛이 비어 있는 상태에서 'START' 버튼을 클릭하면 '룰렛 설정 필수' 알림 대화상자가 열립니다.
+ 룰렛이 회전 하는 동안 'START' 버튼 혹은 ':heavy_plus_sign:' 버튼 클릭 시 '회전 중...' 알림 대화상자가 열립니다.

## :seedling: 설치
:bulb: __설치 후에는 오프라인 상태에서도 사용 가능합니다.__

환경|브라우저|운영체제|방법
:---:|:---:|:---:|:---:
:iphone:|사파리|IOS|공유(브라우저 하단 3번째 버튼) -> 홈 화면에 추가
:iphone:|크롬|안드로이드|메뉴 -> 앱 설치
:iphone:|삼성 인터넷|안드로이드|주소 창 '설치' 버튼 클릭
:computer:|MS 엣지|윈도우 10|주소 창 '설치' 버튼 클릭
:computer:|크롬|윈도우 10|메뉴 -> 도구 더보기 -> 바로가기 만들기 (창으로 열기 체크 후 만들기 클릭)
:computer:|네이버 웨일|윈도우 10|메뉴 -> My Roulette 설치

## :file_folder: 디렉터리 구조  
```  
.  
├── ...   
├── public  
│   ├── index.html  
│   ├── main.js                     # 웹팩을 통해 index.js 의 관련 모듈들을 통합한 파일 입니다.  
│   ├── server.js                   # node.js 서버 파일 입니다.  
├── src            
│   ├── assets
│   │   ├── icon                    # 파비콘, 모바일 화면에서 보이는 앱 아이콘 파일을 포함하고 있습니다.
│   │   ├── json                    # 대한민국 행정구역 json 파일을 포함하고 있습니다.  
│   ├── css  
│   │   ├── reset.css               # 모바일, 데스크탑 환경에서 사용되는 태그 요소들의 기본 스타일을 초기화합니다.  
│   │   ├── style.css               # 반응형에 맞추어 실제 브라우저 환경에서 적용될 스타일이 작성되어 있습니다.
│   ├── js
│   │   ├── canvas.js               # 룰렛과 관련된 프로퍼티, 메서드가 정의되어 있습니다.
│   │   ├── data-type-checker.js    # 함수 호출 시 인자의 데이터 타입을 검증하기 위한 메서드들이 정의되어 있습니다. 
│   │   ├── dialog.js               # 대화상자와 관련된 프로퍼티, 메서드가 정의되어 있습니다.  
│   │   ├── index.js                # 서비스 워커 등록과 DOM 엘리먼트 노드들의 이벤트 처리가 정의되어 있습니다.  
├── serviceWorker.js                # 서비스 워커의 이벤트들이 정의되어 있습니다.
├── package.json                    # 프로젝트에 설치된 패키지들의 정보를 담고있습니다.  
├── manifest.json                   # 앱 설치 시 필요한 정보들이 작성되어 있습니다.
└──...
```  

# :globe_with_meridians: 개발 환경  
__HTML__, __CSS__, __ES5__ 로 개발한 뒤 , __ES6__ 로 코드를 수정하고 __Babel__ 을 통해 코드를 변환시켜 주었습니다. 그 후 **PWA** 의 기능들을 추가하고 **Webpack** 을 통해 파일을 통합시켜 준 뒤, **라즈베리 파이**와 **Node.js** 로 최종 결과물을 확인 해 보았습니다.

## :speech_balloon: 언어  
**[NHN 코딩 컨벤션](http://www.tutor4u.co.kr/data/member/test16.pdf "스타일 가이드1")**, **[TOAST UI HTML/CSS/Sass 스타일 가이드](https://ui.toast.com/fe-guide/ko_HTMLCSS "스타일 가이드2")**, **[TOAST UI JS 코딩 컨벤션](https://ui.toast.com/fe-guide/ko_CODING-CONVENTION "스타일 가이드3")** 을 참고하여 작성하였습니다.  

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white" width="300" height="100"/>  

+ **IE11** 에서도 지원하는 태그로 작성하였습니다.
+ **시멘틱 태그**를 사용하였습니다.
+ **SEO 관련 태그**를 사용하였습니다.
+ **[HTML Validation Service](https://validator.w3.org/ "HTML 검사")** 로 코드를 검사하였습니다.
+ **[WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/ "접근성 검사")** 로 접근성을 검사하였습니다.
+ **'+'** 버튼 아이콘과 canvas 태그 미지원 시 **대체 텍스트**를 제공하도록 하였습니다.

<img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS3&logoColor=white" width="300" height="100"/>  

+ **IE11** 에서도 지원하는 속성으로 작성하였습니다.
+ **BEM 방법론**을 사용하였습니다.
+ **[CSS Validation Service](https://jigsaw.w3.org/css-validator/ "CSS 검사")** 와 **[CSS Lint](http://csslint.net/ "CSS Lint")** 로 코드를 검사하였습니다.
+ **[reset.css](https://meyerweb.com/eric/tools/css/reset/ "reset.css")** 에서 실제 사용된 태그들의 스타일 초기화 코드만 남겨두었습니다.
+ 아이폰8과 갤럭시 탭 A 10.1에 실제로 접속해보며 **반응형** 코드를 작성하였습니다.

<img src="https://img.shields.io/badge/JS-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white" width="300" height="100"/>  

+ **ES5** 로 처음 기획한 기능들을 작성하고, 추후 편의성과 생산성을 위해 **ES6**로 코드를 수정하며 진행하였습니다.
+ **ES6** 코드는 **Babel** 을 통해 변환시켜 주었습니다.
+ **fetch** 함수는 기존 **ES5** 과 함께 작성했던 **XMLHttpRequest** 를 사용한 함수로 로 폴리필을 적용시켜주었습니다.
+ 룰렛은 텍스트 컬러(#fff)와 **명도 대비 4.5** 이상인 색상들로만 이루어져있습니다.
+ **Pixel ratio** 와 **반응형**에 맞추어 룰렛이 그려지도록 하였습니다.
+ 함수 인자들의 **데이터 타입을 확인**하는 메서드를 갖고있는 객체를 정의하여 진행하였습니다.
+ 

## :earth_asia: 브라우저
> <img src="https://icons.iconarchive.com/icons/google/chrome/64/Google-Chrome-icon.png"/>  

> <img src="https://img.icons8.com/color/64/000000/ms-edge-new.png"/>

> <img src="https://img.shields.io/badge/Microsoft Edge-0078D7?style=flat-square&logo=MicrosoftEdge&logoColor=white" width="200" height="50"/>
