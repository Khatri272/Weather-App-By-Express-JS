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
            } else if (tempMood == "Patchy light snow" || tempMood == "Light snow" || tempMood == "Partly cloudy") {
                temp_status.innerHTML = "<i class='fa fa-cloud' title='Clouds'></i>";
            } else if (tempMood == "Light rain" || tempMood == "Overcast" || tempMood == "Light sleet" || tempMood == "Fog" || tempMood == "Moderate or heavy rain with thunder") {
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