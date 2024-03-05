
<div style="text-align:center;">
        <img src="https://github.com/2024-SMHRD-IS-IOT-2/Smartcamperss/assets/74088300/d2c89a0a-2438-4fcd-a75b-fde4cf8ef8f4" width="200">
</div>

###### 이미지 출처 : www.flaticon.com/

## 𝚂𝚊𝚟𝚎 𝚝𝚑𝚎 𝙲𝚊𝚖𝚙𝚎𝚛𝚜 (팀명 : 𝚂𝚖𝚊𝚛𝚝𝙲𝚊𝚖𝚙𝚎𝚛𝚜)



### 📚 1. 프로젝트 개요
##### 주제명 : IoT기반 캠핑안전관리시스템 
- 일산화탄소·이산화탄소 감지 센서, 온·습도 센서 등을 활용하여 상황 발생 시 사용자에게 스피커로 전달하여 캠핑장 이용객의 안전을 보호하는 서비스



### 🪛 2. 주요기술
▪ [IoT 기능]
 - 화재 경보 : 불꽃 센서, 연기, 온도 센서를 활용하여 알림 
 - 온습도 감지 : 텐트 내의 온습도를 감지하여 LCD와 웹에 표시
 - 일산화탄소 및 각종 유해가스 감지 : 텐트 내의 일산화탄소 농도와 유해가스를 감지하여, LED를 통한 알림과 웹에서의 관리자 모니터링 기능 > 일정 수치 이상이 되면 캠퍼, 관리자 알림
 - 관리자 알림 기능 : 관리자 페이지에서 이용객별로 특이 사항 있을 때, 알림 기능

 - 비상 버튼 : 비상 버튼 누를시, 비상벨 울리고, 관리자에게 알림
 - 배터리 잔량 기능 : 배터리 잔량 LCD 및 관리자 페이지에 표시
   
▪ [웹 기능]
- 관리자 로그인&회원가입 기능 : 캠핑장 업주가 자기 고유의 계정으로 관리자 페이지로 접속해 관리
- 관리자 메인 페이지 : 각 테크별로 상황을 나타내는 데이터를 실시간으로 관리자 대시보드 페이지로 전달받음 
- 이벤트 알림 기능 : 캠핑장 내 이벤트를 사용자에게 전송
- 사용자 전용 LCD 화면 : 실내의 온습도 측정값, 일산화탄소 농도 수치를 전용 LCD 디스플레이를 통해 전달 받고 OpenWeatherMap API를 통해 캠핑장 지역 날씨 데이터를 제공 받음.
- DB관리 : 캠핑장 각 테크별 데이터값을 데이터베이스에 저장하고 관리

### 🪛 3. 개발환경
  
![이미지 링크](https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white) 
![이미지 링크](https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white) 
![이미지 링크](https://img.shields.io/badge/raspberrypi-A22846?style=flat&logo=raspberrypi&logoColor=white) 
![이미지 링크](https://img.shields.io/badge/mysql-4479A1?style=flat&logo=mysql&logoColor=white) 
![이미지 링크](https://img.shields.io/badge/javascript-F7DF1E?style=flat&logo=javascript&logoColor=white) 
![이미지 링크](https://img.shields.io/badge/visualstudiocode-007ACC?style=flat&logo=visualstudiocode&logoColor=white) 




### 👤 4. 유스케이스
![image](https://github.com/2024-SMHRD-IS-IOT-2/Smartcamperss/assets/74088300/bda01d36-ab90-4d7f-94f5-ca8fc16e5e13)

### 👤 5. 서비스흐름도
![image](https://github.com/2024-SMHRD-IS-IOT-2/Smartcamperss/assets/74088300/25d3c623-e888-4247-a011-890793359504)

### 👤 6.ER 다이어그램
![image](https://github.com/2024-SMHRD-IS-IOT-2/Smartcamperss/assets/74088300/38c2234d-a5c9-4e44-b075-82e2d57269c9)

### 💻 7.웹 페이지

<img src="https://github.com/2024-SMHRD-IS-IOT-2/Smartcamperss/assets/74088300/af553741-7f3b-4ae4-8032-f88aa9932f5b" width="200">
<img src="https://github.com/2024-SMHRD-IS-IOT-2/Smartcamperss/assets/74088300/c4c4e393-114e-4fe3-bfb0-212244237e64" width="200">
<img src="https://github.com/2024-SMHRD-IS-IOT-2/Smartcamperss/assets/74088300/a191ef4b-4086-4d2b-985e-d41ce131d64e" width="200">


### 👥 8.팀별 역할

|제목|내용|설명|
|------|---|---|
|테스트1|테스트2|테스트3|
|테스트1|테스트2|테스트3|
|테스트1|테스트2|테스트3|

### 📹 9. 시연영상

### 🔗 10. 참고문헌
##### [참고사이트]
###### 한국관광공사  고캠핑 (https://gocamping.or.kr/)
###### 한국관광데이터랩 (https://datalab.visitkorea.or.kr/)

##### [보고서]
###### 2022년 기준 캠핑 이용자 실태조사 결과 보고서, 한국관광공사· 문화체육관광부, 2023.12.

##### 📰 [보도자료] 
###### 코로나 이후에도 캠핑 인기 꾸준- ‘2021 캠핑이용자 실태조사’ 결과 발표, 2022년 09월 06일, 한국관광공사


##### 📰 [뉴스]
###### 캠핑장서 일가족 3명 참변..."일산화탄소 중독 주의", YTN, 2023.11.12
###### 새해 첫날 텐트에서 2명 숨져…일산화탄소 중독 추정, KBS, 2024.01.02.
###### 텐트에서 중년부부 사망.. 일산화탄소 중독 추정, 목포MBC, 2023. 10. 24.

##### 📰 [신문]
###### 캠핑카에서… 텐트서… 난방용 가스 새 잇단 참변, 동아일보 2020.12.15. A14
###### 이번엔 야영 텐트서 일산화탄소 중독 추정 사망, 동아일보 2019.01.15. A12
###### 부탄가스 온수매트 켜고 자다가‐해수욕장 텐트서 60대 부부 숨져, 조선일보 2021.04.28. A10


![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=2024-SMHRD-IS-IOT-2/Smartcamperss&hide=contribs,prs)
