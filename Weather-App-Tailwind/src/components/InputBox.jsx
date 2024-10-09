import { useState, useEffect } from "react";
import { BiSearch, BiCurrentLocation, BiX } from "react-icons/bi";

export default function InputBox({ setQuery, setUnits }) {
    const [city, setCity] = useState("");
    const [debouncedCity, setDebouncedCity] = useState(city);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedCity(city);
        }, 300); // Adjust the debounce time as needed

        return () => {
            clearTimeout(handler);
        };
    }, [city]);

    useEffect(() => {
        if (debouncedCity) {
            setQuery({ q: debouncedCity });
        }
    }, [debouncedCity, setQuery]);

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setQuery({ lat: latitude, lon: longitude });
                },
                (error) => {
                    console.error("Error getting location:", error.message);
                    alert("Unable to retrieve your location. Please check your browser settings.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleUnitChange = (unit) => {
        setUnits(unit);
    };

    const clearInput = () => {
        setCity("");
    };

    return (
        <div className="flex flex-col items-center my-6">
            <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
                <input
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    type="text"
                    placeholder="Search by city..."
                    className="text-gray-500 text-xl font-light p-2 w-full shadow-xl rounded-xl capitalize focus:outline-none placeholder:lowercase"
                    aria-label="City search input"
                />
                {city && (
                    <BiX
                        size={30}
                        className="cursor-pointer transition-transform ease-out hover:scale-125"
                        onClick={clearInput}
                        title="Clear input"
                    />
                )}
                <BiSearch
                    size={30}
                    className="cursor-pointer transition-transform ease-out hover:scale-125"
                    onClick={() => city && setQuery({ q: city })}
                    title="Search"
                />
                <BiCurrentLocation
                    size={30}
                    className="cursor-pointer transition-transform ease-out hover:scale-125"
                    onClick={handleLocationClick}
                    title="Use current location"
                />
            </div>
            <div className="flex flex-row w-1/4 items-center justify-center mt-4">
                <button
                    className="text-2xl font-medium transition-transform ease-out hover:scale-125"
                    onClick={() => handleUnitChange("metric")}
                    title="Switch to Celsius"
                >
                    &deg;C
                </button>
                <p className="text-2xl font-medium mx-1">|</p>
                <button
                    className="text-2xl font-medium transition-transform ease-out hover:scale-125"
                    onClick={() => handleUnitChange("imperial")}
                    title="Switch to Fahrenheit"
                >
                    &deg;F
                </button>
            </div>
        </div>
    );
}
