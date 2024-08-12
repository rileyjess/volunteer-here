const nextPage = function () {
    const cityState = locationInputEl.value.trim();
    localStorage.setItem('cityState', `${cityState}`);
    location.href = 'results.html';
};

searchButtonEl.addEventListener('click', nextPage);