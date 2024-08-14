const locationInputEl = document.getElementById('location');
const searchButtonEl = document.getElementById('search');
const resultEl = document.getElementById('results-list');

// add a fetch function that adds the street address as an element with the new api

// const saveEin = function (ein) {
//     const einList = JSON.parse(localStorage.getItem('einList')) || []
//     einList.push(ein)

//     localStorage.setItem('einList', JSON.stringify(einList));
// }

const renderData = function (data) {
    const li = document.createElement('li');
    const pEl = document.createElement('p');
    const h3 = document.createElement('h3');
    // const pEl = document.createElement('p');
    // const url = document.createElement('a');
    // add a save button element

    // for (let i = 0; i < data.length )
    // localStorage.setItem('ein', data.ein);

    li.setAttribute('class', 'flex direction-row justify-between');
    h3.textContent = data.name
    pEl.textContent = '⭐'
    // pEl.textContent = data.location
    // url.setAttribute('href', data.profileUrl);
    // url.textContent = 'Website'
    li.appendChild(h3);
    li.appendChild(pEl);
    // li.appendChild(pEl);
    // li.appendChild(url);
    resultEl.appendChild(li);
};

const searchForOrgs = function (location) {
    const everyOrgSearch = `https://partners.every.org/v0.2/search/${location}?apiKey=pk_live_ed857e1af5a6567d7354ed4554625a24`;

    fetch(everyOrgSearch)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    for (let i = 0; i < data.nonprofits.length; i++) {
                        // localStorage.setItem('ein', data.ein);
                        renderData(data.nonprofits[i])
                        // saveEin(data.nonprofits[i].ein)
                    }
                    console.log(data);
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

// searchButtonEl.addEventListener('click', searchButtonClick);

displayResults();

// create function that stores search results in local data

// create function that pulls search results from local data