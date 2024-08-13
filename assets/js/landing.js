const locationInputEl = document.getElementById('location');
const searchButtonEl = document.getElementById('search');

const nextPage = function () {
    const cityState = locationInputEl.value.trim();
    localStorage.setItem('cityState', `${cityState}`);
    location.href = 'results.html';
};

searchButtonEl.addEventListener('click', nextPage);