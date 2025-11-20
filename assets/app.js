const state = {
  rows: [],
  columns: [],
  numericColumns: [],
  chart: null,
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const elements = {
  dropzone: document.getElementById('dropzone'),
  fileInput: document.getElementById('file-input'),
  metrics: document.getElementById('metrics'),
  fileName: document.getElementById('file-name'),
  rowCount: document.getElementById('row-count'),
  table: document.getElementById('data-table'),
  columnSelect: document.getElementById('column-select'),
  demoButton: document.getElementById('demo-button'),
  chartCanvas: document.getElementById('chart'),
};

const isNumeric = (value) => {
  if (value === null || value === undefined || value === '') return false;
  const parsed = Number(value);
  return !Number.isNaN(parsed) && Number.isFinite(parsed);
};

const updateMetrics = () => {
  const rows = state.rows;
  const columns = state.columns;
  const numericColumns = state.numericColumns;

  const missingCells = rows.reduce((acc, row) => {
    return acc + columns.reduce((count, key) => {
      const value = row[key];
      return count + (value === null || value === undefined || value === '' ? 1 : 0);
    }, 0);
  }, 0);

  const metricItems = [
    { label: '총 행', value: rows.length.toLocaleString() },
    { label: '총 컬럼', value: columns.length.toLocaleString() },
    { label: '숫자 컬럼', value: numericColumns.length, pill: numericColumns.join(', ') || '없음' },
    { label: '결측값', value: missingCells.toLocaleString() },
  ];

  elements.metrics.innerHTML = metricItems.map((item) => `
    <div class="metric">
      <span class="metric__label">${item.label}</span>
      <span class="metric__value">${item.value}</span>
      ${item.pill ? `<span class="metric__pill">${item.pill}</span>` : ''}
    </div>
  `).join('');
};

const renderTable = () => {
  const rows = state.rows;
  const columns = state.columns;
  const preview = rows.slice(0, 15);

  if (!columns.length) {
    elements.table.innerHTML = '<tr><td>표시할 컬럼이 없습니다.</td></tr>';
    elements.rowCount.textContent = '0 행';
    return;
  }

  const header = `<tr>${columns.map((col) => `<th>${col}</th>`).join('')}</tr>`;
  const body = preview.map((row) => {
    return `<tr>${columns.map((col) => `<td>${row[col] ?? ''}</td>`).join('')}</tr>`;
  }).join('');

  elements.table.innerHTML = header + body;
  elements.rowCount.textContent = `${rows.length.toLocaleString()} 행`;
};

const renderSelect = () => {
  elements.columnSelect.innerHTML = state.numericColumns.length
    ? state.numericColumns.map((col) => `<option value="${col}">${col}</option>`).join('')
    : '<option>숫자 컬럼 없음</option>';
  elements.columnSelect.disabled = state.numericColumns.length === 0;
};

const renderChart = (column) => {
  if (!column || !state.rows.length) {
    if (state.chart) state.chart.destroy();
    return;
  }

  const values = state.rows
    .map((row) => Number(row[column]))
    .filter((val) => !Number.isNaN(val));

  const labels = values.map((_, idx) => `${idx + 1}`);

  if (state.chart) state.chart.destroy();

  const ctx = elements.chartCanvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, 'rgba(90, 200, 250, 0.8)');
  gradient.addColorStop(1, 'rgba(90, 200, 250, 0.1)');

  state.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: column,
        data: values,
        fill: true,
        tension: 0.35,
        backgroundColor: gradient,
        borderColor: '#5ac8fa',
        pointRadius: 2.5,
      }],
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (ctx) => `${column}: ${ctx.formattedValue}` } },
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.06)' } },
        y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { precision: 0 } },
      },
    },
  });
};

const analyzeData = (rows) => {
  state.rows = rows;
  state.columns = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row).forEach((key) => set.add(key));
      return set;
    }, new Set())
  );

  state.numericColumns = state.columns.filter((col) => {
    const validValues = rows
      .map((row) => row[col])
      .filter((value) => value !== null && value !== undefined && value !== '');
    return validValues.length && validValues.every((value) => isNumeric(value));
  });

  updateMetrics();
  renderTable();
  renderSelect();
  renderChart(state.numericColumns[0]);
};

const parseFile = async (file) => {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    throw new Error('워크북에 시트가 없습니다.');
  }

  const sheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

  if (!rows.length) {
    throw new Error('시트에 데이터가 없습니다.');
  }

  analyzeData(rows);
};

const useDemoData = () => {
  const rows = [
    { 월: '1월', 매출: 1240000, 방문자: 3200, 전환율: 2.8 },
    { 월: '2월', 매출: 1390000, 방문자: 3500, 전환율: 3.1 },
    { 월: '3월', 매출: 1580000, 방문자: 3800, 전환율: 3.4 },
    { 월: '4월', 매출: 1710000, 방문자: 4100, 전환율: 3.6 },
    { 월: '5월', 매출: 1650000, 방문자: 3980, 전환율: 3.5 },
    { 월: '6월', 매출: 1820000, 방문자: 4220, 전환율: 3.8 },
  ];
  elements.fileName.textContent = '데모 데이터';
  analyzeData(rows);
};

const handleFile = (file) => {
  if (!file) return;

  if (file.size > MAX_FILE_SIZE) {
    alert('파일 크기가 5MB를 초과합니다. 더 작은 파일을 업로드해 주세요.');
    return;
  }

  elements.fileName.textContent = file.name;
  parseFile(file).catch((err) => {
    console.error(err);
    alert(err?.message || '파일을 읽는 중 문제가 발생했어요. 파일을 확인해 주세요.');
  });
};

const setupDropzone = () => {
  ['dragenter', 'dragover'].forEach((event) => {
    elements.dropzone.addEventListener(event, (e) => {
      e.preventDefault();
      elements.dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach((event) => {
    elements.dropzone.addEventListener(event, (e) => {
      e.preventDefault();
      elements.dropzone.classList.remove('dragover');
    });
  });

  elements.dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  });

  elements.dropzone.addEventListener('click', () => elements.fileInput.click());

  elements.dropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      elements.fileInput.click();
    }
  });
};

const init = () => {
  setupDropzone();

  elements.fileInput.addEventListener('change', (e) => {
    handleFile(e.target.files[0]);
  });

  elements.columnSelect.addEventListener('change', (e) => {
    renderChart(e.target.value);
  });

  elements.demoButton.addEventListener('click', useDemoData);
};

init();
