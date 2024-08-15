const apiUrl = 'https://api.charityapi.org/api/organizations';
const apiKey = 'live-5xe2vl-WAWxO6mV2GxmymmvPTC1glt2LnWv2PfbKBRbFFiW6b9vzUV5GUVRQpXlGCL09YdjwXmwZ-aV9';
const resultEl = document.getElementById('organization-details');
const einInputEl = document.getElementById('ein');
const searchButtonEl = document.getElementById('search');

const searchForOrganization = function (ein) {
    const searchUrl = `${apiUrl}/${ein}?api_key=${apiKey}`;

    fetch(searchUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch organization data');
            }
            return response.json();
        })
        .then(data => {
            
            console.log(data);
            
            resultsEl.innerHTML = `
                <h2>${data.name}</h2>
                <p><strong>Location:</strong> ${data.location}</p>
                <p><strong>Street Address:</strong> ${data.streetAddress}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching organization data:', error);
        });
}

// searchButtonEl.addEventListener('click', () => {
//     const ein = einInputEl.value;
//     searchForOrganization(ein);
// });
