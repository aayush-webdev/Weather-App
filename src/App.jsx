import { useEffect, useState, useRef } from "react";
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeatherItem";
import { weatherCodes } from "./constants";
import NoResultsDiv from "./components/NoResultsDiv";

const App = () => {

  // ref for the search input field
  const searchInputRef = useRef(null);

  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForcast, setHourlyForcast] = useState([]);
  const [hasNoResults, setHasNoResults] = useState(false);

  const filterHourlyForcast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24hours = currentHour + 24 * 60 * 60 * 1000;

    const next24HoursData = hourlyData.filter(({ time }) => {
      const forcastTime = new Date(time).getTime();
      return forcastTime >= currentHour && forcastTime <= next24hours;
    });

    setHourlyForcast(next24HoursData);
  };

  // gets data from the API and updates the state
  const getWeatherDetails = async (API_URL) => {
    setHasNoResults(false);

    // avoid crashing when ref is not ready
    if (searchInputRef.current && window.innerWidth <= 768) {
      searchInputRef.current.value = "Your Location";
    }

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error();

      const data = await response.json();

      const tempreture = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(data.current.condition.code)
      );

      setCurrentWeather({ tempreture, description, weatherIcon });

      const HourlyData = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];

      if (searchInputRef.current) {
        searchInputRef.current.value = data.location.name;
      }

      filterHourlyForcast(HourlyData);
    } catch {
      setHasNoResults(true);
    }
  };

  useEffect(() => {
    const DEFAULT_API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=London&days=2`;
    getWeatherDetails(DEFAULT_API_URL);
  }, []);

  return (
    <div className="container">

      <SearchSection getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef} />

      {hasNoResults ? (
        <NoResultsDiv />
      ) : (
        <div className="weather-section">
          <CurrentWeather currentWeather={currentWeather} />

          <div className="hourly-forcast">
            <ul className="weather-list">
              {hourlyForcast.map((HourlyWeather) => (
                <HourlyWeatherItem
                  key={HourlyWeather.time_epoch}
                  HourlyWeather={HourlyWeather}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
