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
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&APPID=d12de75db6a2c0ce4cd7b4e0108fdee8`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            const temp_c = Math.round((arrData[0].main.temp) - 273.15);

            city_name.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = temp_c;
            const tempMood = arrData[0].weather[0].main;

            //  Condition to check weather
            if (tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fa fa-sun fa-spin' style='color: #eccc68;' title='Clear'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fa fa-cloud fa-beat-fade' style='color: #f1f2f6;' title='Clouds'></i>";
            } else if (tempMood == "Rain") {
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