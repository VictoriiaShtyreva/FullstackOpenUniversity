import React, { useState, useEffect } from "react";
import CountryDetails from "./components/CountryDetails";
import axios from "axios";

const App = () => {
  const [countries, SetCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountriesName, setFilteredCountriesName] = useState([]);

  // fetching data
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://studies.cs.helsinki.fi/restcountries/api/all"
        );
        SetCountries(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  // for searching by name
  const handleSearchChange = (event) => {
    const newCountryName = event.target.value.toLowerCase();
    setCountryName(newCountryName);
    if (newCountryName === "") {
      setFilteredCountriesName([]);
    } else {
      const filteredCountries = countries.filter((country) => {
        const toLowerCountryName = country.name.common.toLowerCase();
        return toLowerCountryName.includes(newCountryName);
      });
      setFilteredCountriesName(filteredCountries);
    }
  };

  // for showing the selected country
  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    handleClear();
  };

  // clear input after Show Details about country
  const handleClear = () => {
    setCountryName("");
  };

  const renderSearchResults = () => {
    if (selectedCountry) {
      return <CountryDetails country={selectedCountry} />;
    } else if (filteredCountriesName.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filteredCountriesName.length > 1) {
      return (
        <ul>
          {filteredCountriesName.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleCountryClick(country)}>
                Show Details
              </button>
            </li>
          ))}
        </ul>
      );
    } else if (filteredCountriesName.length === 1) {
      return <CountryDetails country={filteredCountriesName[0]} />;
    } else {
      return <p>No countries found</p>;
    }
  };

  return (
    <div>
      <h1>Find countries</h1>
      <input
        type="text"
        placeholder="Search Country"
        value={countryName}
        onChange={handleSearchChange}
      />
      {renderSearchResults()}
    </div>
  );
};

export default App;
