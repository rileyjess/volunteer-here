const locationInputEl = document.getElementById('location');
const searchButtonEl = document.getElementById('search');
const resultEl = document.getElementById('results-list');
const savedEl = document.getElementById('saved-searches-list');

// add a fetch function that adds the street address as an element with the new api

const saveNonprofits = function (name, ein) {
    const savedNonprofits = JSON.parse(localStorage.getItem('savedNonprofits')) || []
    const nonprofit = {
        name,
        ein,
    }
    if (savedNonprofits.some(nonprofit => nonprofit.ein === ein)) {
        return
    }
    console.log(nonprofit)
    savedNonprofits.push(nonprofit)
    localStorage.setItem('savedNonprofits', JSON.stringify(savedNonprofits))
}

const loadNonprofits = function () {
    savedEl.innerHTML = '';
    const savedNonprofits = JSON.parse(localStorage.getItem('savedNonprofits')) || []
    if (savedNonprofits.length === 0) {
        return
    }
    for (const nonprofit of savedNonprofits) {
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const containerEl = document.createElement('div');
        const infoEl = document.createElement('button');
        const starEl = document.createElement('button');

        containerEl.setAttribute('data-ein', nonprofit.ein);
        li.setAttribute('class', 'flex direction-row justify-between');
        containerEl.setAttribute('class', 'flex direction-row');

        h3.textContent = nonprofit.name;
        infoEl.textContent = '💬';
        infoEl.setAttribute('class', 'pr-5');
        starEl.textContent = '⭐';

        li.appendChild(h3);
        containerEl.appendChild(infoEl);
        containerEl.appendChild(starEl);
        li.appendChild(containerEl);
        savedEl.appendChild(li);
    }
}

resultEl.addEventListener('click', function (event) {
    const clicked = event.target

    if (clicked.matches('button') && clicked.textContent == '⭐') {
        const ein = clicked.parentElement.getAttribute('data-ein');
        fetch(`https://partners.every.org/v0.2/search/${ein}?apiKey=pk_live_ed857e1af5a6567d7354ed4554625a24`)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        const nonprofit = data.nonprofits[0]
                        saveNonprofits(nonprofit.name, nonprofit.ein);
                        loadNonprofits();
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

loadNonprofits();
