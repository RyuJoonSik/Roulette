# :dart: 목적지 룰렛
<img src="https://user-images.githubusercontent.com/71337000/126460249-db7f2e9f-be64-4bb0-8208-ea9fe7137518.gif">  

> 친구들과 여행 계획을 세우는 과정 중, 각자의 상황을 고려하다 보니 목적지를 정하는 것이 가장 큰 골칫덩이였습니다. 차라리 누군가가 정해주는 게 서로의 건강에 이로울 거라 생각했고 여기에서 아이디어를 얻게 되었습니다.

## :mag: 사용 방법
:bulb: __방향키로도 조작 가능합니다.(다음 : Tab, 이전 : Shft + Tab, 클릭 : Enter 혹은 Space)__

:one: __[목적지 룰렛 깃허브 페이지 열기](https://ryujoonsik.github.io/Portfolio01/ "목적지 룰렛")__  
:two: ':heavy_plus_sign:' 버튼을 클릭하여 지역설정 대화상자를 열어줍니다.  
:three: 상위 행정구역 토글 버튼을 클릭하여 하위 행정구역 리스트를 펼치거나 접을 수 있습니다.  
:four: 하위 행정구역 토글 버튼을 클릭하여 룰렛에 추가하거나 삭제 할 수 있습니다.  
:five: **'확인'** 버튼 혹은 흰색 배경을 클릭하여 대화상자를 닫아 줍니다.  
:six: **'SATRT'** 버튼을 클릭하면 룰렛 회전이 시작되고, 룰렛이 정지하면 결과 알림상자와 함께 결과가 출력됩니다.  

## :exclamation: 주의 사항
+ 룰렛이 비어 있는 상태에서 **'START'** 버튼을 클릭하면 **'룰렛 설정 필수'** 알림 대화상자가 열립니다.
+ 룰렛이 회전 하는 동안 **'START'** 버튼 혹은 ':heavy_plus_sign:' 버튼 클릭 시 **'회전 중...'** 알림 대화상자가 열립니다.  

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

# :globe_with_meridians: 개발  
웹 표준을 최대한 준수하며 IE11 환경에서도 동일한 모습의 컨텐츠를 제공 할 수 있도록 개발 방향을 정하였습니다.  
__HTML__, __CSS__, __ES5__ 로 개발한 뒤 , __ES6__ 로 코드를 수정하고 __Babel__ 을 통해 코드를 변환시켜 주었습니다. 그 후 **PWA** 의 기능들을 추가하고 **Webpack** 을 통해 파일을 통합시켜 준 뒤, **라즈베리 파이**와 **Node.js** 서버로 최종 결과물을 확인 해 보았습니다.

## :speech_balloon: 언어  
**[NHN 코딩 컨벤션](http://www.tutor4u.co.kr/data/member/test16.pdf "스타일 가이드1")**, **[TOAST UI HTML/CSS/Sass 스타일 가이드](https://ui.toast.com/fe-guide/ko_HTMLCSS "스타일 가이드2")**, **[TOAST UI JS 코딩 컨벤션](https://ui.toast.com/fe-guide/ko_CODING-CONVENTION "스타일 가이드3")** 을 참고하여 작성하였습니다.  

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white" width="300" height="100"/>  

+ **IE11** 에서도 지원하는 태그로 작성하였습니다.
+ **시멘틱 태그**를 사용하였습니다.
+ **SEO 관련 태그**를 사용하였습니다.
+ **[HTML Validation Service](https://validator.w3.org/ "HTML 검사")** 로 코드를 검사하였습니다.
+ **[WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/ "접근성 검사")** 로 접근성을 검사하였습니다.
+ **'+'** 버튼 아이콘과 canvas 태그 미지원 시 **대체 텍스트**를 제공하도록 하였습니다.
+ tabindex 속성을 추가함으로써, focus 이벤트에 맞추어 스크린 리더가 필요한 정보를 읽을 수 있도록 하였습니다.

<img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS3&logoColor=white" width="300" height="100"/>  

+ **IE11** 에서도 지원하는 속성으로 작성하였습니다.
+ **BEM 방법론**을 사용하였습니다.
+ **[CSS Validation Service](https://jigsaw.w3.org/css-validator/ "CSS 검사")** 와 **[CSS Lint](http://csslint.net/ "CSS Lint")** 로 코드를 검사하였습니다.
+ **[reset.css](https://meyerweb.com/eric/tools/css/reset/ "reset.css")** 에서 실제 사용된 태그들의 스타일 초기화 코드만 남겨두었습니다.
+ 아이폰8과 갤럭시 탭 A 10.1에 실제로 접속해보며 **반응형** 코드를 작성하였습니다.

<img src="https://img.shields.io/badge/JS-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white" width="300" height="100"/>  

+ **ES5** 로 처음 생각한 기능들을 작성하고, 추후 편의성과 생산성을 위해 **ES6**로 코드를 수정하며 진행하였습니다.
+ **ES6** 코드는 **Babel** 을 통해 변환시켜 주었습니다.
+ **fetch** 함수는 기존 **ES5** 과 함께 작성했던 **XMLHttpRequest** 를 사용한 함수로 폴리필을 적용시켜주었습니다.
+ 룰렛은 텍스트 컬러(#fff)와 **명도 대비 4.5** 이상인 색상들로만 이루어져있습니다.
+ **Pixel ratio** 와 **반응형**에 맞추어 룰렛이 그려지도록 하였습니다.
+ 함수 인자들의 **데이터 타입을 확인**하는 메서드를 갖고있는 객체를 정의하여 진행하였습니다.
+ 대화상자는 **재사용**이 가능하고, 모달 상태를 설정할 수 있도록 구현하였습니다.
+ **이벤트 버블링**을 통해 행정구역 버튼 이벤트를 제어하였습니다.
+ **크롬 개발자 도구**를 통해 사용되지 않는 코드를 확인하고 수정하였습니다.

## :earth_asia: 브라우저
:bulb: __데스크탑 네이버 웨일, 모바일 사파리, 삼성 인터넷, 리눅스 크로미움에서도 사용가능합니다.__  
브라우저|버전|데스크탑|모바일
:---:|:---:|:---:|:---:
<img src="https://icons.iconarchive.com/icons/google/chrome/64/Google-Chrome-icon.png"/>|Latest|:white_check_mark:|:white_check_mark:
<img src="https://img.icons8.com/color/64/000000/ms-edge-new.png"/>|Latest|:white_check_mark:|
|<img src="https://icons.iconarchive.com/icons/tatice/cristal-intense/64/Internet-Explorer-icon.png"/>|11|:white_check_mark:|

## :package: 도구
:bulb: __ESLint와 Prettier는 VSC 익스텐션과 함께 사용하였습니다.__  
도구|목적
:---:|:---:
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white" width="160" height="50"/>|**코드 분석**을 통해 실수를 줄여 주기위해 사용하였습니다.
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white" width="160" height="50"/>|**일관된 스타일**을 적용시키기 위해 사용하였습니다.
<img src="https://img.shields.io/badge/Babel-F9DC3E?style=flat-square&logo=Babel&logoColor=white" width="160" height="50"/>|ES6 코드를 **ES5 코드로 변환**시켜 주기 위해 사용하였습니다.
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white" width="160" height="50"/>| **분산된 파일을 통합**시켜 주기 위해 사용하였습니다.

# :sunglasses: 문제
이해가 되지 않는 코드들:droplet:  
:arrow_right: 참고한 코드 대부분은 하드코딩을 통해 하나씩 그려보며 진행하였습니다. 등분된 원을 그리는 경우에는 호를 하나씩 그려보며 이해하였습니다.
+ requestAnimationFrame에 this.메서드를 인자로 넘겨주고 재귀호출 할 경우 실행이 멈추었습니다. 콘솔창을 통해 확인 해 보니 두 번째 requestAnimationFrame 호출 this가 window를 가리키는 것을 알게되었고 bind로 객체를 묶어주어 문제를 해결하였습니다. 
+ :focus 의사 클래스에 outline 스타일을 정의 할 경우, Tab키 뿐만 아니라 클릭 이벤트에도 스타일이 적용되었습니다. IE11는 :focus-visible 를 지원하지 않기 때문에 다른 방법을 사용하였습니다. body영역에 mousedown과 keydown 이벤트를 주고 
