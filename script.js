const billInput = document.getElementById('bill');
const tipBtns = document.querySelectorAll('.tip-btn');
const customTipInput = document.getElementById('custom-tip');
const peopleInput = document.getElementById('people');
const tipAmountEl = document.getElementById('tip-amount');
const totalPerPersonEl = document.getElementById('total-per-person');
const resetBtn = document.getElementById('reset-btn');

let selectedTip = 15; // default 15%

// Handle preset tip buttons
tipBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    tipBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    customTipInput.value = '';
    selectedTip = parseFloat(e.target.dataset.tip);
    calculate();
  });
});

// Handle custom tip input
customTipInput.addEventListener('input', () => {
  tipBtns.forEach(b => b.classList.remove('active'));
  selectedTip = customTipInput.value ? parseFloat(customTipInput.value) : 0;
  calculate();
});

billInput.addEventListener('input', calculate);
peopleInput.addEventListener('input', calculate);

function calculate() {
  const bill = parseFloat(billInput.value) || 0;
  const people = parseInt(peopleInput.value) || 1;

  const totalTip = bill * (selectedTip / 100);
  const tipPerPerson = totalTip / people;
  const totalPerPerson = (bill + totalTip) / people;

  tipAmountEl.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalPerPersonEl.textContent = `$${totalPerPerson.toFixed(2)}`;
}

// Reset everything
resetBtn.addEventListener('click', () => {
  billInput.value = '';
  customTipInput.value = '';
  peopleInput.value = '1';
  selectedTip = 15;
  tipBtns.forEach(b => b.classList.remove('active'));
  tipBtns[2].classList.add('active'); // set 15% back to active
  tipAmountEl.textContent = '$0.00';
  totalPerPersonEl.textContent = '$0.00';
});
