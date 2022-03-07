submitButton()

function handleSubmit(event){
    event.stopPropagation();
    event.preventDefault();

    cityName = document.getElementById("cityName");
    cityZip = document.getElementById("cityZip");

    if (cityName.value == "" && cityZip.value == ""){
        alert('You must enter a city and zip!', 'danger');
    } else {
        doAPICall(cityName.value,cityZip.value);
    }

};

function submitButton(){
    let search = document.getElementById("search");
    search.addEventListener('click', (event)=>handleSubmit(event));
};

function intoFarenheit(kel){
    return Math.round(((kel - 273.15)* 1.8000 + 32.00));
};

async function doAPICall(city,zip){
    const key = "96b7bd8cd5fa93d484429a39b341b40c"

    if (city, zip){
        result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${zip}&appid=${key}`);
    }

    console.log(result.data)
    city = document.getElementById('city')
    city.innerText=`Results for ${result.data.name}`

    icon = document.getElementById('icon')
    icon.src = `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`

    title = document.getElementById('title')
    title.innerText=`${result.data.weather[0].main} - ${result.data.weather[0].description}`

    high = document.getElementById('high')
    high.innerText=`${intoFarenheit(result.data.main.temp_max)}℉`

    low = document.getElementById('low')
    low.innerText=`${intoFarenheit(result.data.main.temp_min)}℉`

    humidity = document.getElementById('humidity')
    humidity.innerText=`${result.data.main.humidity}%`
};
