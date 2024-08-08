console.log('hello world!');
const everyOrg = `https://partners.every.org/v0.2/search/AL?apiKey=pk_live_ed857e1af5a6567d7354ed4554625a24`;
const resultEl = document.getElementById('results');

const searchForOrgs = function (location) {
    const everyOrgSearch = `https://partners.every.org/v0.2/search/${location}?apiKey=pk_live_ed857e1af5a6567d7354ed4554625a24`;

    fetch(everyOrgSearch)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    for (let i = 0; i < data.nonprofits.length; i++) {
                        renderData(data.nonprofits[i])
                    }
                })
            };
        });
};

const renderData = function (data) {
    const h1 = document.createElement('h1');

    h1.textContent = data.name
    resultEl.appendChild(h1);
}

// create function that stores search results in local data

// create function that pulls search results from local data

// create function that grabs user input

searchForOrgs(`Nashville`)

console.log(results);
