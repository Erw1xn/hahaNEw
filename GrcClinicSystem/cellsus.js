// CELLSUS page features
document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('nameInput');
  const courseInput = document.getElementById('courseInput');
  const idInput = document.getElementById('idInput');
  const complaintInput = document.getElementById('complaintInput');
  const medicineInput = document.getElementById('medicineInput');
  const addBtn = document.getElementById('addPatientBtn');
  const tableBody = document.getElementById('patientTableBody');

  // ✅ Load patients from database
  function loadPatients() {
    fetch('load_patients.php')
      .then(res => res.json())
      .then(data => {
        tableBody.innerHTML = '';

        if (!data || data.length === 0) {
          tableBody.innerHTML = `
            <tr>
              <td colspan="6" style="text-align:center;color:#888;">
                No records found.
              </td>
            </tr>`;
          return;
        }

        data.forEach(patient => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${patient.date_time}</td>
            <td>${patient.name}</td>
            <td>${patient.course_section}</td>
            <td>${patient.id_no}</td>
            <td>${patient.complaint}</td>
            <td>${patient.medicine_given}</td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(err => console.error('Error loading patients:', err));
  }

  // ✅ Add new patient (send to database)
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      const course = courseInput.value.trim();
      const id = idInput.value.trim();
      const complaint = complaintInput.value.trim();
      const medicine = medicineInput.value.trim();

      if (!name || !course || !id || !complaint || !medicine) {
        alert("Please fill out all fields.");
        return;
      }

      fetch('add_patient.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, course, id, complaint, medicine })
      })
      .then(res => res.text())
      .then(response => {
        alert(response);
        loadPatients(); // Reload table
        nameInput.value = '';
        courseInput.value = '';
        idInput.value = '';
        complaintInput.value = '';
        medicineInput.value = '';
      })
      .catch(err => console.error('Error adding patient:', err));
    });
  }

  // ✅ Load table when page opens
  if (tableBody) loadPatients();
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const sidebar = document.querySelector('.sidebar');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  sidebar.classList.toggle('show');
});

// ---------------------------
// ✅ AUTO DEDUCT FROM INVENTORY WHEN CELLSUS ADDS MEDICINE
// ---------------------------
(function() {
  const addBtn = document.getElementById('addPatientBtn');
  if (!addBtn) return;

  addBtn.addEventListener('click', () => {
    const medName = document.getElementById('medicineInput').value.trim();
    if (!medName) return; // skip if empty

    // small delay to let patient save finish
    setTimeout(() => {
      try {
        const raw = localStorage.getItem('med-inventory-v1');
        if (!raw) return;
        const meds = JSON.parse(raw);

        const med = meds.find(m => m.name.toLowerCase() === medName.toLowerCase());
        if (!med) {
          console.warn(`Medicine "${medName}" not found in inventory.`);
          return;
        }

        if (med.quantity > 0) {
          med.quantity -= 1; // default bawas = 1
          localStorage.setItem('med-inventory-v1', JSON.stringify(meds));
          console.log(`✅ ${medName} stock deducted by 1. Remaining: ${med.quantity}`);
        } else {
          alert(`⚠️ ${med.name} is out of stock!`);
        }
      } catch (e) {
        console.error('Inventory update failed:', e);
      }
    }, 100);
  });
})();

// ======================================
// ✅ ENHANCEMENT: Search bar beside "Add Patient"
// ======================================
document.addEventListener("DOMContentLoaded", () => { 
  const addBtn = document.getElementById("addPatientBtn");
  const tableBody = document.getElementById("patientTableBody");
  if (!addBtn || !tableBody) return;

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "🔍 Search";
  searchInput.id = "patientSearch";
  searchInput.style.marginLeft = "10px";
  searchInput.style.padding = "8px 10px";
  searchInput.style.border = "1px solid #ccc";
  searchInput.style.borderRadius = "6px";
  searchInput.style.maxWidth = "240px";
  addBtn.parentElement?.insertBefore(searchInput, addBtn.nextSibling);

  // ✅ Since table data now comes from DB, re-filter from existing visible rows
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    Array.from(tableBody.getElementsByTagName('tr')).forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(term) ? '' : 'none';
    });
  });
});

  document.querySelector(".logout-btn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});