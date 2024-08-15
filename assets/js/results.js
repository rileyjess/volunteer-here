const resultsEl = document.getElementById('results-list');
const savedEl = document.getElementById('saved-searches-list');
const infoModal = document.getElementById('info-modal');
const closeModalBtn = document.getElementById('close-btn');

// add a fetch function that adds the street address as an element with the new api
function openModal() {
    infoModal.classList.remove('hidden');
}

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

resultsEl.addEventListener('click', function (event) {
    const clicked = event.target

    if (clicked.matches('button') && clicked.textContent === '⭐') {
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

    if (clicked.matches('button') && clicked.textContent === '💬') {
        const apiUrl = 'https://api.charityapi.org/api/organizations';
        const apiKey = 'live-5xe2vl-WAWxO6mV2GxmymmvPTC1glt2LnWv2PfbKBRbFFiW6b9vzUV5GUVRQpXlGCL09YdjwXmwZ-aV9';
        const ein = clicked.parentElement.getAttribute('data-ein');
        const searchUrl = `https://api.charityapi.org/api/organizations/${ein}`
        // `${apiUrl}/${ein}?api_key=${apiKey}`;

        fetch(searchUrl, {
            method: 'GET',
            headers: {
                'apiKey': apiKey
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch organization data');
                }
                return response.json();
            })
            .then(result => {

                console.log(result.data);

                // render the data
                const details = document.getElementById('details');

                details.innerHTML = ''

                const address = document.createElement('p');
                const city = document.createElement('p');
                const zip = document.createElement('p');

                address.textContent = result.data.street;
                city.textContent = result.data.city;
                zip.textContent = result.data.zip;

                details.appendChild(address);
                details.appendChild(city);
                details.appendChild(zip);

                openModal();

            })
            .catch(error => {
                console.error('Error fetching organization data:', error);
            });
    }

}
)

const closeModal = function () {
    console.log('Hello');
    infoModal.classList.add('hidden');
}

closeModalBtn.addEventListener('click', closeModal);

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
    infoEl.setAttribute('id', 'info-btn');
    starEl.textContent = '⭐';

    li.appendChild(h3);
    containerEl.appendChild(infoEl);
    containerEl.appendChild(starEl);
    li.appendChild(containerEl);
    resultsEl.appendChild(li);
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
    resultsEl.textContent = '';
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
// create function that stores search results in local data

// create function that pulls search results from local data

// When the more information button is clicked, open the modal to disaply information from the API


// const infoBtn = document.getElementById('info-btn');
// infoBtn.addEventListener('click', openModal);
