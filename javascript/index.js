function updateTime() {
    // Melbourne
    let melbourneElement = document.querySelector("#melbourne");
    if (melbourneElement) {
        let melbourneDateElement = melbourneElement.querySelector(".date");
        let melbourneTimeElement = melbourneElement.querySelector(".time");
        let melbourneTime = moment().tz("Pacific/Melbourne");
        
        melbourneDateElement.innerHTML = melbourneTime.format("MMM Do YYYY");
        melbourneTimeElement.innerHTML = melbourneTime.format(
            "h:mm:ss [<small>]A[</small>]"
        );
    }

    // Los Angeles
    let losAngelesElement = document.querySelector("#los-angeles");
    if (losAngelesElement) {
        let losAngelesDateElement = losAngelesElement.querySelector(".date");
        let losAngelesTimeElement = losAngelesElement.querySelector(".time");
        let losAngelesTime = moment().tz("America/Los_Angeles");

        losAngelesDateElement.innerHTML = losAngelesTime.format("MMM Do YYYY");
        losAngelesTimeElement.innerHTML = losAngelesTime.format(
            "h:mm:ss [<small>]A[</small>]"
        );
    }

    // Paris
    let parisElement = document.querySelector("#paris");
    if (parisElement) {
        let parisDateElement = parisElement.querySelector(".date");
        let parisTimeElement = parisElement.querySelector(".time");
        let parisTime = moment().tz("Europe/Paris");

        parisDateElement.innerHTML = parisTime.format("MMM Do YYYY");
        parisTimeElement.innerHTML = parisTime.format(
            "h:mm:ss [<small>]A[</small>]"
        );
    }
}

let updateCityInterval;

function updateCity(event) {
    let cityTimeZone = event.target.value;
    let refreshButton = document.querySelector("#refresh-button");
    
    if (cityTimeZone === "") {
        refreshButton.style.display = "none";
        return;
    }

    if (cityTimeZone === "current") {
        cityTimeZone = moment.tz.guess();
    }

    let cityName = cityTimeZone.replace('_', " ").split("/")[1];
    let citiesElement = document.querySelector("#cities");

    function updateSelectedCityTime() {
        let cityTime = moment().tz(cityTimeZone);
        citiesElement.innerHTML = `
            <div class="city">
                <div>
                    <h2>${cityName}</h2>
                    <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
                </div>
                <div class="time">${cityTime.format("h:mm:ss")}<small>${cityTime.format("A")}</small></div>
            </div>
        `;
    }

    updateSelectedCityTime();
    clearInterval(updateCityInterval);
    updateCityInterval = setInterval(updateSelectedCityTime, 1000);
    
    refreshButton.style.display = "block";
    refreshButton.addEventListener("click", function() {
        location.reload();
    });
}

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
