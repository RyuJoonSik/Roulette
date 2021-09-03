# :dart: 목적지 룰렛
<img src="https://user-images.githubusercontent.com/71337000/126460249-db7f2e9f-be64-4bb0-8208-ea9fe7137518.gif">  

> 친구들과 여행 계획을 세우는 중, 각자의 상황을 고려하다 보니 목적지를 정하는 것이 가장 큰 문제였습니다. 차라리 누군가가 정해주는 게 서로의 건강에 이로울 거라 생각했고 여기에서 아이디어를 얻게 되었습니다.

## :earth_asia: 브라우저
브라우저|<img src="https://icons.iconarchive.com/icons/google/chrome/32/Google-Chrome-icon.png"/>|<img src="https://img.icons8.com/color/32/000000/ms-edge-new.png"/>|<img src="https://icons.iconarchive.com/icons/tatice/cristal-intense/32/Internet-Explorer-icon.png"/>|<img src="https://cdn.icon-icons.com/icons2/2108/PNG/48/firefox_icon_130939.png">|<img src="https://cdn.icon-icons.com/icons2/2108/PNG/32/opera_icon_130863.png">|<img src="https://w.namu.la/s/1ecd9d98e849872b3fa5a0f9f3add277d373212aabc10d9ef1e705847324abb342e420df735182b9db9f4ef20e6a0a2dbdd9b5d27c4d61dae4d3cfcd0f21c54628832e200a844de8c01899a6b255b5a9920ba0dcea7d3eae4d886cb68ba2c22d" width="32">|<img src="https://img.icons8.com/color/32/000000/chromium.png">|<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Samsung_Internet_Logo.png/32px-Samsung_Internet_Logo.png">|<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/32px-Safari_browser_logo.svg.png">
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:
운영체제|윈도우 10|윈도우 10|윈도우 10|윈도우 10|윈도우 10|윈도우 10|라즈비안|IOS|안드로이드
버전|Latest|Latest|11|Latest|Latest|Latest|Latest|Latest|Latest
데스크톱|:white_check_mark:|:white_check_mark:|:white_check_mark:|:white_check_mark:|:white_check_mark:|:white_check_mark:|:white_check_mark:
모바일|:white_check_mark:|||||||:white_check_mark:|:white_check_mark:

## :mag: 사용 방법
:bulb: **방향 키로도 조작 가능합니다.(다음 : Tab, 이전 : Shft + Tab, 클릭 : Enter 혹은 Space)**

:one: **[목적지 룰렛 깃허브 페이지 열기](https://ryujoonsik.github.io/Portfolio01/ "목적지 룰렛")**  
:two: ':heavy_plus_sign:' 버튼 클릭.  
:three: **상위 행정구역** 버튼 클릭.  
:four: **하위 행정구역** 버튼을 클릭하여 룰렛에 추가하거나 삭제.  
:five: **'확인'** 버튼 혹은 흰색 배경을 클릭하여 대화상자 닫기.  
:six: **'SATRT'** 버튼을 클릭 시 룰렛 회전 시작.  

## :exclamation: 주의 사항
+ 룰렛이 비어 있는 상태에서 **'START'** 버튼을 클릭하면 **'룰렛 설정 필수'** 알림 대화상자가 열립니다.
+ 룰렛이 회전 하는 동안 **'START'** 버튼 혹은 ':heavy_plus_sign:' 버튼 클릭 시 **'회전 중...'** 알림 대화상자가 열립니다.  

## :seedling: 설치
:bulb: **설치 후에는 오프라인 상태에서도 사용 가능합니다.**

환경|브라우저|운영체제|방법
:---:|:---:|:---:|:---:
:iphone:|<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/64px-Safari_browser_logo.svg.png" width="32">|IOS|공유(브라우저 하단 3번째 버튼) -> '홈 화면에 추가'
:iphone:|<img src="https://icons.iconarchive.com/icons/google/chrome/64/Google-Chrome-icon.png" width="32">|안드로이드|메뉴 -> '앱 설치'
:iphone:|<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Samsung_Internet_Logo.png/64px-Samsung_Internet_Logo.png" width="32">|안드로이드|주소 창 '설치' 버튼 클릭
:computer:|<img src="https://img.icons8.com/color/64/000000/ms-edge-new.png" width="32"/>|윈도우 10|주소 창 '설치' 버튼 클릭
:computer:|<img src="https://icons.iconarchive.com/icons/google/chrome/64/Google-Chrome-icon.png" width="32">|윈도우 10|메뉴 -> '도구 더보기' -> '바로가기 만들기' ('창으로 열기' 체크)
:computer:|<img src="https://w.namu.la/s/1ecd9d98e849872b3fa5a0f9f3add277d373212aabc10d9ef1e705847324abb342e420df735182b9db9f4ef20e6a0a2dbdd9b5d27c4d61dae4d3cfcd0f21c54628832e200a844de8c01899a6b255b5a9920ba0dcea7d3eae4d886cb68ba2c22d" width="32">|윈도우 10|메뉴 -> 'My Roulette 설치'

## :file_folder: 디렉터리 구조  
```  
.  
├── ...   
├── public  
│   ├── index.html  
│   ├── main.js                     # 웹팩을 통해 index.js 의 관련 모듈들을 통합한 파일입니다.  
│   ├── server.js                   # node.js 서버 파일입니다.  
├── src            
│   ├── assets
│   │   ├── icon                    # 파비콘, 모바일 화면에서 보이는 앱 아이콘 파일을 포함하고 있습니다.
│   │   ├── json                    # 대한민국 행정구역 json 파일을 포함하고 있습니다.  
│   ├── css  
│   │   ├── reset.css               # 모바일, 데스크톱 환경에서 사용되는 태그 요소들의 기본 스타일을 초기화합니다.  
│   │   ├── style.css               # 반응형에 맞추어 실제 브라우저 환경에서 적용될 스타일이 작성되어 있습니다.
│   ├── js
│   │   ├── canvas.js               # 룰렛과 관련된 프로퍼티, 메서드가 정의되어 있습니다.
│   │   ├── data-type-checker.js    # 함수 호출 시 인자의 데이터 타입을 검증하기 위한 메서드들이 정의되어 있습니다. 
│   │   ├── dialog.js               # 대화상자와 관련된 프로퍼티, 메서드가 정의되어 있습니다.  
│   │   ├── index.js                # 서비스 워커 등록과 DOM 엘리먼트 노드들의 이벤트 처리가 정의되어 있습니다.  
├── serviceWorker.js                # 서비스 워커의 이벤트들이 정의되어 있습니다.
├── package.json                    # 프로젝트에 설치된 패키지들의 정보를 담고 있습니다.  
├── manifest.json                   # 앱 설치 시 필요한 정보들이 작성되어 있습니다.
└──...
```  

# :globe_with_meridians: 개발  
**IE11**와의 호환성을 염두에 두고 시작하였습니다. **HTML**, **CSS**, **ES5**로 개발한 뒤 , **ES6**로 코드를 수정하고 **Babel**을 통해 코드를 변환시켜 주었습니다. 그 후 **PWA**의 기능들을 추가하고 **Webpack**을 통해 파일을 통합시켜 준 뒤, **라즈베리 파이**와 **Node.js** 서버로 최종 결과물을 확인해 보았습니다.

## :speech_balloon: 언어  
**[NHN 코딩 컨벤션](http://www.tutor4u.co.kr/data/member/test16.pdf "스타일 가이드1")**, **[TOAST UI HTML/CSS/Sass 스타일 가이드](https://ui.toast.com/fe-guide/ko_HTMLCSS "스타일 가이드2")**, **[TOAST UI JS 코딩 컨벤션](https://ui.toast.com/fe-guide/ko_CODING-CONVENTION "스타일 가이드3")** 을 참고하여 작성하였습니다.  

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white" width="300" height="100"/>  

+ **IE11**에서도 지원하는 태그로 작성하였습니다.
+ **시멘틱 태그**를 사용하였습니다.
+ **SEO 관련 태그**를 사용하였습니다.
+ **[HTML Validation Service](https://validator.w3.org/ "HTML 검사")** 로 코드를 검사하였습니다.
+ **[WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/ "접근성 검사")** 로 접근성을 검사하였습니다.
+ **'+'** 버튼 아이콘과 canvas 태그 미지원 시 **대체 텍스트**를 제공하도록 하였습니다.
+ **tabindex** 속성을 추가하여 focus 이벤트에 맞추어 스크린 리더가 필요한 정보를 읽을 수 있도록 하였습니다.

<img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS3&logoColor=white" width="300" height="100"/>  

+ **IE11**에서도 지원하는 속성으로 작성하였습니다.
+ **BEM 방법론**을 사용하였습니다.
+ **[CSS Validation Service](https://jigsaw.w3.org/css-validator/ "CSS 검사")** 와 **[CSS Lint](http://csslint.net/ "CSS Lint")** 로 코드를 검사하였습니다.
+ **[reset.css](https://meyerweb.com/eric/tools/css/reset/ "reset.css")** 에서 실제 사용된 태그들의 스타일 초기화 코드만 남겨두었습니다.
+ 아이폰8과 갤럭시 탭 A 10.1에 실제로 접속해보며 **반응형** 코드를 작성하였습니다.

<img src="https://img.shields.io/badge/JS-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white" width="300" height="100"/>  

+ **ES5**로 처음 생각한 기능들을 구현하고, 편의성을 위해 **ES6**로 코드를 수정하며 진행하였습니다.
+ **ES6**코드는 **Babel**을 통해 변환시켜 주었습니다.
+ **fetch** 함수는 기존 **ES5**과 함께 작성했던 **XMLHttpRequest**를 사용한 함수로 폴리필을 적용시켜주었습니다.
+ 룰렛은 텍스트 컬러(#fff)와 **명도 대비 4.5** 이상인 색상들로만 이루어져 있습니다.
+ **Pixel ratio**와 **반응형**에 맞추어 룰렛이 그려지도록 하였습니다.
+ 함수 인자들의 **데이터 타입을 확인**하는 메서드를 갖고 있는 객체를 정의하여 진행하였습니다.
+ 대화상자는 **재사용**이 가능하고, 모달 상태를 설정할 수 있도록 구현하였습니다.
+ **이벤트 버블링**을 통해 행정구역 버튼 이벤트를 제어하였습니다.
+ **크롬 개발자 도구**를 통해 사용되지 않는 코드를 확인하고 수정하였습니다.

## :package: 도구
:bulb: __ESLint와 Prettier는 VSC 익스텐션과 함께 사용하였습니다.__  

도구|목적
:---:|:---:
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white" width="160" height="50"/>|**코드 분석**을 통해 실수를 줄여 주기 위해 사용하였습니다.
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white" width="160" height="50"/>|**일관된 스타일**을 적용시키기 위해 사용하였습니다.
<img src="https://img.shields.io/badge/Babel-F9DC3E?style=flat-square&logo=Babel&logoColor=white" width="160" height="50"/>|ES6 코드를 **ES5 코드로 변환**시켜 주기 위해 사용하였습니다.
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white" width="160" height="50"/>|**분산된 파일을 통합**시켜 주기 위해 사용하였습니다.

## :sweat_drops: 문제
### 이해되지 않는 코드들:droplet:  
:arrow_right: 룰렛 관련 참고 코드들 대부분은 **하드코딩**을 통해 하나씩 그려보며 진행하였습니다.

### requestAnimationFrame에 this.메서드를 인자로 전달 시 멈춤 현상:droplet:  
:arrow_right: 두 번째 requestAnimationFrame 호출 시 this가 window를 가리켜 실행이 멈추었던 것이었습니다. **바인딩**을 통해 해결하였습니다.  

### :focus에 outline 스타일을 정의할 경우, Tab 키뿐만 아니라 클릭 이벤트에도 스타일이 적용:droplet:  
:arrow_right: body에 **mousedown, keydown** 이벤트를 주어, .tab 클래스가 활성화되었을 경우에 :focus 스타일이 적용되도록 하였습니다.

### 바벨 폴리필을 통한 변환 시, require 함수 호출로 인해 client-side에서 확인 불가:droplet:  
:arrow_right: **Webpack**으로 require로 불러온 모듈들을 통합하여 하나의 JS 파일로 실행해 주었습니다.

### 웹팩 + 바벨 로더로 파일 통합 시, 화살표 함수가 변환되지 않는 경우:droplet:  
:arrow_right: 웹팩 설정 파일에 **target** 프로퍼티를 설정하여 해결하였습니다.

### 예상과 다른 Tab 초점 이동:droplet:  
:arrow_right: 마크업 구조를 수정하고 tabindex 속성을 통해 해결하였습니다.
