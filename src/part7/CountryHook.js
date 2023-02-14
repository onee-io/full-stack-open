import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    useEffect(() => {
        if (name.length > 0) {
            // 获取城市数据
            axios.get('https://restcountries.com/v3.1/all').then(res => {
                const result = res.data.find(item => item.name.common.toLowerCase() === name.toLowerCase());
                if (result) {
                    setCountry({
                        found: true,
                        data: {
                            name: result.name.common,
                            capital: result.capital,
                            population: result.population,
                            flag: result.flags.png
                        }
                    })
                } else {
                    setCountry({ found: false });
                }
            });
        }
    }, [name]);

    return country
}

const Country = ({ country }) => {
    if (!country) {
        return null
    }

    if (!country.found) {
        return (
            <div>
                not found...
            </div>
        )
    }

    return (
        <div>
            <h3>{country.data.name} </h3>
            <div>capital {country.data.capital} </div>
            <div>population {country.data.population}</div>
            <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
        </div>
    )
}

const CountryHook = () => {
    const nameInput = useField('text')
    const [name, setName] = useState('')
    const country = useCountry(name)

    const fetch = (e) => {
        e.preventDefault()
        setName(nameInput.value)
    }

    return (
        <div>
            <form onSubmit={fetch}>
                <input {...nameInput} />
                <button>find</button>
            </form>

            <Country country={country} />
        </div>
    )
}

export default CountryHook