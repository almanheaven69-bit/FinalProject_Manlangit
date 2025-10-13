const cards = document.querySelectorAll('.room-card');
const mealInputs = document.querySelectorAll('.meal-item input');
const totalCostEl = document.getElementById('totalCost');
let totalCost = 0;

// ===== Increment/Decrement for room and addon cards =====
cards.forEach(card => {
  const price = parseInt(card.dataset.price);
  const input = card.querySelector('input');
  const inc = card.querySelector('.increment');
  const dec = card.querySelector('.decrement');

  inc.addEventListener('click', () => {
    input.value = parseInt(input.value) + 1;
    updateTotal();
  });
  dec.addEventListener('click', () => {
    if (input.value > 0) input.value = parseInt(input.value) - 1;
    updateTotal();
  });
});

// ===== Meal Inputs =====
mealInputs.forEach(input => {
  input.addEventListener('input', updateTotal);
});

function updateTotal() {
  totalCost = 0;

  // Venue + Add-ons
  cards.forEach(card => {
    const qty = parseInt(card.querySelector('input').value);
    const price = parseInt(card.dataset.price);
    totalCost += qty * price;
  });

  // Meals
  mealInputs.forEach(input => {
    const qty = parseInt(input.value);
    const price = parseInt(input.parentElement.dataset.price);
    totalCost += qty * price;
  });

  totalCostEl.textContent = totalCost.toLocaleString();
}

// ===== MODAL (Show Details) =====
const modal = document.getElementById('detailsModal');
const showBtn = document.getElementById('showDetailsBtn');
const closeBtn = document.querySelector('.close');
const detailsList = document.getElementById('detailsList');
const modalTotal = document.getElementById('modalTotal');

showBtn.onclick = () => {
  detailsList.innerHTML = '';

  cards.forEach(card => {
    const name = card.querySelector('h3').textContent;
    const qty = parseInt(card.querySelector('input').value);
    const price = parseInt(card.dataset.price);
    if (qty > 0) {
      const subtotal = price * qty;
      const div = document.createElement('div');
      div.textContent = `${name} x ${qty} = ₱${subtotal.toLocaleString()}`;
      detailsList.appendChild(div);
    }
  });

  mealInputs.forEach(input => {
    const label = input.parentElement.querySelector('label').textContent.split('(')[0].trim();
    const qty = parseInt(input.value);
    const price = parseInt(input.parentElement.dataset.price);
    if (qty > 0) {
      const subtotal = price * qty;
      const div = document.createElement('div');
      div.textContent = `${label} x ${qty} = ₱${subtotal.toLocaleString()}`;
      detailsList.appendChild(div);
    }
  });

  modalTotal.textContent = totalCost.toLocaleString();
  modal.style.display = 'block';
};

closeBtn.onclick = () => (modal.style.display = 'none');
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };
