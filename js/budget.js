const api = require('./api');

function initBudget() {
  const form = document.getElementById('budget-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
      rent: parseFloat(formData.get('rent')) || 0,
      feeding: parseFloat(formData.get('feeding')) || 0,
      transport: parseFloat(formData.get('transport')) || 0,
      miscellaneous: parseFloat(formData.get('miscellaneous')) || 0,
    };
    try {
      const result = await api.post('/budget', data);
      displayBudgetResult(result);
    } catch (error) {
      alert('Error calculating budget: ' + error.message);
    }
  });
}

function displayBudgetResult(result) {
  document.getElementById('total').textContent = result.total.toLocaleString();
  document.getElementById('buffer').textContent = result.buffer.toLocaleString();
  document.getElementById('recommended').textContent = result.recommendedBudget.toLocaleString();
  const riskAlert = document.getElementById('risk-alert');
  if (result.riskAlert) {
    riskAlert.style.display = 'block';
  } else {
    riskAlert.style.display = 'none';
  }
  document.getElementById('budget-result').style.display = 'block';
}

module.exports = { initBudget };
