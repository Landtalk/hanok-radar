// 서울시 구별 한옥 통계 데이터
// 데이터 출처: 서울열린데이터광장 (https://data.seoul.go.kr)
// - 한옥등록 정보: OA-15415
// - 한옥체험업 정보: OA-16047
// 갱신일: 2025.10.01
class DistrictStats {
  constructor() {
    this.districts = {
      '강남구': { 
        hanokCount: 1, 
        experienceCount: 0, 
        totalArea: 39.5,
        population: 547000,
        coordinates: { lat: 37.5172, lng: 127.0473 }
      },
      '강동구': { 
        hanokCount: 1, 
        experienceCount: 0, 
        totalArea: 24.6,
        population: 442000,
        coordinates: { lat: 37.5301, lng: 127.1238 }
      },
      '강북구': { 
        hanokCount: 0, 
        experienceCount: 1, 
        totalArea: 23.6,
        population: 330000,
        coordinates: { lat: 37.6396, lng: 127.0253 }
      },
      '강서구': { 
        hanokCount: 1, 
        experienceCount: 0, 
        totalArea: 41.4,
        population: 599000,
        coordinates: { lat: 37.5500, lng: 126.8210 }
      },
      '관악구': { 
        hanokCount: 0, 
        experienceCount: 0, 
        totalArea: 29.6,
        population: 518000,
        coordinates: { lat: 37.4784, lng: 126.9516 }
      },
      '광진구': { 
        hanokCount: 1, 
        experienceCount: 2, 
        totalArea: 17.1,
        population: 352000,
        coordinates: { lat: 37.5385, lng: 127.0823 }
      },
      '구로구': { 
        hanokCount: 0, 
        experienceCount: 1, 
        totalArea: 20.1,
        population: 419000,
        coordinates: { lat: 37.4954, lng: 126.8877 }
      },
      '금천구': { 
        hanokCount: 0, 
        experienceCount: 0, 
        totalArea: 13.0,
        population: 244000,
        coordinates: { lat: 37.4602, lng: 126.9003 }
      },
      '노원구': { 
        hanokCount: 0, 
        experienceCount: 0, 
        totalArea: 35.4,
        population: 526000,
        coordinates: { lat: 37.6542, lng: 127.0568 }
      },
      '도봉구': { 
        hanokCount: 1, 
        experienceCount: 1, 
        totalArea: 20.7,
        population: 348000,
        coordinates: { lat: 37.6688, lng: 127.0471 }
      },
      '동대문구': { 
        hanokCount: 27, 
        experienceCount: 6, 
        totalArea: 14.2,
        population: 346000,
        coordinates: { lat: 37.5838, lng: 127.0507 }
      },
      '동작구': { 
        hanokCount: 2, 
        experienceCount: 0, 
        totalArea: 16.3,
        population: 404000,
        coordinates: { lat: 37.5124, lng: 126.9392 }
      },
      '마포구': { 
        hanokCount: 15, 
        experienceCount: 5, 
        totalArea: 23.9,
        population: 374000,
        coordinates: { lat: 37.5663, lng: 126.9019 }
      },
      '서대문구': { 
        hanokCount: 26, 
        experienceCount: 1, 
        totalArea: 17.6,
        population: 314000,
        coordinates: { lat: 37.5791, lng: 126.9368 }
      },
      '서초구': { 
        hanokCount: 1, 
        experienceCount: 0, 
        totalArea: 47.0,
        population: 431000,
        coordinates: { lat: 37.4837, lng: 127.0324 }
      },
      '성동구': { 
        hanokCount: 3, 
        experienceCount: 0, 
        totalArea: 16.9,
        population: 309000,
        coordinates: { lat: 37.5636, lng: 127.0366 }
      },
      '성북구': { 
        hanokCount: 136, 
        experienceCount: 25, 
        totalArea: 24.6,
        population: 447000,
        coordinates: { lat: 37.5894, lng: 127.0167 }
      },
      '송파구': { 
        hanokCount: 0, 
        experienceCount: 2, 
        totalArea: 33.9,
        population: 667000,
        coordinates: { lat: 37.5145, lng: 127.1058 }
      },
      '양천구': { 
        hanokCount: 0, 
        experienceCount: 0, 
        totalArea: 17.4,
        population: 464000,
        coordinates: { lat: 37.5170, lng: 126.8665 }
      },
      '영등포구': { 
        hanokCount: 6, 
        experienceCount: 0, 
        totalArea: 24.5,
        population: 391000,
        coordinates: { lat: 37.5264, lng: 126.8962 }
      },
      '용산구': { 
        hanokCount: 14, 
        experienceCount: 1, 
        totalArea: 21.9,
        population: 243000,
        coordinates: { lat: 37.5384, lng: 126.9654 }
      },
      '은평구': { 
        hanokCount: 108, 
        experienceCount: 33, 
        totalArea: 29.7,
        population: 484000,
        coordinates: { lat: 37.6028, lng: 126.9292 }
      },
      '종로구': { 
        hanokCount: 1219, 
        experienceCount: 413, 
        totalArea: 23.9,
        population: 155000,
        coordinates: { lat: 37.5735, lng: 126.9788 }
      },
      '중구': { 
        hanokCount: 11, 
        experienceCount: 1, 
        totalArea: 9.9,
        population: 134000,
        coordinates: { lat: 37.5636, lng: 126.9979 }
      },
      '중랑구': { 
        hanokCount: 1, 
        experienceCount: 0, 
        totalArea: 18.5,
        population: 407000,
        coordinates: { lat: 37.6066, lng: 127.0926 }
      }
    };
    
    this.isVisible = false;
    this.currentDistrict = null;
  }

  // 통계 오버레이 토글
  toggleStats() {
    console.log('통계 버튼 클릭됨');
    const overlay = document.getElementById('statsOverlay');
    if (!overlay) {
      console.log('통계 오버레이 생성 중...');
      this.createStatsOverlay();
    } else {
      this.isVisible = !this.isVisible;
      overlay.style.display = this.isVisible ? 'block' : 'none';
      console.log('통계 오버레이 표시:', this.isVisible);
    }
  }

  // 통계 오버레이 새로고침
  refreshStats() {
    const overlay = document.getElementById('statsOverlay');
    if (overlay) {
      console.log('통계 오버레이 새로고침 중...');
      // 기존 오버레이 제거
      overlay.remove();
      // 새로 생성
      this.createStatsOverlay();
      this.isVisible = true;
    }
  }

  // 통계 오버레이 생성
  createStatsOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'statsOverlay';
    overlay.className = 'stats-overlay';
    
    overlay.innerHTML = `
      <div class="stats-header">
        <h3>📊 구별 한옥 현황 통계</h3>
        <button class="stats-close" onclick="districtStats.toggleStats()">&times;</button>
      </div>
      <div class="stats-content">
        <div class="stats-summary">
          <div class="summary-item">
            <span class="summary-label">총 한옥 수</span>
            <span class="summary-value">${this.getTotalHanokCount()}개</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">총 체험업 수</span>
            <span class="summary-value">${this.getTotalExperienceCount()}개</span>
          </div>
        </div>
        <div class="data-source">
          <small>📋 데이터 출처: 서울열린데이터광장 (2025.10.01)</small>
        </div>
        <div class="stats-list" id="statsList">
          ${this.renderDistrictList()}
        </div>
      </div>
    `;
    
    document.querySelector('.map-embed').appendChild(overlay);
    this.isVisible = true;
  }

  // 구별 리스트 렌더링
  renderDistrictList() {
    const sortedDistricts = Object.entries(this.districts)
      .sort((a, b) => b[1].hanokCount - a[1].hanokCount);
    
    return sortedDistricts.map(([name, data]) => `
      <div class="district-item" onclick="districtStats.showDistrictDetail('${name}')">
        <div class="district-name">${name}</div>
        <div class="district-stats">
          <span class="hanok-count">한옥 ${data.hanokCount}개</span>
          <span class="experience-count">체험업 ${data.experienceCount}개</span>
        </div>
        <div class="district-bar">
          <div class="bar-fill" style="width: ${(data.hanokCount / 45) * 100}%"></div>
        </div>
      </div>
    `).join('');
  }

  // 구 상세 정보 표시
  showDistrictDetail(districtName) {
    const data = this.districts[districtName];
    if (!data) return;

    const detail = document.createElement('div');
    detail.className = 'district-detail';
    detail.innerHTML = `
      <div class="detail-header">
        <h4>${districtName} 상세 정보</h4>
        <button class="detail-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
      </div>
      <div class="detail-content">
        <div class="detail-item">
          <span class="detail-label">한옥 등록 수</span>
          <span class="detail-value">${data.hanokCount}개</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">체험업 등록 수</span>
          <span class="detail-value">${data.experienceCount}개</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">구 면적</span>
          <span class="detail-value">${data.totalArea}km²</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">인구 수</span>
          <span class="detail-value">${data.population.toLocaleString()}명</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">한옥 밀도</span>
          <span class="detail-value">${(data.hanokCount / data.totalArea).toFixed(2)}개/km²</span>
        </div>
      </div>
    `;
    
    document.querySelector('.map-embed').appendChild(detail);
  }

  // 총 한옥 수 계산
  getTotalHanokCount() {
    return Object.values(this.districts).reduce((sum, district) => sum + district.hanokCount, 0);
  }

  // 총 체험업 수 계산
  getTotalExperienceCount() {
    return Object.values(this.districts).reduce((sum, district) => sum + district.experienceCount, 0);
  }
}

// 전역 인스턴스 생성
const districtStats = new DistrictStats();
