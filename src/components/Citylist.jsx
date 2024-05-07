
import styles from './Citylist.module.css'
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';

import { useCities } from '../Context/CitiesContext';

export default function Citylist() {


  const { cities, isLoading } = useCities()


  if (isLoading) return <Spinner />
  if (!cities.length) return <Message />

  return <ul className={styles.cityList}>
    {cities.map((city) => <CityItem city={city} key={city.id} />)}

  </ul>

}



