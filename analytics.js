// 한옥레이다 사용자 행동 추적 및 분석 시스템
class HanokAnalytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.userActions = [];
    this.mapInteractions = [];
    this.leadInterests = new Set();
    this.isInitialized = false;
    
    this.init();
  }

  // 세션 ID 생성
  generateSessionId() {
    return 'hanok_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // 초기화
  init() {
    this.setupGoogleAnalytics();
    this.setupEventListeners();
    this.trackPageView();
    this.isInitialized = true;
    console.log('📊 한옥레이다 분석 시스템 초기화 완료');
  }

  // Google Analytics 4 설정
  setupGoogleAnalytics() {
    // GA4 측정 ID (직접 설정)
    const measurementId = 'G-D3G79CD34J'; // 한옥레이다 GA4 측정 ID
    
    if (!measurementId) {
      console.warn('⚠️ GA4 측정 ID가 설정되지 않았습니다. analytics.js에서 measurementId를 설정하세요.');
      return;
    }

    // GA4 설정
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: '한옥레이다',
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'hanok_radar'
      }
    });

    // GA4 스크립트 로드
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
    
    console.log('✅ Google Analytics 4 설정 완료:', measurementId);
  }

  // 이벤트 리스너 설정
  setupEventListeners() {
    // 지도 클릭 추적
    this.trackMapClicks();
    
    // 버튼 클릭 추적
    this.trackButtonClicks();
    
    // 스크롤 및 체류 시간 추적
    this.trackScrollAndTime();
    
    // 지도 레이어 상호작용 추적
    this.trackMapLayerInteractions();
  }

  // 지도 클릭 추적
  trackMapClicks() {
    const mapContainer = document.querySelector('.map-embed');
    if (mapContainer) {
      mapContainer.addEventListener('click', (e) => {
        const rect = mapContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.trackEvent('map_click', {
          x_percentage: Math.round((x / rect.width) * 100),
          y_percentage: Math.round((y / rect.height) * 100),
          timestamp: Date.now()
        });
      });
    }
  }

  // 버튼 클릭 추적
  trackButtonClicks() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('button, .btn, a')) {
        const buttonText = e.target.textContent.trim();
        const buttonClass = e.target.className;
        
        this.trackEvent('button_click', {
          button_text: buttonText,
          button_class: buttonClass,
          element_id: e.target.id || 'unknown'
        });
      }
    });
  }

  // 스크롤 및 체류 시간 추적
  trackScrollAndTime() {
    let scrollDepth = 0;
    let maxScrollDepth = 0;
    
    window.addEventListener('scroll', () => {
      scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
    });

    // 페이지 떠날 때 최종 데이터 전송
    window.addEventListener('beforeunload', () => {
      this.trackEvent('session_end', {
        session_duration: Date.now() - this.startTime,
        max_scroll_depth: maxScrollDepth,
        total_actions: this.userActions.length,
        map_interactions: this.mapInteractions.length
      });
    });
  }

  // 지도 레이어 상호작용 추적
  trackMapLayerInteractions() {
    // 지도 iframe과의 통신을 위한 메시지 리스너
    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://www.google.com') return;
      
      // Google Maps 이벤트 처리
      if (event.data && event.data.type) {
        this.trackEvent('map_interaction', {
          interaction_type: event.data.type,
          data: event.data
        });
      }
    });
  }

  // 이벤트 추적
  trackEvent(eventName, parameters = {}) {
    const eventData = {
      event_name: eventName,
      session_id: this.sessionId,
      timestamp: Date.now(),
      url: window.location.href,
      user_agent: navigator.userAgent,
      ...parameters
    };

    // 로컬 저장
    this.userActions.push(eventData);
    
    // Google Analytics로 전송
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
    }

    // 리드 관심사 분석
    this.analyzeLeadInterest(eventName, parameters);
    
    console.log('📊 이벤트 추적:', eventName, eventData);
  }

  // 리드 관심사 분석
  analyzeLeadInterest(eventName, parameters) {
    const interestKeywords = {
      '공인중개사': ['부동산', '매매', '임대', '중개', '거래'],
      '건축사': ['건축', '신축', '개조', '리모델링', '설계'],
      '세무사': ['세금', '신고', '세무', '부가세', '소득세'],
      '회계사': ['회계', '장부', '재무', '감사', '컨설팅'],
      '인테리어': ['인테리어', '디자인', '공간', '가구', '장식']
    };

    const searchText = JSON.stringify(parameters).toLowerCase();
    
    Object.entries(interestKeywords).forEach(([category, keywords]) => {
      if (keywords.some(keyword => searchText.includes(keyword))) {
        this.leadInterests.add(category);
        this.trackEvent('lead_interest', {
          category: category,
          confidence: this.calculateInterestConfidence(category, searchText)
        });
      }
    });
  }

  // 관심도 신뢰도 계산
  calculateInterestConfidence(category, searchText) {
    const keywords = {
      '공인중개사': ['부동산', '매매', '임대', '중개', '거래'],
      '건축사': ['건축', '신축', '개조', '리모델링', '설계'],
      '세무사': ['세금', '신고', '세무', '부가세', '소득세'],
      '회계사': ['회계', '장부', '재무', '감사', '컨설팅'],
      '인테리어': ['인테리어', '디자인', '공간', '가구', '장식']
    };

    const matchedKeywords = keywords[category].filter(keyword => 
      searchText.includes(keyword)
    ).length;
    
    return Math.min(100, (matchedKeywords / keywords[category].length) * 100);
  }

  // 페이지 뷰 추적
  trackPageView() {
    this.trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      referrer: document.referrer
    });
  }

  // 사용자 행동 데이터 가져오기
  getUserBehaviorData() {
    return {
      sessionId: this.sessionId,
      startTime: this.startTime,
      duration: Date.now() - this.startTime,
      actions: this.userActions,
      mapInteractions: this.mapInteractions,
      leadInterests: Array.from(this.leadInterests),
      pageViews: this.userActions.filter(action => action.event_name === 'page_view').length
    };
  }

  // 리드 데이터 생성
  generateLeadData() {
    const behaviorData = this.getUserBehaviorData();
    const leadScore = this.calculateLeadScore(behaviorData);
    
    return {
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      leadScore: leadScore,
      interests: Array.from(this.leadInterests),
      behavior: {
        mapClicks: this.userActions.filter(a => a.event_name === 'map_click').length,
        buttonClicks: this.userActions.filter(a => a.event_name === 'button_click').length,
        sessionDuration: behaviorData.duration,
        maxScrollDepth: Math.max(...this.userActions.map(a => a.max_scroll_depth || 0))
      },
      recommendations: this.getRecommendations(leadScore, Array.from(this.leadInterests))
    };
  }

  // 리드 점수 계산
  calculateLeadScore(behaviorData) {
    let score = 0;
    
    // 체류 시간 점수 (최대 30점)
    const durationMinutes = behaviorData.duration / 60000;
    score += Math.min(30, durationMinutes * 2);
    
    // 지도 상호작용 점수 (최대 25점)
    const mapClicks = behaviorData.actions.filter(a => a.event_name === 'map_click').length;
    score += Math.min(25, mapClicks * 5);
    
    // 관심사 점수 (최대 25점)
    score += Math.min(25, this.leadInterests.size * 8);
    
    // 페이지 뷰 점수 (최대 20점)
    score += Math.min(20, behaviorData.pageViews * 10);
    
    return Math.round(score);
  }

  // 추천 서비스 생성
  getRecommendations(leadScore, interests) {
    const recommendations = [];
    
    if (interests.includes('공인중개사')) {
      recommendations.push({
        category: '공인중개사',
        message: '한옥 매매/임대 전문 공인중개사 상담',
        priority: leadScore > 50 ? 'high' : 'medium'
      });
    }
    
    if (interests.includes('건축사')) {
      recommendations.push({
        category: '건축사',
        message: '한옥 신축/개조 전문 건축사 상담',
        priority: leadScore > 60 ? 'high' : 'medium'
      });
    }
    
    if (interests.includes('세무사')) {
      recommendations.push({
        category: '세무사',
        message: '부동산 세무 신고 전문 세무사 상담',
        priority: leadScore > 40 ? 'high' : 'low'
      });
    }
    
    if (interests.includes('회계사')) {
      recommendations.push({
        category: '회계사',
        message: '부동산 회계 관리 전문 회계사 상담',
        priority: leadScore > 40 ? 'high' : 'low'
      });
    }
    
    if (interests.includes('인테리어')) {
      recommendations.push({
        category: '인테리어',
        message: '한옥 인테리어 전문 업체 상담',
        priority: leadScore > 45 ? 'high' : 'medium'
      });
    }
    
    return recommendations;
  }

  // 실제 방문자 카운팅 시스템
  static incrementRealVisitor() {
    const today = new Date().toDateString();
    const data = JSON.parse(localStorage.getItem('hanok_radar_real_stats') || '{"date":"","visitors":0,"sessions":0}');
    
    // 새로운 날이면 초기화
    if (data.date !== today) {
      data.date = today;
      data.visitors = 0;
      data.sessions = 0;
    }
    
    // 방문자 수 증가
    data.visitors += 1;
    data.sessions += 1;
    
    localStorage.setItem('hanok_radar_real_stats', JSON.stringify(data));
    return data;
  }

  // 실제 통계 데이터 가져오기
  static getRealStats() {
    const today = new Date().toDateString();
    const data = JSON.parse(localStorage.getItem('hanok_radar_real_stats') || '{"date":"","visitors":0,"sessions":0}');
    
    // 현재 접속자 수 (세션 기반)
    const currentSessions = JSON.parse(sessionStorage.getItem('hanok_radar_active_sessions') || '[]');
    const activeSessions = currentSessions.filter(session => 
      Date.now() - session.timestamp < 300000 // 5분 이내 활동
    ).length;
    
    return {
      todayVisitors: data.date === today ? data.visitors : 0,
      currentUsers: Math.max(1, activeSessions), // 최소 1명
      totalSessions: data.sessions,
      lastUpdated: new Date().toISOString()
    };
  }

  // 활성 세션 등록
  static registerActiveSession() {
    const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const session = {
      id: sessionId,
      timestamp: Date.now()
    };
    
    const activeSessions = JSON.parse(sessionStorage.getItem('hanok_radar_active_sessions') || '[]');
    activeSessions.push(session);
    
    // 5분 이상 된 세션 제거
    const validSessions = activeSessions.filter(s => Date.now() - s.timestamp < 300000);
    sessionStorage.setItem('hanok_radar_active_sessions', JSON.stringify(validSessions));
    
    return sessionId;
  }
}

// 전역 인스턴스 생성
window.hanokAnalytics = new HanokAnalytics();
