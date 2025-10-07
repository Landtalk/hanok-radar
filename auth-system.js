// 이메일 인증 및 토큰 관리 시스템
class AuthSystem {
    constructor() {
        // 앱스 스크립트 웹 앱 URL (config.js에서 가져옴)
        this.appsScriptUrl = CONFIG.APPS_SCRIPT_URL;
    }

    // URL에서 토큰 추출
    getTokenFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('token');
    }

    // 앱스 스크립트를 통한 토큰 검증
    async validateToken(token) {
        if (!token) return false;

        try {
            const response = await fetch(`${this.appsScriptUrl}?token=${token}`);
            const data = await response.json();
            
            return data.valid === true;
        } catch (error) {
            console.error('토큰 검증 실패:', error);
            return false;
        }
    }

    // 로컬 스토리지에서 토큰 저장/불러오기
    saveToken(token) {
        localStorage.setItem('hanok_radar_token', token);
    }

    getStoredToken() {
        return localStorage.getItem('hanok_radar_token');
    }

    // 접근 권한 확인
    async checkAccess() {
        // URL에서 토큰 확인
        const urlToken = this.getTokenFromUrl();
        if (urlToken) {
            const isValid = await this.validateToken(urlToken);
            if (isValid) {
                this.saveToken(urlToken);
                return true;
            }
        }

        // 로컬 스토리지에서 토큰 확인
        const storedToken = this.getStoredToken();
        if (storedToken) {
            const isValid = await this.validateToken(storedToken);
            if (isValid) {
                return true;
            } else {
                // 만료된 토큰 제거
                localStorage.removeItem('hanok_radar_token');
            }
        }

        return false;
    }

    // 접근 거부 시 랜딩페이지로 리다이렉트
    redirectToLanding() {
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
    const hasAccess = await authSystem.checkAccess();
    
    if (hasAccess) {
        authSystem.showMainContent();
    } else {
        authSystem.showAccessDenied();
    }
});

// 토큰 만료 체크 (5분마다)
setInterval(async function() {
    const hasAccess = await authSystem.checkAccess();
    if (!hasAccess) {
        authSystem.redirectToLanding();
    }
}, 5 * 60 * 1000);
