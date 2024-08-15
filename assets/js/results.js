const locationInputEl = document.getElementById('location');
const searchButtonEl = document.getElementById('search');
const resultEl = document.getElementById('results-list');
const savedEl = document.getElementById('saved-searches-list');

// add a fetch function that adds the street address as an element with the new api

resultEl.addEventListener('click', function (event) {
    const star = event.target

    if (star.matches('i')) {
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

const starClick = function (data) {

};

// const saveEin = function (ein) {
//     const einList = JSON.parse(localStorage.getItem('einList')) || []
//     einList.push(ein)

//     localStorage.setItem('einList', JSON.stringify(einList));
// };

// module 4 19 & 26 mini project
// add event listener that target's the li of the ul container

const renderData = function (data) {
    const li = document.createElement('li');
    const iEl = document.createElement('i');
    const h3 = document.createElement('h3');

    h3.textContent = data.name
    iEl.textContent = '⭐'

    li.setAttribute('data-ein', data.ein);
    li.appendChild(h3);
    li.appendChild(iEl);
    resultEl.appendChild(li);
};

const searchForOrgs = function (location) {
    const everyOrgSearch = `https://partners.every.org/v0.2/search/${location}?apiKey=pk_live_ed857e1af5a6567d7354ed4554625a24`;

    fetch(everyOrgSearch)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    for (let i = 0; i < data.nonprofits.length; i++) {
                        console.log(data);
                        // localStorage.setItem('ein', data.ein);
                        renderData(data.nonprofits[i])
                        // saveEin(data.nonprofits[i].ein)
                        // localStorage.setItem('ein', JSON.stringify(data.nonprofits[i].ein.concat(data)) || []);
                        // const einList = JSON.parse(localStorage.getItem('einList')) || [];
                        // einList.push(data.nonprofits[i].ein);
                        // localStorage.setItem('einList', JSON.stringify(einList));
                        // const einArray = data.nonprofits[i].ein;
                        // localStorage.setItem('einArray', einArray);
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
