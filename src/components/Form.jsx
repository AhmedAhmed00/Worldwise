
import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from './Message';
import Spinner from './Spinner';
import { useCities } from "../Context/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {

  const { createCity } = useCities()

  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [emoji, setEmoji] = useState("")
  const [codingError, setCodingError] = useState("");
  const { isLoading: isLoadingCity } = useCities()


  useEffect(() => {
    if (!lat && !lng) return
    async function fetchCityData() {
      try {
        setCodingError("")
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        const cityData = await res.json()
        if (!cityData.city) throw new Error('This is not a city, click somewhere else')
        setCityName(cityData.city)
        setCountry(cityData.countryName)
        setEmoji(convertToEmoji(cityData.countryCode))
        console.log(cityData.city);
      }


      catch (err) {
        setCodingError(err.message)
      } finally {
        setIsLoadingGeocoding(false)
      }

    }
    fetchCityData()



  }, [lat, lng])




  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes, position: { lat, lng }
    }
    await createCity(newCity)
    navigate('/app/form')

  }

  if (isLoadingGeocoding) return <Spinner />
  if (!lat && !lng) return <Message message={"start by clicking any city"} />

  if (codingError) return <Message message={codingError} />

  return (
    <form className={`${styles.form} ${isLoadingCity ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" dateFormat='dd/MM/yyyy' selected={date} onChange={(date) => {
          setDate(date)
        }} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton>&larr; Back</BackButton>
      </div>
    </form >
  );
}

export default Form;
