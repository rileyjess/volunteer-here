const locationInputEl = document.getElementById('location');
const searchButton = document.getElementById('search');

const nextPage = function () {
    const cityState = locationInputEl.value.trim();
    localStorage.setItem('cityState', `${cityState}`);
    location.href = 'results.html';
};

searchButton.addEventListener('click', nextPage);