import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";


const TempAndDetails = ({weather: {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    sunrise, 
    sunset,
    details, 
    icon,
    speed },units}) => {

    const weatherDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty,
            title : "Real Feel",
            value: `${feels_like.toFixed()}°`
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title : "Humidity",
            value: `${humidity} %`
        },
        {
            id: 3,
            Icon: FiWind,
            title : "Wind",
            value: `${speed} ${units === "metric"? "km/h" : "m/s"}`
        },
    ];

    const SunNMoonDetails = [
        {
            id: 1,
            Icon: GiSunrise,
            title : "Sunrise",
            value: sunrise
        },
        {
            id: 2,
            Icon: GiSunset,
            title : "SunSet",
            value: sunset
        },
        {
            id: 3,
            Icon: MdKeyboardArrowUp,
            title : "High",
            value: `${temp_max.toFixed()}°`
        },
        {
            id: 4,
            Icon: MdKeyboardArrowDown,
            title : "Low",
            value: `${temp_min.toFixed()}°`
        },
    ]

  return (
    <div>
        <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
            <p>{details}</p>
        </div>

        <div className="flex flex-row items-center justify-between py-3">
            <img
                src={icon}
                alt="Weather Icon"
                className="w-20"
            />
            <p className="text-5xl">{`${temp.toFixed()}`}&deg;</p>

            <div className="flex flex-col space-y-3 items-start">

                {
                    weatherDetails.map(({id,Icon,title,value}) => (
                        <div key={id} className="flex font-light text-sm items-center justify-center">
                            <Icon size={18} className="mr-1"/>
                            {`${title}`} <span className="font-medium ml-1">{value}</span>
                        </div>
                    ))}
            </div>
        </div>

        <div className="flex flex-row items-center justify-center space-x-4 sm:space-x-10 text-sm py-3">
    {
        SunNMoonDetails.map(({ id, Icon, title, value }) => (
            <div key={id} className="flex flex-row items-center">
                <Icon size={30} />
                <p className="font-light ml-1 text-xs sm:text-sm">
                    {`${title} :`}
                    <span className="font-medium ml-1">{value}</span>
                </p>
            </div>
        ))
    }
</div>

    </div>
  )
}

export default TempAndDetails