// 한옥레이다 설정 파일
// 현재 상황에 맞게 수정된 설정

const CONFIG = {
  // Google My Maps ID (Google My Maps에서 지도 공유 후 URL의 mid= 뒤 값)
  MYMAPS_ID: "1IaydaCVlU-3SxjGa7DnE-y_LzMr2FZg",
  
  // 앱스 스크립트 웹 앱 URL (배포 후 실제 URL로 교체)
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycby8s7cgC4kkcD6XiVheP7BVWvboMuBmbTVEZF6BAvQCMLTdG-3K6-VqyDkH0OBQ8tN_yg/exec",
  
  // 문의 이메일
  CONTACT_EMAIL: "landtalk2025@gmail.com",
  ADS_EMAIL: "landtalk2025@gmail.com",
  
  // 네이버 카페 링크
  NAVER_CAFE_URL: "https://cafe.naver.com/hanokradar",
  
  // Google Analytics 4 측정 ID (선택사항)
  GA_MEASUREMENT_ID: "",  // 필요시 설정
  
  // 서비스 설정
  SERVICE: {
    NAME: "한옥 레이다",
    DESCRIPTION: "서울시 한옥 현황 지도 서비스",
    VERSION: "1.0.0"
  },
  
  // 도메인 설정 (Render 배포 후 업데이트)
  DOMAIN: {
    PRODUCTION: "https://hanok-radar.onrender.com",
    DEVELOPMENT: "http://localhost:8000"
  }
};

// 설정 검증
function validateConfig() {
  const errors = [];
  
  if (!CONFIG.MYMAPS_ID || CONFIG.MYMAPS_ID.includes("your-mymaps-id")) {
    errors.push("Google My Maps ID를 설정하세요");
  }
  
  if (!CONFIG.APPS_SCRIPT_URL || CONFIG.APPS_SCRIPT_URL.includes("your-apps-script-url")) {
    errors.push("앱스 스크립트 URL을 설정하세요");
  }
  
  if (errors.length > 0) {
    console.error("설정 오류:", errors);
    return false;
  }
  
  return true;
}

// 설정이 유효한지 확인
if (!validateConfig()) {
  console.warn("config.js 파일의 설정을 확인하고 수정하세요.");
}
