// import './css/styles.css';
// import { Notiflix } from 'notiflix';
// import debounce from 'lodash.debounce';
// // import { fetchCountries } from './fetchCountries';

// const DEBOUNCE_DELAY = 300;

//  const refs = {
//   searchQueary: document.querySelector('#search-box'),
//   countryList: document.querySelector('.country-list'),
//   countryInfo: document.querySelector('.country-info'),
//  };

//  let formValue = '';

// refs.searchQueary.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// function onInput(event) {
//     event.preventDefault();

//     formValue = refs.searchQueary.value.trim;

// fetchCountries(formValue)
//     .then(createCountriesList)
//     .catch(error => console.log(error));
// }



// function fetchCountries(name) {
//     return fetch('https://restcountries.com/v3.1/name/${name}')
//         .then(response => {
   
//             return response.json();
//         // })
//         // .then(createCountriesList)
        
//         // .catch(error => {
//         //     console.log(error);
//         });
// }

//  function createCountriesList(countries) {
//     const markup = countries
//     .map(country => {
//       return `<li class="country-item">
//       <img class='country-img' src="${country.flags.svg}" alt="flag">
//       <p class="country-name">${country.name.official}</p>
//     </li>`;
//     })
//     .join('');
//   refs.countryList.insertAdjacentHTML('beforeend', markup);
// }

// function createCountryInfo(countries) {
       
//     const markup = countries
//     .map(country => {
//       return `<p class="info-text">Capital: <span class="value">${country.capital}</span></p>
//       <p class="info-text">Population: <span class="value">${country.population}</span></p>
//       <p class="info-text">languages: <span class="value">${langs}</span></p>`;
//     })
//     .join('');
//   refs.countryInfo.insertAdjacentHTML('beforeend', markup);
// }
    
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchQueary: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

let formValue = '';

refs.searchQueary.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));


function onInput(e) {
  e.preventDefault();
  formValue = refs.searchQueary.value.trim();
  if (formValue === '') {
    clearRender();
    return;
  }

  fetchCountries(formValue)
    .then(countries => {
      if (countries.length === 1) {
        clearRender();
        renderCountryList(countries);
        renderCountryInfo(countries);
      } else if (countries.length > 1 && countries.length <= 10) {
        clearRender();
        renderCountryList(countries);
      } else if (countries.length > 10) {
        clearRender();
          Notiflix.info(
              'Too many mathces found. Please enter a more spesific name');
          
       
      }
    })
    .catch(catchError);
}

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country-item">
      <img class='country-img' width="30" height="20" src="${country.flags.svg}" alt="flag">
      <p class="country-name">${country.name.official}</p>
    </li>`;
    })
    .join('');
  refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function renderCountryInfo(countries) {
  const languages = Object.values(countries[0].languages).join(', ');
  const markup = countries
    .map(country => {
      return `<p class="info-text">Capital: <span class="value">${country.capital}</span></p>
      <p class="info-text">Population: <span class="value">${country.population}</span></p>
      <p class="info-text">languages: <span class="value">${languages}</span></p>`;
    })
    .join('');
  refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}

function clearRender() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function catchError() {
  clearRender();
   Notiflix.failure('Oops, there is no country with that name');
}