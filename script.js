const scanBtn = document.getElementById('scan-btn');
const ipApiInfoDiv = document.getElementById('ip-api-info');
const whoisInfoDiv = document.getElementById('whois-info');

scanBtn.addEventListener('click', async () => {
    const input = document.getElementById('input').value;
    ipApiInfoDiv.textContent = 'Loading...';
    whoisInfoDiv.textContent = 'Loading...';
    const [ipApiData, whoisData] = await fetchData(input);
    displayIpApiInfo(ipApiData);
    displayWhoisInfo(whoisData);
});

async function fetchData(input) {
    const ipApiUrl = `http://ip-api.com/json/${input}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,currency,isp,org,as,mobile,proxy,query`;
    const ipApiResponse = await fetch(ipApiUrl);
    const ipApiData = await ipApiResponse.json();

    let whoisData;
    try {
        whoisData = await whois(input);
    } catch (error) {
        console.error('Error fetching WHOIS data:', error);
        whoisData = null;
    }

    return [ipApiData, whoisData];
}

function displayIpApiInfo(ipApiData) {
    if (ipApiData.status === 'success') {
        ipApiInfoDiv.innerHTML = '<h2>IP-API Information</h2>';
        for (const key in ipApiData) {
            if (key !== 'status' && key !== 'message' && key !== 'query') {
                ipApiInfoDiv.innerHTML += `<div class="field"><span>${key}</span><span>${ipApiData[key]}</span></div>`;
            }
        }
    } else {
        ipApiInfoDiv.textContent = `Error: ${ipApiData.message}`;
    }
}

function displayWhoisInfo(whoisData) {
    if (whoisData) {
        whoisInfoDiv.innerHTML = '<h2>WHOIS Information</h2><pre>' + whoisData + '</pre>';
    } else {
        whoisInfoDiv.textContent = 'WHOIS Information: Not available';
    }
}