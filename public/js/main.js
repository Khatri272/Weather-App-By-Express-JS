const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector(".middle_layer");

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = `Please enter city name`;
        datahide.classList.add("data_hide");
    } else {
        try {
            datahide.classList.remove("data_hide");
            // let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&APPID=d12de75db6a2c0ce4cd7b4e0108fdee8`;
            let url = `https://api.weatherapi.com/v1/current.json?key=2dffac0fae0a4fbdb34121146230903&q=${cityVal}&aqi=no`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerHTML = `${arrData[0].location.name}, ${arrData[0].location.country}`;
            temp_real_val.innerText = arrData[0].current.temp_c;
            const tempMood = arrData[0].current.condition.text;

            //  Condition to check weather
            if (tempMood == "Sunny") {
                temp_status.innerHTML = "<i class='fa fa-sun fa-spin' style='color: #eccc68;' title='Clear'></i>";
            } else if (tempMood == "Partly cloudy" || tempMood == "Moderate or heavy rain with thunder" || tempMood == "Light rain") {
                temp_status.innerHTML = "<i class='fa fa-cloud fa-beat-fade' style='color: #f1f2f6;' title='Clouds'></i>";
            } else if (tempMood == "Light sleet" || tempMood == "Fog") {
                temp_status.innerHTML = "<i class='fa fa-cloud-rain fa-beat-fade' style='color: #a4b0be;' title='Rainy'></i>";
            } else {
                temp_status.innerHTML = "<i class='fa fa-sun fa-spin' style='color: #eccc68;'></i>";
            }
        } catch {
            city_name.innerText = `Please enter city name properly`;
            datahide.classList.add("data_hide");
        }
    }
}

submitBtn.addEventListener("click", getInfo);