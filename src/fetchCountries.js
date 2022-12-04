// function fetchCountries(name)
// const URL = 'https://restcountries.com/v3.1/name/{name}';
// fetch('https://restcountries.com/v3.1/name/peru')
//     .then(response => {
   
//     return response.json();
//     })
//     .then(name => {
//         console.log(name);
      
// })
//     .catch(error => {
//         console.log(error);
//     });


// import axios from 'axios';

// export function fetchCountries(name) {
//   return axios
//     .get(
//       `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//     )
//     .then(({ data }) => data);
// }



function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => response.json())
}

export default { fetchCountries };