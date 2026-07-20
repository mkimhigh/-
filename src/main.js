import './styles.css';

const REPRESENTATIVE_PHONE = '02-000-0000';

const leaveDepartment = {
  name: '가상 학사지원팀',
  phone: '02-000-1001',
  email: 'academic@example.edu',
  location: '가상 행정관 1층',
  applicationUrl: 'https://example.edu/leave',
  documents: ['휴학신청서'],
};

const state = {
  view: 'input',
  query: '',
  error: '',
  result: null,
  actionNotice: '',
  isLoading: false,
};

function icon(name) {
  const paths = {
    arrow: '<path d="m9 18 6-6-6-6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    document: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 5L2 7"/>',
    map: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z"/><path d="m9 12 2 2 4-4"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 21v-5h5M3 12A9 9 0 0 1 18.5 5.8L21 8"/><path d="M21 3v5h-5"/>',
    warning: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4M12 17h.01"/>',
  };

  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
}

function shell(content) {
  return `
    <header class="site-header">
      <a class="brand" href="#" data-action="home" aria-label="캠퍼스 길잡이 처음으로">
        <span class="brand-mark" aria-hidden="true">C</span>
        <span><strong>캠퍼스 길잡이</strong><small>행정 문의 안내 프로토타입</small></span>
      </a>
      <span class="prototype-badge">가상 시연</span>
    </header>
    <main id="main-content" tabindex="-1">${content}</main>
    <footer>
      <p>부서 피드백을 위한 1-Day 프로토타입 · 입력과 결과는 저장되지 않습니다.</p>
    </footer>`;
}

function privacyNotice() {
  return `
    <div class="notice notice-neutral">
      ${icon('shield')}
      <p><strong>개인정보를 입력하지 마세요.</strong> 이름, 학생번호, 전화번호 없이 문의 내용만 작성해 주세요.</p>
    </div>`;
}

function inputView() {
  return shell(`
    <section class="hero" aria-labelledby="page-title">
      <p class="eyebrow">대표번호를 거치지 않는 첫걸음</p>
      <h1 id="page-title">내 문의는 어디에<br /><span>물어봐야 할까요?</span></h1>
      <p class="hero-copy">학교 행정 문의를 문장으로 입력하면 담당 부서와 연락처, 준비할 정보를 한 번에 안내해 드립니다.</p>
    </section>

    <section class="search-card" aria-labelledby="search-title">
      <div class="card-heading">
        <span class="step-number">01</span>
        <div>
          <h2 id="search-title">문의 내용을 알려주세요</h2>
          <p>현재 프로토타입은 휴학 문의 1종만 예시로 지원합니다.</p>
        </div>
      </div>

      <form id="inquiry-form" novalidate>
        <label for="inquiry">학교 행정 문의 <span aria-hidden="true">*</span></label>
        <textarea id="inquiry" name="inquiry" rows="5" aria-describedby="inquiry-help inquiry-error" aria-invalid="${Boolean(state.error)}" placeholder="예: 다음 학기에 휴학하려면 어떻게 해야 하나요?">${escapeHtml(state.query)}</textarea>
        <div class="field-meta">
          <p id="inquiry-help">질문하듯 편하게 입력해 주세요.</p>
          <p class="character-count"><span id="character-count">${state.query.length}</span>/300</p>
        </div>
        <p id="inquiry-error" class="field-error" role="alert">${state.error ? `${icon('warning')} ${state.error}` : ''}</p>
        <button class="example-button" type="button" data-action="fill-example">휴학 문의 예시 입력</button>
        <button class="primary-button" type="submit" ${state.isLoading ? 'disabled' : ''}>
          ${state.isLoading ? '<span class="spinner" aria-hidden="true"></span> 결과를 찾고 있어요' : `${icon('search')} 담당 부서 찾기 ${icon('arrow')}`}
        </button>
      </form>
      ${privacyNotice()}
    </section>

    <aside class="prototype-note" aria-label="프로토타입 안내">
      ${icon('info')}
      <div><strong>가상 데이터로 동작합니다</strong><p>실제 AI나 학교 시스템을 연결하지 않은 예시 결과이며, 실제 행정 처리에는 사용할 수 없습니다.</p></div>
    </aside>`);
}

function detailItem(iconName, label, value, href = '') {
  const content = href
    ? `<a href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>${value}</a>`
    : `<p>${value}</p>`;
  return `<div class="detail-item"><span class="detail-icon">${icon(iconName)}</span><div><span>${label}</span>${content}</div></div>`;
}

function resultView() {
  const result = state.result;
  return shell(`
    <section class="result-intro" aria-labelledby="result-title">
      <p class="eyebrow">문의 분석 결과</p>
      <p class="submitted-query">“${escapeHtml(state.query)}”</p>
      <div class="result-heading">
        <span class="match-mark">${icon('check')}</span>
        <div><p>추천 담당 부서</p><h1 id="result-title" tabindex="-1">${result.name}</h1></div>
      </div>
      <p class="reason"><strong>추천 근거</strong> 입력한 문의에서 <mark>‘휴학’</mark> 관련 내용을 확인하여 학사지원팀을 추천했습니다.</p>
    </section>

    <div class="result-layout">
      <section class="department-card" aria-labelledby="contact-title">
        <div class="section-heading"><span class="step-number">02</span><div><h2 id="contact-title">담당 부서 정보</h2><p>문의 전 아래 정보를 확인해 주세요.</p></div></div>
        <div class="detail-grid">
          ${detailItem('phone', '전화번호', result.phone, `tel:${result.phone}`)}
          ${detailItem('mail', '이메일', result.email, `mailto:${result.email}`)}
          ${detailItem('map', '위치', result.location)}
          ${detailItem('document', '필요 서류', result.documents.join(', '))}
        </div>
        <div class="action-area">
          <a class="primary-button" href="${result.applicationUrl}" target="_blank" rel="noreferrer" data-action="application-link">신청 페이지로 이동 ${icon('arrow')}</a>
          <p>가상 링크이며 실제 신청은 진행되지 않습니다.</p>
          <div id="action-notice" class="action-notice" role="status">${state.actionNotice}</div>
        </div>
      </section>

      <aside class="check-card" aria-labelledby="check-title">
        <p class="eyebrow">사람이 확인할 항목</p>
        <h2 id="check-title">추천 결과가 문의와 맞는지 확인해 주세요</h2>
        <ul>
          <li>${icon('check')} 담당 부서가 문의 목적과 일치하는지</li>
          <li>${icon('check')} 연락처와 위치가 적절한지</li>
          <li>${icon('check')} 신청 링크와 필요 서류가 절차와 맞는지</li>
        </ul>
        <div class="official-reminder">${icon('info')}<p>실제 문의 전 학교 공식 홈페이지에서 최신 정보를 다시 확인해 주세요.</p></div>
      </aside>
    </div>

    <div class="result-actions">
      <button class="secondary-button" type="button" data-action="edit-query">${icon('refresh')} 다른 문의 입력하기</button>
    </div>

    <div class="notice notice-warning result-disclaimer">
      ${icon('warning')}
      <p><strong>가상 데이터 기반 프로토타입 결과입니다.</strong> 실제 AI 또는 학교 시스템과 연결되지 않았으며 실제 행정 처리에 사용할 수 없습니다.</p>
    </div>`);
}

function emptyResultView(type) {
  const isError = type === 'error';
  const title = isError ? '결과를 생성하지 못했습니다' : '담당 부서를 찾지 못했습니다';
  const description = isError
    ? '잠시 후 다시 시도하거나 가상 대표번호로 문의해 주세요.'
    : '입력한 문의와 일치하는 가상 담당 부서 정보가 아직 없습니다.';
  const action = isError ? '다시 시도' : '문의 다시 입력하기';
  const actionContent = isError && state.isLoading
    ? '<span class="spinner" aria-hidden="true"></span> 다시 시도 중'
    : `${icon(isError ? 'refresh' : 'arrow')} ${action}`;

  return shell(`
    <section class="empty-state" aria-labelledby="empty-title">
      <span class="empty-icon">${icon(isError ? 'warning' : 'search')}</span>
      <p class="eyebrow">${isError ? '일시적인 오류' : '검색 결과 없음'}</p>
      <h1 id="empty-title" tabindex="-1">${title}</h1>
      <p>${description}</p>
      <div class="representative-card">
        <span>가상 대표번호</span>
        <a href="tel:${REPRESENTATIVE_PHONE}">${icon('phone')} ${REPRESENTATIVE_PHONE}</a>
      </div>
      <button class="primary-button compact" type="button" data-action="${isError ? 'retry' : 'edit-query'}" ${state.isLoading ? 'disabled' : ''}>${actionContent}</button>
      ${isError ? '<button class="text-button" type="button" data-action="edit-query">문의 내용 수정하기</button>' : ''}
    </section>
    <div class="notice notice-warning result-disclaimer">
      ${icon('warning')}
      <p><strong>가상 데이터 기반 프로토타입 안내입니다.</strong> 대표번호와 모든 결과는 실제 학교와 무관한 예시입니다.</p>
    </div>`);
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character]);
}

function getDepartment(query) {
  if (query.includes('오류 테스트')) {
    throw new Error('Prototype result generation failed');
  }
  return /휴학/.test(query) ? leaveDepartment : null;
}

function render() {
  const app = document.querySelector('#app');
  if (state.view === 'result') app.innerHTML = resultView();
  else if (state.view === 'not-found') app.innerHTML = emptyResultView('not-found');
  else if (state.view === 'error') app.innerHTML = emptyResultView('error');
  else app.innerHTML = inputView();
  bindEvents();
}

function returnToInput({ clearError = true } = {}) {
  state.view = 'input';
  state.result = null;
  state.actionNotice = '';
  if (clearError) state.error = '';
  render();
  requestAnimationFrame(() => document.querySelector('#inquiry')?.focus());
}

async function submitInquiry(queryOverride = null) {
  const input = document.querySelector('#inquiry');
  const nextQuery = queryOverride ?? input?.value ?? state.query;
  state.query = nextQuery.slice(0, 300).trim();
  if (!state.query) {
    state.error = '문의 내용을 입력해 주세요.';
    render();
    requestAnimationFrame(() => document.querySelector('#inquiry')?.focus());
    return;
  }

  state.error = '';
  state.isLoading = true;
  render();

  await new Promise((resolve) => window.setTimeout(resolve, 450));
  try {
    state.result = getDepartment(state.query);
    state.view = state.result ? 'result' : 'not-found';
  } catch (error) {
    console.error(error);
    state.view = 'error';
  } finally {
    state.isLoading = false;
    render();
    requestAnimationFrame(() => document.querySelector('h1')?.focus?.());
  }
}

function bindEvents() {
  document.querySelector('#inquiry-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    submitInquiry();
  });

  const inquiry = document.querySelector('#inquiry');
  inquiry?.addEventListener('input', (event) => {
    const value = event.target.value.slice(0, 300);
    event.target.value = value;
    state.query = value;
    document.querySelector('#character-count').textContent = value.length;
    if (state.error) {
      state.error = '';
      event.target.setAttribute('aria-invalid', 'false');
      document.querySelector('#inquiry-error').textContent = '';
    }
  });

  document.querySelectorAll('[data-action]').forEach((element) => {
    element.addEventListener('click', (event) => {
      const action = element.dataset.action;
      if (action === 'home') {
        event.preventDefault();
        state.query = '';
        returnToInput();
      }
      if (action === 'fill-example') {
        state.query = '다음 학기에 휴학하려면 어떻게 해야 하나요?';
        render();
        requestAnimationFrame(() => document.querySelector('#inquiry')?.focus());
      }
      if (action === 'edit-query') returnToInput();
      if (action === 'retry') submitInquiry(state.query);
      if (action === 'application-link') {
        event.preventDefault();
        state.actionNotice = '가상 신청 페이지로 이동합니다. 실제 신청은 진행되지 않습니다.';
        const notice = document.querySelector('#action-notice');
        if (notice) notice.textContent = state.actionNotice;
      }
    });
  });
}

render();
