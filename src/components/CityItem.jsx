import React from 'react'
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom';
import { useCities } from '../Context/CitiesContext';



const formatDate = (date) =>
    new Intl.DateTimeFormat("ar", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));


export default function CityItem({ city }) {

    const { deleteCity } = useCities()
    const { cityName, emoji, date, id, position } = city
    return (
        <li >
            <Link className={styles.cityItem} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={(e) => {
                    e.preventDefault()
                    deleteCity(id)
                }}>&times;</button>
            </Link>
        </li>
    )
}