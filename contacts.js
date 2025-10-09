// 한옥 담당 부서 연락처 관리 시스템
class HanokContacts {
  constructor() {
    this.contacts = [
      {
        department: "서울특별시 주택실 한옥건축자산과",
        phone: "02-2133-5577",
        area: "서울시 전체",
        description: "한옥 정책 및 자산 관리"
      },
      {
        department: "서울특별시 종로구 건축과",
        phone: "02-2148-2792~2794",
        area: "종로구",
        description: "종로구 한옥 관련 업무"
      },
      {
        department: "서울특별시 중구 건축과",
        phone: "02-3396-5000",
        area: "중구",
        description: "중구 한옥 관련 업무"
      },
      {
        department: "서울특별시 용산구 건축과",
        phone: "02-2199-7000",
        area: "용산구",
        description: "용산구 한옥 관련 업무"
      },
      {
        department: "서울특별시 성동구 건축과",
        phone: "02-2286-5000",
        area: "성동구",
        description: "성동구 한옥 관련 업무"
      },
      {
        department: "서울특별시 광진구 건축과",
        phone: "02-450-7000",
        area: "광진구",
        description: "광진구 한옥 관련 업무"
      },
      {
        department: "서울특별시 동대문구 건축과",
        phone: "02-2127-4000",
        area: "동대문구",
        description: "동대문구 한옥 관련 업무"
      },
      {
        department: "서울특별시 중랑구 건축과",
        phone: "02-2094-0000",
        area: "중랑구",
        description: "중랑구 한옥 관련 업무"
      },
      {
        department: "서울특별시 성북구 건축과",
        phone: "02-2241-2000",
        area: "성북구",
        description: "성북구 한옥 관련 업무"
      },
      {
        department: "서울특별시 강북구 건축과",
        phone: "02-901-5000",
        area: "강북구",
        description: "강북구 한옥 관련 업무"
      },
      {
        department: "서울특별시 도봉구 건축과",
        phone: "02-2091-4000",
        area: "도봉구",
        description: "도봉구 한옥 관련 업무"
      },
      {
        department: "서울특별시 노원구 건축과",
        phone: "02-2116-4000",
        area: "노원구",
        description: "노원구 한옥 관련 업무"
      },
      {
        department: "서울특별시 은평구 건축과",
        phone: "02-351-6000",
        area: "은평구",
        description: "은평구 한옥 관련 업무"
      },
      {
        department: "서울특별시 서대문구 건축과",
        phone: "02-330-1000",
        area: "서대문구",
        description: "서대문구 한옥 관련 업무"
      },
      {
        department: "서울특별시 마포구 건축과",
        phone: "02-3153-8000",
        area: "마포구",
        description: "마포구 한옥 관련 업무"
      },
      {
        department: "서울특별시 양천구 건축과",
        phone: "02-2620-2000",
        area: "양천구",
        description: "양천구 한옥 관련 업무"
      },
      {
        department: "서울특별시 강서구 건축과",
        phone: "02-2600-5000",
        area: "강서구",
        description: "강서구 한옥 관련 업무"
      },
      {
        department: "서울특별시 구로구 건축과",
        phone: "02-860-2000",
        area: "구로구",
        description: "구로구 한옥 관련 업무"
      },
      {
        department: "서울특별시 금천구 건축과",
        phone: "02-2627-2000",
        area: "금천구",
        description: "금천구 한옥 관련 업무"
      },
      {
        department: "서울특별시 영등포구 건축과",
        phone: "02-2670-3000",
        area: "영등포구",
        description: "영등포구 한옥 관련 업무"
      },
      {
        department: "서울특별시 동작구 건축과",
        phone: "02-820-1000",
        area: "동작구",
        description: "동작구 한옥 관련 업무"
      },
      {
        department: "서울특별시 관악구 건축과",
        phone: "02-879-6000",
        area: "관악구",
        description: "관악구 한옥 관련 업무"
      },
      {
        department: "서울특별시 서초구 건축과",
        phone: "02-2155-6000",
        area: "서초구",
        description: "서초구 한옥 관련 업무"
      },
      {
        department: "서울특별시 강남구 건축과",
        phone: "02-3423-5000",
        area: "강남구",
        description: "강남구 한옥 관련 업무"
      },
      {
        department: "서울특별시 송파구 건축과",
        phone: "02-2147-2000",
        area: "송파구",
        description: "송파구 한옥 관련 업무"
      },
      {
        department: "서울특별시 강동구 건축과",
        phone: "02-3425-6000",
        area: "강동구",
        description: "강동구 한옥 관련 업무"
      }
    ];
    
    this.init();
  }

  init() {
    console.log('📞 한옥 담당 부서 연락처 시스템 초기화 완료');
  }

  // 연락처 모달 표시 (스크롤 방지)
  showContacts() {
    const content = `
      <div style="max-width: 600px; padding: 20px; font-family: Arial, sans-serif;">
        <h3 style="margin: 0 0 20px 0; color: #2c3e50; border-bottom: 2px solid #007bff; padding-bottom: 10px;">🏛️ 한옥 담당 부서 연락처</h3>
        
        <div style="max-height: 400px; overflow-y: auto; margin-bottom: 20px;">
          ${this.contacts.map(contact => `
            <div style="border: 1px solid #e9ecef; border-radius: 8px; padding: 15px; margin-bottom: 10px; background: #f8f9fa;">
              <div style="font-weight: bold; color: #2c3e50; margin-bottom: 8px;">${contact.department}</div>
              <div style="color: #6c757d; margin-bottom: 5px;">📍 ${contact.area}</div>
              <div style="color: #495057; margin-bottom: 8px; font-size: 14px;">${contact.description}</div>
              <a href="tel:${contact.phone}" style="color: #007bff; text-decoration: none; font-weight: bold;">📞 ${contact.phone}</a>
            </div>
          `).join('')}
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <button onclick="hanokContacts.exportContacts()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-right: 10px;">연락처 내보내기</button>
        </div>
      </div>
    `;
    
    // 공통 모달 함수 사용 (스크롤 방지)
    if (typeof showModal === 'function') {
      showModal('한옥 담당 부서 연락처', content);
    } else {
      // fallback: 기존 방식
      const modal = document.getElementById('contactsModal');
      const contactsList = document.getElementById('contactsList');
      
      contactsList.innerHTML = this.contacts.map(contact => `
        <div class="contact-item">
          <div class="contact-department">${contact.department}</div>
          <div class="contact-info">
            <div class="contact-area">📍 ${contact.area}</div>
            <div class="contact-description">${contact.description}</div>
            <a href="tel:${contact.phone}" class="contact-phone">📞 ${contact.phone}</a>
          </div>
        </div>
      `).join('');

      modal.style.display = 'block';
    }

    console.log('📞 연락처 모달 표시됨');
  }

  // 연락처 모달 숨기기
  hideContacts() {
    const modal = document.getElementById('contactsModal');
    modal.style.display = 'none';
    console.log('📞 연락처 모달 숨김');
  }

  // 연락처 내보내기
  exportContacts() {
    const data = {
      title: '한옥 담당 부서 연락처',
      exportDate: new Date().toISOString(),
      contacts: this.contacts
    };

    // CSV 형태로 내보내기 (UTF-8 BOM 추가)
    const csvContent = '\uFEFF' + this.convertToCSV(data.contacts);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `한옥_담당부서_연락처_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    console.log('📞 연락처 내보내기 완료');
  }

  // CSV 변환
  convertToCSV(contacts) {
    const headers = ['부서명', '전화번호', '담당구역', '업무내용'];
    const csvRows = [headers.join(',')];
    
    contacts.forEach(contact => {
      const row = [
        `"${contact.department}"`,
        `"${contact.phone}"`,
        `"${contact.area}"`,
        `"${contact.description}"`
      ];
      csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
  }

  // 연락처 검색
  searchContacts(query) {
    const filtered = this.contacts.filter(contact => 
      contact.department.toLowerCase().includes(query.toLowerCase()) ||
      contact.area.toLowerCase().includes(query.toLowerCase()) ||
      contact.description.toLowerCase().includes(query.toLowerCase())
    );
    
    return filtered;
  }

  // 연락처 추가 (관리자용)
  addContact(contact) {
    this.contacts.push(contact);
    console.log('📞 새 연락처 추가됨:', contact.department);
  }

  // 연락처 업데이트 (관리자용)
  updateContact(index, updatedContact) {
    if (index >= 0 && index < this.contacts.length) {
      this.contacts[index] = updatedContact;
      console.log('📞 연락처 업데이트됨:', updatedContact.department);
    }
  }

  // 연락처 삭제 (관리자용)
  removeContact(index) {
    if (index >= 0 && index < this.contacts.length) {
      const removed = this.contacts.splice(index, 1)[0];
      console.log('📞 연락처 삭제됨:', removed.department);
    }
  }

  // 통계 정보
  getStats() {
    return {
      totalContacts: this.contacts.length,
      areas: [...new Set(this.contacts.map(c => c.area))],
      lastUpdated: new Date().toISOString()
    };
  }
}

// 전역 인스턴스 생성
window.hanokContacts = new HanokContacts();
