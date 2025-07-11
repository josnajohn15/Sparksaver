import { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherSuggestion = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [devices, setDevices] = useState([]);
  const [deviceSuggestions, setDeviceSuggestions] = useState([]);

  // Mapping suggestions based on appliance and temperature
  const generateSuggestions = (temp, deviceList) => {
    const suggestions = [];

    deviceList.forEach(({ appliance }) => {
      switch (appliance) {
        case 'AC':
          if (temp > 30)
            suggestions.push('🌞 AC: Set to 24–26°C and use curtains to block sunlight.');
          break;
        case 'Fan':
          if (temp > 30)
            suggestions.push('💨 Fan: Use instead of AC and turn off when not needed.');
          break;
        case 'Geyser':
        case 'Heater':
          if (temp < 20)
            suggestions.push('❄ Heater/Geyser: Use only when necessary to save energy.');
          break;
        case 'Refrigerator':
          if (temp > 30)
            suggestions.push('🧊 Refrigerator: Keep doors closed and avoid storing hot food directly.');
          if (temp < 20)
            suggestions.push('🧊 Refrigerator: Set moderate cooling, not maximum.');
          break;
        case 'Microwave':
        case 'InductionCooker':
        case 'Oven':
          if (temp > 30)
            suggestions.push('🍳 Cooking Appliances: Avoid use during hottest hours.');
          if (temp < 20)
            suggestions.push('🍲 Cooking Appliances: Prefer indoor cooking to warm up space.');
          break;
        case 'Laptop':
        case 'TV':
        case 'SmartTVBox':
        case 'MobileCharger':
        case 'SmartSpeaker':
        case 'Router':
          suggestions.push( `${appliance}: Unplug when not in use to save standby power.`);
          break;
        case 'WashingMachine':
          if (temp < 20)
            suggestions.push('🧺 Washing Machine: Use cold water cycles to save heating energy.');
          break;
        case 'IronBox':
          if (temp > 30)
            suggestions.push('👕 IronBox: Use in early morning or evening to avoid heat.');
          break;
        case 'RoomCooler':
          if (temp > 30)
            suggestions.push('🆒 Room Cooler: Use with proper ventilation, not in sealed rooms.');
          break;
        case 'ElectricVehicle':
          if (temp > 30)
            suggestions.push('🚗 EV: Charge during night to avoid grid strain and heat.');
          break;
        case 'ElectricBlanket':
          if (temp < 20)
            suggestions.push('🛌 Electric Blanket: Turn off immediately after use.');
          break;
        default:
          suggestions.push(`💡 ${appliance}: Use only as needed to optimize energy.`);
      }
    });

    return suggestions;
  };

  // Fetch devices from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('devices');
    if (stored) {
      setDevices(JSON.parse(stored));
    }
  }, []);

  // Fetch weather based on location
  useEffect(() => {
    const fetchWeatherByLocation = async (lat, lon) => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;


        const res = await axios.get(url);
        const temp = res.data.main.temp;
        setWeather(temp);
        setLocation(res.data.name);

        const personalizedSuggestions = generateSuggestions(temp, devices);
        setDeviceSuggestions(personalizedSuggestions);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setDeviceSuggestions(['⚠ Unable to fetch weather data. Please allow location access.']);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByLocation(latitude, longitude);
          },
          error => {
            console.error('Geolocation error:', error);
            setDeviceSuggestions(['⚠ Location access denied. Using default city.']);
            fetchWeatherByLocation(9.9312, 76.2673); // Kochi fallback
          }
        );
      } else {
        setDeviceSuggestions(['⚠ Geolocation not supported by this browser.']);
      }
    };

    if (devices.length > 0) {
      getLocation();
    }
  }, [devices]);

  // Styling
  const containerStyle = {
    background: 'linear-gradient(135deg, #000000, #1a1a1a)',
    color: '#ffd700',
    padding: '2rem',
    borderRadius: '15px',
    marginTop: '2rem',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    transition: 'all 0.3s ease-in-out',
  };

  const titleStyle = {
    fontSize: '1.6rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffea00',
  };

  const tempStyle = {
    fontSize: '1.2rem',
    marginBottom: '1rem',
  };

  const suggestionStyle = {
    fontSize: '1rem',
    fontStyle: 'italic',
    lineHeight: '1.6',
    color: '#ffff66',
    marginBottom: '0.5rem',
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>🌦 Weather-Based Energy Suggestions</h3>
      {weather !== null ? (
        <>
          <p style={tempStyle}>
            Current Temperature in <strong>{location}</strong>: <strong>{weather}°C</strong>
          </p>
          {deviceSuggestions.map((s, idx) => (
            <p style={suggestionStyle} key={idx}>{s}</p>
          ))}
        </>
      ) : (
        <p style={suggestionStyle}>Loading weather data and suggestions...</p>
      )}
    </div>
  );
};

export default WeatherSuggestion;