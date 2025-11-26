const SearchSection = ({ getWeatherDetails,searchInputRef }) => {
  // const API_KEY = import.meta.env.VITE_API_KEY;
  const API_KEY = import.meta.env.VITE_API_KEY;

  //handels city search from submission
  const handleCitySearch =(e) =>{
 e.preventDefault();
 const searchInput = e.target.querySelector(".search-input");
 const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&q${searchInput.value}&days=2`;
 getWeatherDetails(API_URL);//fetch weather details
  };
  //handels location search
  const handleLcationSearch = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords; 
      const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
      getWeatherDetails(API_URL); //fetch weather details
      window.innerWidth >= 768 && (searchInputRef.current.value = "Your Location");
    });
  }
  return (
    <div className="search-section">
        <form action="#" className="search-form" onSubmit={handleCitySearch}>
          
          <span className="material-symbols-outlined">search</span>
          <input type="search" placeholder="Enter a City Name" ref={searchInputRef} className="search-input" required />
        </form>
        <button className="location-button" onClick={handleLcationSearch}>
          <img src="/my-location.svg" alt="" />
        </button>
      </div>
  );
};

export default SearchSection
