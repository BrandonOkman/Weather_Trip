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