// 한옥레이다 카테고리 클릭 추적 시스템
class CategoryTracker {
  constructor() {
    this.categories = {
      '한옥전문건축사': { clicks: 0, icon: '🏗️', description: '한옥 신축/개조 전문' },
      '한옥전문공인중개사': { clicks: 0, icon: '🏠', description: '한옥 매매/임대 전문' },
      '한옥전문회계사/세무사': { clicks: 0, icon: '📊', description: '부동산 세무/회계 전문' },
      '한옥전문사진촬영': { clicks: 0, icon: '📸', description: '한옥 사진 촬영 전문' },
      '한옥전문청소업체': { clicks: 0, icon: '🧹', description: '한옥 청소/관리 전문' },
      '한옥전문보험': { clicks: 0, icon: '🛡️', description: '한옥 보험 전문' }
    };
    
    this.totalClicks = 0;
    this.sessionStartTime = Date.now();
    this.isInitialized = false;
    
    this.init();
  }

  init() {
    this.setupCategoryButtons();
    this.trackPageInteractions();
    this.loadStoredData();
    this.isInitialized = true;
    console.log('📊 카테고리 추적 시스템 초기화 완료');
  }

  // 카테고리 버튼 설정
  setupCategoryButtons() {
    // 사이드바의 category-buttons 컨테이너를 찾아서 사용
    const container = document.getElementById('categoryButtons');
    if (container) {
      this.renderCategoryButtons();
    } else {
      console.warn('카테고리 버튼 컨테이너를 찾을 수 없습니다.');
    }
  }

  // 카테고리 버튼 렌더링
  renderCategoryButtons() {
    const container = document.getElementById('categoryButtons');
    if (!container) return;

    container.innerHTML = `
      ${Object.entries(this.categories).map(([category, data]) => `
        <button class="category-btn" data-category="${category}" onclick="hanokCategoryTracker.trackCategoryClick('${category}')">
          <span class="category-icon">${data.icon}</span>
          <span class="category-name">${category}</span>
        </button>
      `).join('')}
    `;
  }

  // 카테고리 클릭 추적
  trackCategoryClick(category) {
    if (!this.categories[category]) return;

    // 클릭 수 증가
    this.categories[category].clicks++;
    this.totalClicks++;

    // UI 업데이트
    this.updateClickCounts();
    this.updatePopularCategory();

    // 이벤트 추적
    this.trackEvent('category_click', {
      category: category,
      click_count: this.categories[category].clicks,
      total_clicks: this.totalClicks
    });

    // 로컬 저장소에 저장
    this.saveData();

    // 시각적 피드백
    this.showClickFeedback(category);

    console.log(`📊 ${category} 클릭: ${this.categories[category].clicks}회`);
  }

  // 클릭 수 업데이트 (사이드바에서는 클릭 수를 표시하지 않음)
  updateClickCounts() {
    // 사이드바에서는 클릭 수를 표시하지 않으므로 빈 함수로 유지
    // 필요시 콘솔에 로그만 출력
    console.log(`📊 총 클릭 수: ${this.totalClicks}`);
  }

  // 인기 카테고리 업데이트
  updatePopularCategory() {
    const popular = Object.entries(this.categories)
      .sort((a, b) => b[1].clicks - a[1].clicks)[0];
    
    const popularElement = document.getElementById('popularCategory');
    if (popularElement && popular[1].clicks > 0) {
      popularElement.textContent = `${popular[0]} (${popular[1].clicks}회)`;
    }
  }

  // 클릭 피드백 표시
  showClickFeedback(category) {
    const button = document.querySelector(`[data-category="${category}"]`);
    if (button) {
      button.classList.add('clicked');
      setTimeout(() => {
        button.classList.remove('clicked');
      }, 300);
    }
  }

  // 페이지 상호작용 추적
  trackPageInteractions() {
    // 지도 클릭 추적
    const mapContainer = document.querySelector('.map-embed');
    if (mapContainer) {
      mapContainer.addEventListener('click', (e) => {
        this.trackEvent('map_click', {
          x: e.clientX,
          y: e.clientY,
          timestamp: Date.now()
        });
      });
    }

    // 스크롤 추적
    let scrollDepth = 0;
    window.addEventListener('scroll', () => {
      const newScrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (newScrollDepth > scrollDepth) {
        scrollDepth = newScrollDepth;
        this.trackEvent('scroll_depth', {
          depth: scrollDepth
        });
      }
    });

    // 페이지 떠날 때 세션 데이터 저장
    window.addEventListener('beforeunload', () => {
      this.trackEvent('session_end', {
        session_duration: Date.now() - this.sessionStartTime,
        total_clicks: this.totalClicks,
        category_clicks: this.categories
      });
    });
  }

  // 이벤트 추적
  trackEvent(eventName, parameters = {}) {
    const eventData = {
      event_name: eventName,
      timestamp: Date.now(),
      url: window.location.href,
      ...parameters
    };

    // Google Analytics로 전송
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
    }

    console.log('📊 이벤트 추적:', eventName, eventData);
  }

  // 데이터 로컬 저장
  saveData() {
    const data = {
      categories: this.categories,
      totalClicks: this.totalClicks,
      lastUpdated: Date.now()
    };
    localStorage.setItem('hanok_category_tracker', JSON.stringify(data));
  }

  // 저장된 데이터 로드
  loadStoredData() {
    const stored = localStorage.getItem('hanok_category_tracker');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.categories = data.categories || this.categories;
        this.totalClicks = data.totalClicks || 0;
        this.updateClickCounts();
        this.updatePopularCategory();
      } catch (e) {
        console.warn('저장된 데이터 로드 실패:', e);
      }
    }
  }

  // 통계 데이터 가져오기
  getStats() {
    const sortedCategories = Object.entries(this.categories)
      .sort((a, b) => b[1].clicks - a[1].clicks);

    return {
      totalClicks: this.totalClicks,
      sessionDuration: Date.now() - this.sessionStartTime,
      categoryRanking: sortedCategories,
      mostPopular: sortedCategories[0] ? sortedCategories[0][0] : null,
      leastPopular: sortedCategories[sortedCategories.length - 1] ? sortedCategories[sortedCategories.length - 1][0] : null
    };
  }

  // 데이터 초기화
  resetData() {
    Object.keys(this.categories).forEach(category => {
      this.categories[category].clicks = 0;
    });
    this.totalClicks = 0;
    this.updateClickCounts();
    this.updatePopularCategory();
    this.saveData();
    console.log('📊 데이터 초기화 완료');
  }

  // 데이터 내보내기
  exportData() {
    const stats = this.getStats();
    const dataStr = JSON.stringify(stats, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `hanok_category_stats_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  }
}

// 전역 인스턴스 생성
window.hanokCategoryTracker = new CategoryTracker();
