// app.js
async function fetchListings() {
  try {
    const res = await fetch('/api/listings');
    const data = await res.json();
    return data;
  } catch (e) {
    console.error('Failed to fetch listings', e);
    return [];
  }
}

function renderListings(listings) {
  const container = document.getElementById('listings');
  container.innerHTML = '';
  if (!listings || listings.length === 0) {
    container.innerHTML = '<p>No listings available right now.</p>';
    return;
  }
  listings.forEach(l => {
    const card = document.createElement('div');
    card.className = 'car-card';
    const imgSrc = (l.images && l.images[0]) ? l.images[0] : '/css/placeholder.png';
    card.innerHTML = `
      <img src="${imgSrc}" alt="${escapeHtml(l.title)}">
      <div class="card-body">
        <h3>${escapeHtml(l.title)}</h3>
        <p>${escapeHtml(l.description || '')}</p>
        <div class="price">${escapeHtml(l.price || '')}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

// basic escaping helper
function escapeHtml(s) {
  if (!s) return '';
  return s.replace(/[&<>"']/g, function (m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m];
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const listings = await fetchListings();
  renderListings(listings);

  document.getElementById('open-dashboard').addEventListener('click', () => {
    window.location.href = '/dashboard.html';
  });
});
