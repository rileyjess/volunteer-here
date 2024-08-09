const everyOrg = `https://partners.every.org/v0.2/search/AL?apiKey=pk_live_ed857e1af5a6567d7354ed4554625a24`;
const resultEl = document.getElementById('results-list');
const locationInputEl = document.getElementById('location');
const searchButtonEl = document.getElementById('search');

const searchForOrgs = function (location) {
    const everyOrgSearch = `https://partners.every.org/v0.2/search/${location}?apiKey=pk_live_ed857e1af5a6567d7354ed4554625a24`;

    fetch(everyOrgSearch)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    for (let i = 0; i < data.nonprofits.length; i++) {
                        console.log(data);
                        renderData(data.nonprofits[i])
                    }
                })
            };
        });
};

const searchButtonClick = function () {

    const cityState = locationInputEl.value.trim();

    if (cityState) {
        searchForOrgs(cityState);
        locationInputEl.value = '';
        resultEl.textContent = '';
    } else {
        alert('Please enter a location');
    }
};

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
}

// add an event listener for when the save button is clicked to store the data to local storage

searchButtonEl.addEventListener('click', searchButtonClick);

// create function that stores search results in local data

// create function that pulls search results from local data