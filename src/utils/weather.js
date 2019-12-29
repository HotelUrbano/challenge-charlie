import colors from "../styles/colors";

var directions = [
    "Norte",
    "Nordeste",
    "Leste",
    "Sudeste",
    "Sul",
    "Sudoeste",
    "Oeste",
    "Nordeste"
];

export const getDirection = heading => {
    const index = Math.round(heading / 8 / 5, 625);
    return directions[index] || "--";
};

export const getWeatherColor = temperature => {
    if (temperature < 15) return colors["blue"];
    else if (temperature >= 15 && temperature <= 35) return colors["yellow"];
    else if (temperature > 35) return colors["red"];
    else return colors["gray"];
};

export const getWeatherIcon = weather => {
    const icons = {
        clear: require("../assets/icons/clear.svg"),
        clouds: require("../assets/icons/clouds.svg"),
        thunderstorm: require("../assets/icons/thunderstorm.svg"),
        snow: require("../assets/icons/snow.svg"),
        rain: require("../assets/icons/rain.svg"),
        drizzle: require("../assets/icons/drizzle.svg")
    };

    return weather === undefined ? "--" : icons[weather.toLowerCase()];
};

export const getTranslatedWeather = weather => {
    const weathers = {
        clear: "Ensolarado",
        clouds: "Nuvens",
        thunderstorm: "Tempestade",
        snow: "Neve",
        rain: "Chuva",
        drizzle: "Chuvisco"
    };

    return weather === undefined ? "--" : weathers[weather.toLowerCase()];
};
