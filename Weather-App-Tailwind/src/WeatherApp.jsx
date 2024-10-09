import { useEffect, useState } from "react";
import Forecast from "./components/Forecast.jsx";
import InputBox from "./components/InputBox.jsx";
import TempAndDetails from "./components/TempAndDetails.jsx";
import TimeAndLocation from "./components/TimeAndLocation.jsx";
import TopButtons from "./components/TopButtons.jsx";
import getFormattedWeatherData from "./services/weatherService.js"; 

export default function WeatherApp() {
    const [query, setQuery] = useState({ q: "Kurnool" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);

    const getWeather = async () => {
        const data = await getFormattedWeatherData({ ...query, units });
        setWeather(data);
        // console.log(data); 
    };

    useEffect(() => {
        getWeather();
    }, [query, units]);

    const formatBackground = () => {
        if(!weather) return "from-cyan-600 to-blue-700";
        const threshold = units === "metric" ? 20 : 60;
        if(weather.temp <= threshold) return "from-cyan-600 to-blue-700";
        return "from-yellow-600 to-orange-700";
    }

    return (
        <div 
          className={`max-w-full max-h-full mx-auto py-5 px-4 lg:px-10 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}
        >
            <TopButtons setQuery={setQuery} />
            <InputBox setQuery={setQuery} setUnits={setUnits} />

            {/* Display Weather */}
            {weather && (
                <>
                    <TimeAndLocation weather={weather} />
                    <TempAndDetails weather={weather} units={units} />
                    <Forecast data={weather.hourly} title="3 hour step forecast" />
                    <Forecast data={weather.daily} title="Daily Forecast" />
                </>
            )}
        </div>
    );
}
