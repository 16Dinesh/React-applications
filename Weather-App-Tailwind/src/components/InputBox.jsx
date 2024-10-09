import { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

export default function InputBox({ setQuery, setUnits }) {
    const [city, setCity] = useState("");

    const handleSearchClick = () => {
        if (city !== "") setQuery({ q: city });
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords; // Corrected typo
                setQuery({ lat: latitude, lon: longitude });
            });
        }
    };

    const handleUnitChange = (unit) => {
        setUnits(unit);
    };

    return (
        <div className="flex flex-row justify-center my-6">
            <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
                <input
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    type="text"
                    placeholder="Search by city..."
                    className="text-gray-500 text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
                />
                <BiSearch
                    size={30}
                    className="cursor-pointer transition-transform ease-out hover:scale-125"
                    onClick={handleSearchClick}
                />
                <BiCurrentLocation
                    size={30}
                    className="cursor-pointer transition-transform ease-out hover:scale-125"
                    onClick={handleLocationClick}
                />
            </div>
            <div className="flex flex-row w-1/4 items-center justify-center">
                <button
                    className="text-2xl font-medium transition-transform ease-out hover:scale-125"
                    onClick={() => handleUnitChange("metric")}
                >
                    &deg;C
                </button>
                <p className="text-2xl font-medium mx-1">|</p>
                <button
                    className="text-2xl font-medium transition-transform ease-out hover:scale-125"
                    onClick={() => handleUnitChange("imperial")}
                >
                    &deg;F
                </button>
            </div>
        </div>
    );
}
