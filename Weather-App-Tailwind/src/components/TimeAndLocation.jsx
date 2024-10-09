export default function TimeAndLocation({weather : {localTime, name, country}}) {
    
    return (
        <div className="time-location-container">
    <div className="flex items-center justify-center my-6">
        <p className="text-xl font-light">
            {localTime ? localTime : "Loading..."}
        </p>
    </div>

    <div className="flex items-center justify-center my-3">
        <p className="text-3xl font-semibold">
            {name && country ? `${name}, ${country}` : "Location not available"}
        </p>
        </div>
    </div>
    )
}