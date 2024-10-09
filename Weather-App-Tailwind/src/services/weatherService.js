import { DateTime } from 'luxon';

const API_KEY = "9e7bec83fe590b12237dbb7877e29ea0";
const BaseURL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BaseURL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    return fetch(url)
        .then((res) => res.json());
};

const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc. dd LLL yyyy' | Local time : 'hh:mm a'") => 
    DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const formatCurrentWeather = (data) => {
    const {
        coord: { lon, lat },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
        timezone,
    } = data;

    const { main: details, icon } = weather[0];
    const localTime = formatToLocalTime(dt, timezone);
    const formattedSunrise = formatToLocalTime(sunrise, timezone, 'hh:mm a');
    const formattedSunset = formatToLocalTime(sunset, timezone, 'hh:mm a');

    return {
        lon,
        lat,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,   
        country,
        sunrise: formattedSunrise,
        sunset: formattedSunset,
        speed,
        details,
        icon: iconUrlFromCode(icon),
        localTime,
        dt,
        timezone
    };
};

const formatForeCastWeather = (secs, offset, data) => {
    // hourly forecast
    const hourly = data
        .filter((f) => f.dt > secs)
        .slice(0, 5)
        .map((f) => ({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, 'hh:mm a'),
            icon: iconUrlFromCode(f.weather[0].icon),
            date: f.dt_txt,
        }));

    // Daily forecast

    const daily = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00").map(f => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, 'ccc'),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt,
    }))

    return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams)
        .then(formatCurrentWeather);

    const { dt, lat, lon, timezone } = formattedCurrentWeather;
    const formattedForecastWeather = await getWeatherData("forecast", { lat, lon, units: searchParams.units })
        .then((d) => formatForeCastWeather(dt, timezone, d.list));

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default getFormattedWeatherData;
