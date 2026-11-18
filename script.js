let employees = [];
const form = document.getElementById("search-form");
const input = document.getElementById("query");
const message = document.getElementById("message");
const resultCard = document.getElementById("result");

// Load the employee list once when the page opens
fetch("data.json")
  .then((res) => {
    if (!res.ok) throw new Error("Could not load data.json");
    return res.json();
  })
  .then((data) => { employees = data; })
  .catch((err) => showMessage("Failed to load employee data: " + err.message));

function showMessage(text, isInfo = false) {
  message.textContent = text;
  message.className = isInfo ? "info" : "";
}

// Remove spaces/dashes and +91 / 91 / 0 prefixes so "+91 99519-56070" still matches
function normalizePhone(value) {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

function findEmployee(raw) {
  const q = raw.trim().toUpperCase().replace(/\s+/g, "");
  if (!q) return null;

  // 1) Employee ID (exact, case-insensitive; also matches with/without a leading "E")
  const byId = employees.find((e) => {
    const id = e.id.toUpperCase();
    return id === q || id.replace(/^E/, "") === q.replace(/^E/, "");
  });
  if (byId) return byId;

  // 2) Mobile number (10 digits)
  const phone = normalizePhone(q);
  if (phone.length === 10) {
    return employees.find((e) => e.mobile === phone) || null;
  }
  return null;
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function render(emp) {
  setText("r-floor-big", emp.floor);
  setText("r-room-big", emp.room);
  setText("r-name", emp.name);
  setText("r-mandal", emp.mandal);
  setText("r-designation", emp.designation);
  setText("r-place", emp.place);
  setText("r-floor", emp.floor);
  setText("r-room", emp.room);
  setText("r-slno", emp.slno);
  resultCard.classList.remove("hidden");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  resultCard.classList.add("hidden");

  if (!employees.length) {
    showMessage("Data is still loading, please try again in a moment.", true);
    return;
  }

  const emp = findEmployee(input.value);
  if (emp) {
    showMessage("");
    render(emp);
  } else {
    showMessage("No employee found for the Employee ID / Mobile Number entered.");
  }
});
