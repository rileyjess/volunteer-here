const locationInputEl = document.getElementById('location');
const searchButtonEl = document.getElementById('search');
const resultEl = document.getElementById('results-list');
const savedEl = document.getElementById('saved-searches-list');

// add a fetch function that adds the street address as an element with the new api

resultEl.addEventListener('click', function (event) {
    const clicked = event.target

    if (clicked.matches('i')) {
        const ein = star.parentElement.getAttribute('data-ein');
        console.log(ein);
        fetch(`https://partners.every.org/v0.2/search/${ein}?apiKey=pk_live_ed857e1af5a6567d7354ed4554625a24`)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data)
                        const li = document.createElement('li');
                        const iEl = document.createElement('i');
                        const h3 = document.createElement('h3');

                        h3.textContent = data.nonprofits[0].name
                        iEl.textContent = '⭐'

                        li.setAttribute('data-ein', data.nonprofits[0].ein);
                        li.appendChild(h3);
                        li.appendChild(iEl);
                        savedEl.appendChild(li);
                    })
                }
            })
    }
})

const renderData = function (data) {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const containerEl = document.createElement('div');
    const infoEl = document.createElement('button');
    const starEl = document.createElement('button');
    
    containerEl.setAttribute('data-ein', data.ein);
    li.setAttribute('class', 'flex direction-row justify-between');
    containerEl.setAttribute('class', 'flex direction-row');
    h3.textContent = data.name;
    infoEl.textContent = '💬';
    infoEl.setAttribute('class', 'pr-5');
    starEl.textContent = '⭐';

    li.appendChild(h3);
    containerEl.appendChild(infoEl);
    containerEl.appendChild(starEl);
    li.appendChild(containerEl);
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

displayResults();
