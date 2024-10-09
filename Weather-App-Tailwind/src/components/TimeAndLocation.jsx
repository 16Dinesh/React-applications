export default function TimeAndLocation({weather : {localTime, name, country}}) {
    // console.log(formatToLocalTime)
    return (
        <div>
            <div className="flex items-center justify-center my-6">
                <p className="text-xl font-extralightY">
                    {localTime}
                </p>
            </div>

            <div className="flex items-center justify-center my-3">
                <p className="text-3xl font-medium">{`${name}, ${country}`}</p>
            </div>
        </div>
    )
}