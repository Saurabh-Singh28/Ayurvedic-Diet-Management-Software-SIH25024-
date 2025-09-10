// Simple SPA Router and Views for Ayurvedic Diet Management Prototype

(function () {
  const appRoot = document.getElementById('app-root');

  // Mobile nav toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ------- Components / Views -------
  function SummaryCard({ title, value, icon }) {
    return `
      <div class="bg-white rounded-lg shadow p-5 flex items-center gap-4">
        <div class="w-10 h-10 rounded bg-accent/40 flex items-center justify-center text-primary">${icon || '★'}</div>
        <div>
          <div class="text-sm text-gray-500">${title}</div>
          <div class="text-2xl font-semibold text-gray-900">${value}</div>
        </div>
      </div>
    `;
  }

  function DashboardView() {
    const metrics = window.AppMetrics;
    const html = `
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div class="flex gap-2">
          <a href="${window.Routes.dietCreate}" class="px-4 py-2 rounded bg-primary text-white text-sm">New Diet Chart</a>
          <a href="${window.Routes.foodSearch}" class="px-4 py-2 rounded bg-accent text-primary text-sm">Food Search</a>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${SummaryCard({ title: 'Total Patients', value: metrics.totalPatients, icon: '👤' })}
        ${SummaryCard({ title: 'Diet Charts Created', value: metrics.totalDiets, icon: '📄' })}
        ${SummaryCard({ title: 'Active Diets', value: metrics.activeDiets, icon: '✅' })}
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="font-semibold">Nutrient vs Ayurvedic Balance</h2>
          </div>
          <canvas id="chart-nutrient"></canvas>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="font-semibold">Weekly Compliance Trend</h2>
          </div>
          <canvas id="chart-compliance"></canvas>
        </div>
      </div>
    `;
    appRoot.innerHTML = html;

    // Charts
    const nutrientCtx = document.getElementById('chart-nutrient');
    new Chart(nutrientCtx, {
      type: 'bar',
      data: {
        labels: ['Protein', 'Carbs', 'Fats', 'Fiber', 'Hydration'],
        datasets: [
          {
            label: 'Nutrient %',
            data: [25, 45, 20, 7, 3],
            backgroundColor: 'rgba(45, 106, 79, 0.6)',
          },
          {
            label: 'Ayurvedic Balance %',
            data: [30, 40, 15, 10, 5],
            backgroundColor: 'rgba(149, 213, 178, 0.7)',
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, aspectRatio: 2 },
    });

    const complianceCtx = document.getElementById('chart-compliance');
    new Chart(complianceCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Compliance %',
            data: [70, 75, 60, 80, 85, 90, 88],
            borderColor: '#2d6a4f',
            backgroundColor: 'rgba(45,106,79,0.1)',
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, aspectRatio: 2 },
    });
  }

  function PatientsView() {
    const patients = window.AppState.patients;
    const rows = patients
      .map(
        (p) => `
      <tr class="border-b hover:bg-bg-soft">
        <td class="px-3 py-2">${p.name}</td>
        <td class="px-3 py-2">${p.age}</td>
        <td class="px-3 py-2">${p.gender}</td>
        <td class="px-3 py-2">${p.dosha}</td>
        <td class="px-3 py-2 text-right">
          <a href="${window.Routes.patientProfile(p.id)}" class="text-primary hover:underline">View</a>
          <a href="${window.Routes.dailyView(p.id)}" class="ml-3 text-primary hover:underline">Daily View</a>
        </td>
      </tr>`
      )
      .join('');
    appRoot.innerHTML = `
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold text-gray-900">Patients</h1>
        <a href="${window.Routes.dietCreate}" class="px-4 py-2 rounded bg-primary text-white text-sm">Create Diet</a>
      </div>
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-bg-soft text-gray-600">
            <tr>
              <th class="text-left px-3 py-2">Name</th>
              <th class="text-left px-3 py-2">Age</th>
              <th class="text-left px-3 py-2">Gender</th>
              <th class="text-left px-3 py-2">Dosha</th>
              <th class="text-right px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }

  function PatientProfileView(patientId) {
    const patient = window.AppState.patients.find((p) => p.id === patientId);
    if (!patient) {
      appRoot.innerHTML = '<div class="text-red-600">Patient not found.</div>';
      return;
    }
    const diets = window.AppState.diets.filter((d) => d.patientId === patientId);
    const dietItems = diets
      .map(
        (d) => `<li class="flex items-center justify-between py-2 border-b last:border-none">
          <span class="text-sm">#${d.id} • ${d.date} • ${d.active ? 'Active' : 'Inactive'}</span>
          <a href="#" class="text-primary text-sm">Open</a>
        </li>`
      )
      .join('');

    appRoot.innerHTML = `
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold text-gray-900">Patient Profile</h1>
        <a href="${window.Routes.dietCreate}" class="px-4 py-2 rounded bg-primary text-white text-sm">Create Diet</a>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white rounded-lg shadow p-5">
          <h2 class="font-semibold mb-4">${patient.name}</h2>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm">
            <div><span class="text-gray-500">Age</span><div class="font-medium">${patient.age}</div></div>
            <div><span class="text-gray-500">Gender</span><div class="font-medium">${patient.gender}</div></div>
            <div><span class="text-gray-500">Dosha</span><div class="font-medium">${patient.dosha}</div></div>
            <div><span class="text-gray-500">Consent</span><div class="font-medium">${patient.consent ? 'Granted' : 'Pending'}</div></div>
          </div>
          <div class="mb-4 text-sm">
            <div class="text-gray-500">Health Notes</div>
            <div class="bg-bg-soft rounded p-3">${patient.notes}</div>
          </div>
          <div class="bg-bg-soft rounded p-4">
            <h3 class="font-medium mb-2">Ayurvedic Balance (Radar)</h3>
            <canvas id="chart-patient-radar"></canvas>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold">Consent</h3>
            <label class="inline-flex items-center cursor-pointer">
              <input id="consent-toggle" type="checkbox" class="sr-only peer" ${patient.consent ? 'checked' : ''} />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:ml-0.5 after:mt-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all relative peer-checked:bg-primary"></div>
            </label>
          </div>
          <p class="text-sm text-gray-600">Toggle to simulate consent capture for demo.</p>
          <hr class="my-4" />
          <h3 class="font-semibold mb-2">Past Diet Charts</h3>
          <ul>${dietItems || '<li class="text-sm text-gray-500">No diet charts yet.</li>'}</ul>
        </div>
      </div>
    `;

    // Consent toggle behavior
    const toggle = document.getElementById('consent-toggle');
    if (toggle) {
      toggle.addEventListener('change', (e) => {
        patient.consent = e.target.checked;
        // Update consent label without rerender
        const consentDiv = appRoot.querySelectorAll('.grid div div.font-medium')[3];
        if (consentDiv) consentDiv.textContent = patient.consent ? 'Granted' : 'Pending';
      });
    }

    const radarCtx = document.getElementById('chart-patient-radar');
    new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['Nutrition', 'Dosha', 'Digestion', 'Energy'],
        datasets: [
          {
            label: 'Balance',
            data: [65, 50, 60, 70],
            backgroundColor: 'rgba(149, 213, 178, 0.3)',
            borderColor: '#2d6a4f',
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, aspectRatio: 1.6 },
    });
  }

  function FoodSearchView() {
    const foods = window.AppState.foods;
    appRoot.innerHTML = `
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold text-gray-900">Food Search</h1>
        <a href="${window.Routes.dietCreate}" class="px-4 py-2 rounded bg-primary text-white text-sm">Add to Diet</a>
      </div>
      <div class="bg-white rounded-lg shadow p-5">
        <div class="mb-4">
          <input id="food-search" type="text" placeholder="Search foods..." class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div id="food-list" class="divide-y"></div>
      </div>
    `;

    const listEl = document.getElementById('food-list');
    const inputEl = document.getElementById('food-search');

    function renderList(items) {
      listEl.innerHTML = items
        .map(
          (f) => `
          <div class="py-3 flex items-start justify-between">
            <div>
              <div class="font-medium">${f.name}</div>
              <div class="text-xs text-gray-600">Calories: ${f.calories} • Protein: ${f.protein}g</div>
              <div class="text-xs text-gray-600">Thermal: ${f.ayurveda.thermal} • Rasa: ${f.ayurveda.rasa} • Digestibility: ${f.ayurveda.digestibility}</div>
            </div>
            <button data-food-id="${f.id}" class="px-3 py-1 rounded bg-accent text-primary text-sm add-to-meal">Add to meal</button>
          </div>`
        )
        .join('');

      listEl.querySelectorAll('.add-to-meal').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-food-id');
          const food = window.AppState.foods.find((x) => x.id === id);
          alert(`Added ${food.name} to current meal (demo)`);
        });
      });
    }

    renderList(foods);

    inputEl.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = foods.filter(
        (f) => f.name.toLowerCase().includes(q) || f.ayurveda.rasa.toLowerCase().includes(q)
      );
      renderList(filtered);
    });
  }

  function DietCreateView() {
    appRoot.innerHTML = `
      <h1 class="text-2xl font-semibold text-gray-900 mb-4">Create Diet Chart</h1>
      <div class="bg-white rounded-lg shadow p-5">
        <ol class="flex items-center w-full mb-6 text-sm text-gray-500">
          <li class="flex items-center text-primary"><span class="w-6 h-6 mr-2 rounded-full bg-accent text-primary flex items-center justify-center">1</span>Select Patient</li>
          <li class="flex items-center before:w-8 before:h-[2px] before:bg-gray-200 before:mx-3"><span class="w-6 h-6 mr-2 rounded-full bg-gray-200 flex items-center justify-center">2</span>Add Meals</li>
          <li class="flex items-center before:w-8 before:h-[2px] before:bg-gray-200 before:mx-3"><span class="w-6 h-6 mr-2 rounded-full bg-gray-200 flex items-center justify-center">3</span>Review</li>
        </ol>

        <div id="step-1" class="space-y-4">
          <label class="block text-sm">Patient</label>
          <select id="dc-patient" class="w-full border rounded px-3 py-2">
            <option value="">Select a patient</option>
            ${window.AppState.patients.map((p) => `<option value="${p.id}">${p.name}</option>`).join('')}
          </select>
          <button id="go-step-2" class="px-4 py-2 rounded bg-primary text-white text-sm">Next</button>
        </div>

        <div id="step-2" class="space-y-4 hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <table class="w-full text-sm border">
                <thead class="bg-bg-soft">
                  <tr><th class="px-2 py-2 text-left">Meal</th><th class="px-2 py-2 text-left">Items</th></tr>
                </thead>
                <tbody>
                  ${['Breakfast','Lunch','Dinner','Snacks'].map((m)=>`<tr><td class="px-2 py-2 font-medium">${m}</td><td class="px-2 py-2"><input data-meal="${m}" type="text" placeholder="Add items, comma separated" class="w-full border rounded px-2 py-1" /></td></tr>`).join('')}
                </tbody>
              </table>
              <button id="go-step-3" class="mt-4 px-4 py-2 rounded bg-primary text-white text-sm">Review</button>
            </div>
            <div class="bg-bg-soft rounded p-4">
              <h3 class="font-medium mb-2">Nutrient Breakdown</h3>
              <canvas id="chart-dc-nutrient"></canvas>
              <div class="mt-4">
                <div class="text-sm mb-1">Ayurvedic Balance</div>
                <div class="w-full bg-gray-200 h-2 rounded">
                  <div id="balance-bar" class="bg-primary h-2 rounded" style="width: 62%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="step-3" class="space-y-4 hidden">
          <div id="review-block" class="text-sm"></div>
          <div class="flex gap-2">
            <button id="submit-diet" class="px-4 py-2 rounded bg-primary text-white text-sm">Save (demo)</button>
            <button id="export-pdf" class="px-4 py-2 rounded bg-accent text-primary text-sm">Export PDF (dummy)</button>
          </div>
        </div>
      </div>
    `;

    let selectedPatientId = '';
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const patientSelect = document.getElementById('dc-patient');

    document.getElementById('go-step-2').addEventListener('click', () => {
      selectedPatientId = patientSelect.value;
      if (!selectedPatientId) {
        alert('Please select a patient');
        return;
      }
      step1.classList.add('hidden');
      step2.classList.remove('hidden');

      const dcCtx = document.getElementById('chart-dc-nutrient');
      new Chart(dcCtx, {
        type: 'doughnut',
        data: {
          labels: ['Protein', 'Carbs', 'Fats'],
          datasets: [{ data: [30, 50, 20], backgroundColor: ['#2d6a4f', '#95d5b2', '#c1f1dc'] }],
        },
        options: { responsive: true },
      });
    });

    document.getElementById('go-step-3').addEventListener('click', () => {
      const inputs = step2.querySelectorAll('input[data-meal]');
      const meals = {};
      inputs.forEach((inp) => {
        const key = inp.getAttribute('data-meal');
        meals[key] = inp.value
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      });
      step2.classList.add('hidden');
      step3.classList.remove('hidden');
      const patient = window.AppState.patients.find((p) => p.id === selectedPatientId);
      document.getElementById('review-block').innerHTML = `
        <div class="font-medium">Patient: ${patient.name}</div>
        <pre class="bg-bg-soft rounded p-3 mt-2">${JSON.stringify(meals, null, 2)}</pre>
      `;
      document.getElementById('submit-diet').onclick = () => {
        window.AppState.diets.push({ id: 'd' + String(Date.now()), patientId: selectedPatientId, date: new Date().toISOString().slice(0,10), meals, active: true });
        alert('Diet saved (demo only).');
        location.hash = window.Routes.dashboard;
      };
      document.getElementById('export-pdf').onclick = () => {
        alert('PDF export is a dummy action in this prototype.');
      };
    });
  }

  function DailyView(patientId) {
    const patient = window.AppState.patients.find((p) => p.id === patientId);
    if (!patient) {
      appRoot.innerHTML = '<div class="text-red-600">Patient not found.</div>';
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    const diet = window.AppState.diets.find((d) => d.patientId === patientId && d.date === today) || window.AppState.diets.find((d) => d.patientId === patientId);
    const meals = diet?.meals || { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] };
    appRoot.innerHTML = `
      <div class="mb-4">
        <h1 class="text-2xl font-semibold text-gray-900">Today's Diet • ${patient.name}</h1>
        <div class="text-sm text-gray-600">${today}</div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-3">
          ${Object.keys(meals)
            .map(
              (m) => `
              <div class="bg-white rounded-lg shadow p-4">
                <div class="font-medium mb-2">${m}</div>
                <ul class="list-disc ml-5 text-sm">${(meals[m] || [])
                  .map((i) => `<li>${i}</li>`) 
                  .join('') || '<li class="text-gray-500">No items</li>'}</ul>
              </div>`
            )
            .join('')}
        </div>
        <div class="space-y-4">
          <div class="bg-white rounded-lg shadow p-4">
            <div class="font-medium mb-2">Nutrient Breakdown</div>
            <canvas id="chart-daily"></canvas>
          </div>
          <div class="bg-white rounded-lg shadow p-4">
            <div class="font-medium mb-2">Ayurvedic Balance</div>
            <canvas id="chart-wheel"></canvas>
          </div>
        </div>
      </div>
    `;

    new Chart(document.getElementById('chart-daily'), {
      type: 'bar',
      data: {
        labels: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
        datasets: [{ label: 'Calories', data: [250, 600, 500, 150], backgroundColor: '#95d5b2' }],
      },
      options: { responsive: true, maintainAspectRatio: false, aspectRatio: 2 },
    });

    new Chart(document.getElementById('chart-wheel'), {
      type: 'polarArea',
      data: {
        labels: ['Vata', 'Pitta', 'Kapha'],
        datasets: [{ data: [40, 35, 25], backgroundColor: ['#c1f1dc', '#95d5b2', '#2d6a4f'] }],
      },
      options: { responsive: true },
    });
  }

  function DietChartsPlaceholder() {
    appRoot.innerHTML = `
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold">Diet Charts</h1>
        <a href="${window.Routes.dietCreate}" class="px-4 py-2 rounded bg-primary text-white text-sm">New</a>
      </div>
      <div class="bg-white rounded-lg shadow p-5 text-sm text-gray-600">List and manage diet charts (placeholder)</div>
    `;
  }

  function ReportsPlaceholder() {
    appRoot.innerHTML = `
      <h1 class="text-2xl font-semibold mb-4">Reports</h1>
      <div class="bg-white rounded-lg shadow p-5 text-sm text-gray-600">Analytics and exports (placeholder)</div>
    `;
  }

  function SettingsPlaceholder() {
    appRoot.innerHTML = `
      <h1 class="text-2xl font-semibold mb-4">Settings</h1>
      <div class="bg-white rounded-lg shadow p-5 text-sm text-gray-600">User preferences and configuration (placeholder)</div>
    `;
  }

  // ------- Router -------
  function render() {
    const hash = location.hash || window.Routes.dashboard;
    if (hash === window.Routes.dashboard) return DashboardView();
    if (hash === window.Routes.patients) return PatientsView();
    if (hash.startsWith('#patient-')) return PatientProfileView(hash.replace('#patient-', ''));
    if (hash === window.Routes.foodSearch) return FoodSearchView();
    if (hash === window.Routes.dietCharts) return DietChartsPlaceholder();
    if (hash === window.Routes.dietCreate) return DietCreateView();
    if (hash.startsWith('#daily-')) return DailyView(hash.replace('#daily-', ''));
    if (hash === window.Routes.reports) return ReportsPlaceholder();
    if (hash === window.Routes.settings) return SettingsPlaceholder();
    return DashboardView();
  }

  window.addEventListener('hashchange', render);
  window.addEventListener('load', render);
})();

