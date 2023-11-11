import React, { useEffect, useState } from 'react';
import './style.css';

// V komponentě JourneyPicker si připravte funkci handleSubmit(event), která se bude volat při odeslání formuláře. Ošetřete, aby prohlížeč sám neodesílal formulář a zatím si ve funkci jen vypište do konzole text 'Odesílám formulář s cestou'.
// Napojte funkci handleSubmit na událost submit ve formuláři. Ověřte v prohlížeči, že po kliknutí na Vyhledat spoj se v konzoli objeví výše uvedený text.
// Pomocí useState si v komponentě připravte tři stavy: fromCity, toCity a date. Výchozí hodnotou bude ve všech třech případech prázdný řetězec '';
// Napojte každý ze stavů na správý <select> tak, aby select zobrazoval vybraný stav a změna v selectu se promítla do stavu. Vytvoříte tedy dvoucestný databinding, kdy se např. stav fromCity bude promítat do value příslušného selectu, a při události onChange na selectu se nová hodnota zapíše do stavu fromCity. Obdobně i pro další dva selecty a stavy toCity a date.
// Upravte funkci handleSubmit tak, aby do konzole vypsala všechny tři stavy. Vyzkoušejte, že výběrem stavu v selectu se změní stav – po kliknutí na tlačítko se do konzole vypíše změněný stav. Tím, že si dočasně změnít výchozí hodnotu v useState('') na některou z hodnot (atribut value) v <option> můžete ověřit, že funguje správně nastavení výchozího stavu selectu.
// Commitněte změny.



// *komponenta CityOptions očekává props `cities`, což má být pole objektů, každý objekkt v poli má obsahovat property `code` a `name`
const CityOptions = ({ cities }) => {
  return cities.map((city) => <option key={city.code} value={city.code}>{city.name}</option>);
  // <>
  //     <option value="mesto01">Město 01</option>
  //     <option value="mesto02">Město 02</option>
  //     <option value="mesto03">Město 03</option>
  //     <option value="mesto04">Město 04</option>
  //     <option value="mesto05">Město 05</option>
  // </>
  // )
};


export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [date, setDate] = useState('')
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const resp = await fetch("https://apps.kodim.cz/daweb/leviexpress/api/cities")
      if (!resp.ok) {
        alert('Něco je špatně')
        return
      }
      const data = await resp.json()
      setCities(data.results)
      // setCities([
      //   { name: 'Praha', code: 'CZ-PRG' },
      //   { name: 'Brno', code: 'CZ-BRQ' },
      // ])
    }
    fetchCities()
  }, [])



  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(`odesílám formulář z ${fromCity} do ${toCity} na ${date}`)
  }



  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>

      <div className="journey-picker__body">
        <form className="journey-picker__form" onSubmit={handleSubmit}>
          <label>
            <div className="journey-picker__label">Odkud:</div>

            <select
              value={fromCity}
              onChange={(event) => setFromCity(event.target.value)}>
              <option value="">Vyberte</option>
              <CityOptions cities={cities} />
            </select>

          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select
              value={toCity}
              onChange={(event) => setToCity(event.target.value)}>
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select
              value={date}
              onChange={(event) => setDate(event.target.value)}>
              <option value="">Vyberte</option>
              <option value="datum01">Datum 01</option>
              <option value="datum02">Datum 02</option>
              <option value="datum03">Datum 03</option>
              <option value="datum04">Datum 04</option>
              <option value="datum05">Datum 05</option>
            </select>
          </label>
          <div className="journey-picker__controls">
            <button
              className="btn"
              type="submit"
            >
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
}
