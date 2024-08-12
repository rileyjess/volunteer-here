const resultEl = document.getElementById('results-list');

const renderData = function (data) {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const pEl = document.createElement('p');
    const url = document.createElement('a');
    // add a save button element

    h3.textContent = data.name
    pEl.textContent = data.location
    url.setAttribute('href', data.profileUrl);
    url.textContent = 'Website'
    li.appendChild(h3);
    li.appendChild(pEl);
    li.appendChild(url);
    resultEl.appendChild(li);
};

const searchForOrgs = function (location) {
    const everyOrgSearch = `https://partners.every.org/v0.2/search/${location}?apiKey=pk_live_ed857e1af5a6567d7354ed4554625a24`;

    fetch(everyOrgSearch)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    for (let i = 0; i < data.nonprofits.length; i++) {
                        renderData(data.nonprofits[i])
                    }
                })
            };
        });
    locationInputEl.value = '';
    resultEl.textContent = '';
};

const displayResults = function () {
    let userInput = localStorage.getItem('cityState');
    searchForOrgs(userInput);
};

const searchButtonClick = function () {
    const cityState = locationInputEl.value.trim();
    localStorage.setItem('cityState', `${cityState}`);
    displayResults();
};

searchButtonEl.addEventListener('click', searchButtonClick);

displayResults();

// create function that stores search results in local data

// create function that pulls search results from local data