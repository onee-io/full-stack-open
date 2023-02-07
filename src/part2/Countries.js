import axios from 'axios';
import { useEffect, useState } from 'react';

const Countries = () => {
    console.log(process.env.REACT_APP_API_KEY);
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // 获取城市数据
        axios.get('https://restcountries.com/v3.1/all').then(res => {
            setCountries(res.data);
        });
    }, []);

    const handleChange = (event) => setSearch(event.target.value);

    const countriesToShow = search.length > 0
        ? countries.filter(country => country.name.common.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1)
        : countries;

    return (
        <div>
            <p>find countries</p><input value={search} onChange={handleChange} />
            <CountryList countries={countriesToShow}></CountryList>
        </div>
    );
}

const CountryList = ({ countries }) => {
    console.log(countries.length);
    if (countries.length > 10) {
        return (
            <div>
                <p>Too many matchs, specify another filter</p>
            </div>
        )
    } else if (countries.length > 1) {
        return (
            <div>
                {countries.map(country =>
                    <CountrySimple key={country.area} country={country} />
                )}
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <CountryInfo country={countries[0]}></CountryInfo>
        )
    } else {
        return (
            <p>No data</p>
        )
    }
}

const CountrySimple = ({ country }) => {
    const [isShowDetail, setIsShowDetail] = useState(false);
    return (
        <div>
            {country.name.common}
            <button onClick={() => setIsShowDetail(!isShowDetail)}>{isShowDetail ? 'hide' : 'show'}</button>
            {isShowDetail ? <CountryInfo country={country} display={isShowDetail} /> : ''}
        </div>
    )
}

const CountryInfo = ({ country }) => (
    <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>ares {country.area}</p>
        <h2>languages:</h2>
        <ul>
            {Object.keys(country.languages).map(lang =>
                <li key={lang}>{country.languages[lang]}</li>
            )}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <h1>Weather in {country.capital[0]}</h1>
        <Weather lat={country.latlng[0]} lng={country.latlng[1]} />
    </div>
)

const Weather = ({ lat, lng }) => {
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        // 根据地理位置获取天气数据
        axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`).then(res => {
            setWeather(res.data);
        });
    }, [apiKey, lat, lng]);
    if (weather) {
        return (
            <div>
                <p>temperature {weather.current.temp}℃</p>
                <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt='weather' />
                <p>wind {weather.current.wind_speed}m/s</p>
            </div>
        )
    } else {
        return <p>No data</p>
    }
}

export default Countries;