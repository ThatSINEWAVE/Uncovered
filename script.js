const whois = require('node-whois');
const API_BASE_URL = 'https://api.hackertarget.com/';

async function executeFunction() {
    const input = document.getElementById('input').value;
    const functionName = document.getElementById('function').value;
    let output;

    switch (functionName) {
        case 'check_ip_info':
            output = await fetchIPInfo(input);
            break;
        case 'make_request':
            output = await makeRequest(input);
            break;
        case 'reversedns_lookup':
            output = await reverseDNSLookup(input);
            break;
        case 'dns_lookup':
            output = await dnsLookup(input);
            break;
        case 'host_search':
            output = await hostSearch(input);
            break;
        case 'shared_dns':
            output = await sharedDNS(input);
            break;
        case 'whois_lookup':
            output = await whoisLookup(input);
            break;
        case 'reverse_ip_lookup':
            output = await reverseIPLookup(input);
            break;
        case 'as_lookup':
            output = await asLookup(input);
            break;
        case 'ip_geolocation':
            output = await ipGeolocation(input);
            break;
        default:
            output = 'Invalid function selected';
    }

    document.getElementById('output').textContent = output;
}

async function fetchIPInfo(ipAddress) {
    const response = await fetch(`http://ip-api.com/json/${ipAddress}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,isp,org,as,asname,reverse,mobile,proxy,hosting,query`);
    const data = await response.json();

    if (data.status === 'fail') {
        return `Error: ${data.message || 'Unknown error'}`;
    }

    const { country, city, regionName, district, zip, lat, lon, timezone, currency, isp, org, as, asname, reverse, mobile, proxy, hosting } = data;

    return `IP Information for ${ipAddress}:
Country: ${country || 'N/A'}
City: ${city || 'N/A'}
Region: ${regionName || 'N/A'}
District: ${district || 'N/A'}
Zip Code: ${zip || 'N/A'}
Latitude: ${lat || 'N/A'}
Longitude: ${lon || 'N/A'}
Timezone: ${timezone || 'N/A'}
Currency: ${currency || 'N/A'}
ISP: ${isp || 'N/A'}
Organization: ${org || 'N/A'}
AS Number: ${as || 'N/A'}
AS Name: ${asname || 'N/A'}
Reverse DNS: ${reverse || 'N/A'}
Mobile: ${mobile || 'N/A'}
Proxy: ${proxy || 'N/A'}
Hosting: ${hosting || 'N/A'}`;
}

async function makeRequest(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            return `Error: ${response.status} - ${response.statusText}`;
        }
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

async function reverseDNSLookup(input) {
    const response = await fetch(`${API_BASE_URL}reversedns/?q=${input}`);
    const data = await response.text();
    return data;
}

async function dnsLookup(input) {
    const response = await fetch(`${API_BASE_URL}dnslookup/?q=${input}`);
    const data = await response.text();
    return data;
}

async function hostSearch(input) {
    const response = await fetch(`${API_BASE_URL}hostsearch/?q=${input}`);
    const data = await response.text();
    return data;
}

async function sharedDNS(input) {
    const response = await fetch(`${API_BASE_URL}findshareddns/?q=${input}`);
    const data = await response.text();
    return data;
}

async function whoisLookup(input) {
    try {
        const data = await whois.lookup(input);
        let output = '';
        for (const [key, value] of Object.entries(data)) {
            output += `${key}: ${value}\n`;
        }
        return output;
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

async function reverseIPLookup(input) {
    const response = await fetch(`${API_BASE_URL}reverseiplookup/?q=${input}`);
    const data = await response.text();
    return data;
}

async function asLookup(input) {
    const response = await fetch(`${API_BASE_URL}aslookup/?q=${input}`);
    const data = await response.text();
    return data;
}

async function ipGeolocation(input) {
    const response = await fetch(`${API_BASE_URL}ipgeo/?q=${input}`);
    const data = await response.text();
    return data;
}