const locationInputEl = document.getElementById('location');
const searchButton = document.getElementById('search');

// Save the search bar input to local storage, then redirect to the results page
const nextPage = function () {
    const cityState = locationInputEl.value.trim();
    localStorage.setItem('cityState', `${cityState}`);
    location.href = 'results.html';
};

searchButton.addEventListener('click', nextPage);