const owmb = OpenweathermapBuilder('4067b3eb20413d8e37f3d1bb67007825');

const CITY_TEMPLATE = `<div><h2>{{cityName}}</h2><p>Temp: {{temp}}</p></div>`;

let counter = 0;
function fetchWeather() {
    var city = document.getElementById('city');

    owmb.appendLang('he-IL');
    owmb.appendMode('json');
    owmb.appendQuery(city.value);
    owmb.appendUnits('metric');

    const fullUrl = owmb.build();
    console.log(fullUrl);

    fetch(fullUrl).then(res => res.json().then(function (weatherResult) {
        console.log(weatherResult.main.temp);
        const t = `
                <div>
                    <h2>${city.value}</h2>
                    <p>Temp: <span data-id=${counter}>${weatherResult.main.temp}</span></p>
                    <button onclick='refresh(${counter++}, "${city.value}")'>refresh</button>
                </div>`;
        document.getElementById('content').innerHTML += t;
    }))

}

function refresh(id, city) {
    owmb.appendLang('he-IL');
    owmb.appendMode('json');
    owmb.appendQuery(city);
    owmb.appendUnits('metric');

    const fullUrl = owmb.build();
    console.log(fullUrl);

    fetch(fullUrl).then(res => res.json().then(function (weatherResult) {
        document.querySelectorAll(`[data-id="${id}"]`).innerHTML = weatherResult.main.temp;
    }))
}