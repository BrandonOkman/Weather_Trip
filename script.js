const cityContainer = $('.cities');
const form = $('#form');
const submitBtn = $('#submit');
const cityElement = $('#city');
const day = $('.day');
const dayForecast = $('.dayForecast');
const weekForecast = $('.weekForecast');
const historyEl = $('#historyItems');
const div = $('<div class="container">');
const weeklyForecastDay = $('<div class="weeklyForecastDay">');

// Date
let d = new Date;
let month = d.getMonth() + 1;
let x = d.getDate();
let year = d.getFullYear();
let date = '(' + month + '/' + x + '/' + year + ')';
// History
let history = getStorage();

function getStorage() {
    try {
        let items = JSON.parse(localStorage.getItem('history'));
        if (!items) {
            items = [];
        }
        return items;
    } catch (error) {

    }
}

historyEl.text(history);

$('.city').click(function(e) {
    cityElement.val($(e.target).text());
});

let city;
const apiKey = '229984962887c500e20428e36f61f8eb';

function makeHistoryButtons() {
    historyEl.empty();
    history.forEach((city) => {
        const cityButton = $('<button class="historyBtn">');
        cityButton.text(city)
        historyEl.append(cityButton);
        // cityButton.dblclick(function() {
        //     console.log($(this).text());
        //     let index = history.indexOf($(this));
        //     console.log(history, 'history b4');
        //     let newArray = history.splice(index, 1);
        //     console.log(history, 'history after');
        //     console.log(newArray, 'new array');
        //     console.log(index, 'index');
        //     localStorage.removeItem('history');

        // });
        cityButton.click(function(e) {
            dayForecast.text('');
            weekForecast.text('');
            let city = cityButton.text();
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    city = city.toLowerCase();
                    city = city.charAt(0).toUpperCase() + city.slice(1);
                    if (city === '') {
                        return
                    }
                    if (history.includes(city) === false) {
                        history.push(city);
                        localStorage.setItem('history', JSON.stringify(history));
                    };
                    historyEl.text(history);
                    weekForecast.empty();
                    city = data.name;
                    day.text(city + ' ' + date).addClass('current');
                    let lon = data.coord.lon;
                    let lat = data.coord.lat;
                    let iconPic;
                    async function getIconPic() {
                        await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                            .then(response => {
                                return response.json();
                            })
                            .then(data => {
                                iconPic = data.list[0].weather[0].icon;
                                return iconPic
                            });
                        let iconUrl = `http://openweathermap.org/img/wn/${iconPic}@2x.png`;
                        let iconImg = $(`<img class="ico" src="${iconUrl}">`);
                        day.text(city + ' ' + date).addClass('current');
                        day.append(iconImg);

                    }