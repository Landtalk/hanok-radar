// 설정 로드 (config.js에서 가져옴)
const MYMAPS_ID = CONFIG.MYMAPS_ID;
// 구글마이맵 embed URL (검색 기능 활성화)
const MAP_EMBED = `https://www.google.com/maps/d/embed?mid=${MYMAPS_ID}&ehbc=2E312F&hl=ko&gl=KR`;
const MAP_VIEW  = `https://www.google.com/maps/d/viewer?mid=${MYMAPS_ID}`;

// My Maps ID 검증 함수
function validateMyMapsId() {
  console.log("My Maps ID 검증 중:", MYMAPS_ID);
  console.log("Embed URL:", MAP_EMBED);
  console.log("View URL:", MAP_VIEW);
  
  // 간단한 검증: ID가 20자 이상인지 확인
  if (MYMAPS_ID.length < 20) {
    console.warn("⚠️ My Maps ID가 너무 짧습니다. 올바른 ID인지 확인하세요.");
    return false;
  }
  
  return true;
}

// ====== UI ======
const $ = s => document.querySelector(s);
const mapScreen    = $("#mapScreen");
const mymapsIframe = $("#mymaps");
const openNewTab   = $("#openNewTab");
const mapHint      = $("#mapHint");

function show(el){
  // 지도 화면만 표시
  if (el) {
    el.classList.remove("hide");
  }
}

async function boot(){
  console.log("=== 한옥레이다 부팅 시작 ===");
  console.log("My Maps ID:", MYMAPS_ID);
  console.log("Map Embed URL:", MAP_EMBED);
  
  // My Maps ID 검증
  if (!validateMyMapsId()) {
    console.error("❌ My Maps ID가 올바르지 않습니다.");
    mapHint.textContent = "My Maps ID를 확인하세요. config.js 파일을 확인하세요.";
    return;
  }
  
  console.log("지도 로드 시작...");
  
  // 지도 바로 로드 (로그인 없이) - 구글마이맵 "큰 지도 보기" 모드
  mymapsIframe.src = MAP_EMBED;
  openNewTab.href  = MAP_VIEW;
  show(mapScreen);

  console.log("✅ 지도 화면 표시됨");

  // 로드 힌트
  mymapsIframe.onload = () => {
    console.log("✅ 지도 로드 완료");
    mapHint.textContent = "지도 로드 완료. 보이지 않으면 My Maps 공유를 확인하세요.";
  };

  mymapsIframe.onerror = () => {
    console.error("❌ 지도 로드 실패");
    mapHint.textContent = "지도 로드 실패. My Maps ID와 공유 설정을 확인하세요.";
  };

    console.log("📊 지도 서비스 로드 완료");
}

// 페이지 로드 시 지도 초기화
document.addEventListener('DOMContentLoaded', boot);
