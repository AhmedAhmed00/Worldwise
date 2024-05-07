import Spinner from './Spinner';

import Message from './Message';
import styles from './CountryList.module.css'
import CountryItem from './CountryItem';

import { useCities } from '../Context/CitiesContext';

export default function CountriesList() {


    const { cities, isLoading } = useCities()


    if (isLoading) return <Spinner />
    if (!cities.length) return <Message />
    const countries = cities.map(city => { return { country: city.country, emoji: city.emoji, id: city.id } })
    return <ul className={styles.countryList}>
        {countries.map((country) => <CountryItem country={country} key={country.id} />)}
    </ul>

}



