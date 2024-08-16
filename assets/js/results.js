const resultsEl = document.getElementById('results-list');
const savedEl = document.getElementById('saved-searches-list');
const infoModal = document.getElementById('info-modal');
const closeModalBtn = document.getElementById('close-btn');

// saving the nonprofit clicked on to the local storagee array
const saveNonprofits = function (name, ein) {
    const savedNonprofits = JSON.parse(localStorage.getItem('savedNonprofits')) || []
    const nonprofit = {
        name,
        ein,
    }
    if (savedNonprofits.some(nonprofit => nonprofit.ein === ein)) {
        return
    }
    savedNonprofits.push(nonprofit)
    localStorage.setItem('savedNonprofits', JSON.stringify(savedNonprofits))
}

// Pull the nonprofit data from local storage, then create and append elements for the saved searches list
const loadNonprofits = function () {
    savedEl.innerHTML = '';
    const savedNonprofits = JSON.parse(localStorage.getItem('savedNonprofits')) || []
    if (savedNonprofits.length === 0) {
        return
    }
    for (const nonprofit of savedNonprofits) {
        // Create the elements
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const containerEl = document.createElement('div');
        const infoEl = document.createElement('button');
        const starEl = document.createElement('button');

        containerEl.setAttribute('data-ein', nonprofit.ein);
        containerEl.setAttribute('data-name', nonprofit.name);
        li.setAttribute('class', 'flex direction-row justify-between');
        containerEl.setAttribute('class', 'flex direction-row');

        h3.textContent = nonprofit.name;
        infoEl.textContent = '🔍';
        infoEl.setAttribute('class', 'pr-5');
        starEl.textContent = '✖️';

        // Append them to the container
        li.appendChild(h3);
        containerEl.appendChild(infoEl);
        containerEl.appendChild(starEl);
        li.appendChild(containerEl);
        savedEl.appendChild(li);
    }
}

// creates the information displayed in the modal
const createAddress = function(result) {
    const details = document.getElementById('details');

    details.innerHTML = ''

    const address = document.createElement('p');
    const city = document.createElement('p');
    const state = document.createElement('p');
    const zip = document.createElement('p');

    address.textContent = result.data.street;
    city.textContent = result.data.city;
    state.textContent = result.data.state;
    zip.textContent = result.data.zip;

    details.appendChild(address);
    details.appendChild(city);
    details.appendChild(state);
    details.appendChild(zip);
}

// Open the modal by removing the hidden class from the modal div
function openModal() {
    infoModal.classList.remove('hidden');
}

resultsEl.addEventListener('click', function (event) {
    const clicked = event.target

    // When the 'star' button is clicked, the functions will run to make the list item appear in the saved searches container
    if (clicked.matches('button') && clicked.textContent === '⭐') {
        const ein = clicked.parentElement.getAttribute('data-ein');
        const name = clicked.parentElement.getAttribute('data-name');

        saveNonprofits(name, ein);
        loadNonprofits();
    };

    // When the 'magnifying glass' button is clicked, information will be called from the Charity API and will be appended to the modal
    if (clicked.matches('button') && clicked.textContent === '🔍') {
        const apiUrl = 'https://api.charityapi.org/api/organizations';
        const apiKey = 'live-5xe2vl-WAWxO6mV2GxmymmvPTC1glt2LnWv2PfbKBRbFFiW6b9vzUV5GUVRQpXlGCL09YdjwXmwZ-aV9';
        const ein = clicked.parentElement.getAttribute('data-ein');
        const searchUrl = `https://api.charityapi.org/api/organizations/${ein}`

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
                createAddress(result);
                // Run the function to open the modal
                openModal();

            })
            .catch(error => {
                console.error('Error fetching organization data:', error);
            });
    }

}
)

savedEl.addEventListener('click', function (event) {
    const clicked = event.target

    // When the 'minus sign' button is clicked, it removes the item from the saved nonprofits box
    if (clicked.matches('button') && clicked.textContent === '✖️') {
        const ein = clicked.parentElement.getAttribute('data-ein');
        const savedNonprofits = JSON.parse(localStorage.getItem('savedNonprofits')) || []
        const filteredNonprofits = savedNonprofits.filter(nonprofit => nonprofit.ein !== ein)

        localStorage.setItem('savedNonprofits', JSON.stringify(filteredNonprofits))
        loadNonprofits();
    }

    // When the 'magnifying glass' button is clicked, information will be called from the Charity API and will be appended to the modal
    if (clicked.matches('button') && clicked.textContent === '🔍') {
        const apiUrl = 'https://api.charityapi.org/api/organizations';
        const apiKey = 'live-5xe2vl-WAWxO6mV2GxmymmvPTC1glt2LnWv2PfbKBRbFFiW6b9vzUV5GUVRQpXlGCL09YdjwXmwZ-aV9';
        const ein = clicked.parentElement.getAttribute('data-ein');
        const searchUrl = `https://api.charityapi.org/api/organizations/${ein}`

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
                // Create the elements and render the data
                createAddress(result);
                // Run the function to open the modal
                openModal();

            })
            .catch(error => {
                console.error('Error fetching organization data:', error);
            });
    }

}
)

// When the close button is clicked, the hidden class will added back to the modal div's class list
const closeModal = function () {
    infoModal.classList.add('hidden');
}

closeModalBtn.addEventListener('click', closeModal);

// Create elements for each nonprofit and render the data in the result list
const renderData = function (data) {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const containerEl = document.createElement('div');
    const infoEl = document.createElement('button');
    const starEl = document.createElement('button');

    containerEl.setAttribute('data-ein', data.ein);
    containerEl.setAttribute('data-name', data.name);
    li.setAttribute('class', 'flex direction-row justify-between');
    containerEl.setAttribute('class', 'flex direction-row');
    h3.textContent = data.name;
    infoEl.textContent = '🔍';
    infoEl.setAttribute('class', 'pr-5');
    infoEl.setAttribute('id', 'info-btn');
    starEl.textContent = '⭐';

    li.appendChild(h3);
    containerEl.appendChild(infoEl);
    containerEl.appendChild(starEl);
    li.appendChild(containerEl);
    resultsEl.appendChild(li);
};

// Call the data from the Every Org API
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

// Retrieve the data from local storage
const displayResults = function () {
    let userInput = localStorage.getItem('cityState');
    searchForOrgs(userInput);
};

// display the most recent search in local storage on the results list on load
displayResults();
// display the saved nonprofits in local storage to thee saved column on load
loadNonprofits();
