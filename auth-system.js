// 가짜 인증 시스템 (모든 이메일 허용)
class AuthSystem {
    constructor() {
        // 가짜 인증 시스템 - 이메일 목록 불필요
        console.log('한옥 레이다 인증 시스템 초기화 완료');
    }

    // 이메일 검증 (가짜 인증 - 모든 이메일 허용)
    validateEmail(email) {
        if (!email) return false;
        
        // 모든 이메일 허용 (가짜 인증)
        return true;
    }

    // 로컬 스토리지에서 이메일 저장/불러오기 (보안 강화)
    saveEmail(email) {
        // 세션 스토리지 사용 (브라우저 종료 시 자동 삭제)
        sessionStorage.setItem('hanok_radar_email', email);
        
        // 공용 컴퓨터 경고
        if (navigator.userAgent.includes('Chrome') && !navigator.userAgent.includes('Incognito')) {
            console.warn('공용 컴퓨터에서는 시크릿 모드 사용을 권장합니다.');
        }
    }

    getStoredEmail() {
        return sessionStorage.getItem('hanok_radar_email');
    }

    // 접근 권한 확인 (가짜 인증)
    checkAccess() {
        // 로컬 스토리지에서 이메일 확인
        const storedEmail = this.getStoredEmail();
        if (storedEmail) {
            return true; // 이메일이 있으면 무조건 허용
        }

        return false;
    }

    // 이메일 로그인 처리 (가짜 인증)
    login(email) {
        // 모든 이메일 허용
        this.saveEmail(email);
        return true;
    }

    // 로그아웃 처리
    logout() {
        sessionStorage.removeItem('hanok_radar_email');
        window.location.href = 'landing.html';
    }

    // 접근 허용 시 메인 페이지 표시
    showMainContent() {
        document.body.style.display = 'block';
        
        // 구글 계정 로그인 안내 (한 번만 표시)
        if (!sessionStorage.getItem('google_account_notice_shown')) {
            this.showGoogleAccountNotice();
        }
    }
    
    // 구글 계정 로그인 안내 표시
    showGoogleAccountNotice() {
        const notice = document.createElement('div');
        notice.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e3f2fd;
            border: 1px solid #bbdefb;
            border-radius: 10px;
            padding: 15px;
            max-width: 300px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        notice.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h4 style="margin: 0; color: #1976d2; font-size: 1em;">📌 구글 계정 안내</h4>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 1.2em; cursor: pointer; color: #666;">×</button>
            </div>
            <p style="margin: 0; color: #424242; font-size: 0.9em; line-height: 1.4;">
                지도 서비스 이용 시 구글 계정 로그인이 필요할 수 있습니다.
                <br><a href="https://accounts.google.com/signup" target="_blank" style="color: #1976d2; text-decoration: none; font-weight: bold;">구글 계정 만들기</a>
            </p>
        `;
        
        document.body.appendChild(notice);
        
        // 5초 후 자동 숨김
        setTimeout(() => {
            if (notice.parentElement) {
                notice.remove();
            }
        }, 5000);
        
        // 안내 표시 완료 표시
        sessionStorage.setItem('google_account_notice_shown', 'true');
    }

    // 접근 거부 시 메시지 표시
    showAccessDenied() {
        document.body.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: Arial, sans-serif;
            ">
                <div style="
                    background: white;
                    padding: 40px;
                    border-radius: 20px;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    max-width: 500px;
                ">
                    <h2 style="color: #2c3e50; margin-bottom: 20px;">🔒 접근 권한이 필요합니다</h2>
                    <p style="color: #7f8c8d; margin-bottom: 30px;">
                        한옥 레이다 서비스는 승인된 사용자만 이용할 수 있습니다.
                    </p>
                    <a href="landing.html" style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        text-decoration: none;
                        font-weight: bold;
                        display: inline-block;
                    ">접근 신청하기</a>
                </div>
            </div>
        `;
    }
}

// 전역 인증 시스템 인스턴스
const authSystem = new AuthSystem();

// 페이지 로드 시 접근 권한 확인
document.addEventListener('DOMContentLoaded', function() {
    // 랜딩페이지에서는 인증 체크 생략
    if (window.location.pathname.includes('landing.html')) {
        return;
    }
    
    const hasAccess = authSystem.checkAccess();
    
    if (hasAccess) {
        authSystem.showMainContent();
    } else {
        authSystem.showAccessDenied();
    }
});
