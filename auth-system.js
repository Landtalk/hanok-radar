// 구글시트 연동 이메일 인증 시스템
class AuthSystem {
    constructor() {
        // 앱스 스크립트 웹 앱 URL (구글시트 연동)
        this.appsScriptUrl = 'https://script.google.com/macros/s/AKfycbxBG0e-mE9Dzy6z96MYoJGwCWgxyOSdebVb1YLOhOALQo2nQfPgu6pBNX6A8HCKMS8cNA/exec';
    }

    // 구글시트에서 이메일 검증
    async validateEmail(email) {
        if (!email) return false;
        
        try {
            const response = await fetch(`${this.appsScriptUrl}?action=checkEmail&email=${encodeURIComponent(email)}`);
            const data = await response.json();
            
            return data.valid === true;
        } catch (error) {
            console.error('이메일 검증 실패:', error);
            return false;
        }
    }

    // 로컬 스토리지에서 이메일 저장/불러오기
    saveEmail(email) {
        localStorage.setItem('hanok_radar_email', email);
    }

    getStoredEmail() {
        return localStorage.getItem('hanok_radar_email');
    }

    // 접근 권한 확인
    async checkAccess() {
        // 로컬 스토리지에서 이메일 확인
        const storedEmail = this.getStoredEmail();
        if (storedEmail && await this.validateEmail(storedEmail)) {
            return true;
        }

        return false;
    }

    // 이메일 로그인 처리
    async login(email) {
        if (await this.validateEmail(email)) {
            this.saveEmail(email);
            return true;
        }
        return false;
    }

    // 로그아웃 처리
    logout() {
        localStorage.removeItem('hanok_radar_email');
        window.location.href = 'landing.html';
    }

    // 접근 허용 시 메인 페이지 표시
    showMainContent() {
        document.body.style.display = 'block';
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
document.addEventListener('DOMContentLoaded', async function() {
    // 랜딩페이지에서는 인증 체크 생략
    if (window.location.pathname.includes('landing.html')) {
        return;
    }
    
    const hasAccess = await authSystem.checkAccess();
    
    if (hasAccess) {
        authSystem.showMainContent();
    } else {
        authSystem.showAccessDenied();
    }
});
