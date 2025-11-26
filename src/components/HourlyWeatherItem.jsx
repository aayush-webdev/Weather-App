import{ weatherCodes } from "../constants";

const HourlyWeatherItem = ({HourlyWeather}) => {
  const temperature = Math.floor(HourlyWeather.temp_c);
  const time = HourlyWeather.time.split(" ")[1].substring(0,5);
       const weatherIcon = Object.keys(weatherCodes).find((icon) => weatherCodes[icon].includes(HourlyWeather.condition.code));
  
  return (
     <li className="weather-item">
              <p className="time">{time}</p>
             <img src={`/icons/${weatherIcon}.svg`} className="weather-icon" />
              <p className="temperature">{temperature}°</p>
            </li>
  
  );
};

export default HourlyWeatherItem
