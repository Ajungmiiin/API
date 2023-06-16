import { useEffect, useState } from 'react';
export default Weather;

// function FetchData() {
//   navigator.geolocation.getCurrentPosition((position) => {
//     console.log(position.coords.latitude)
//     console.log(position.coords.longitude)

//     let lat = position.coords.latitude
//     let lon = position.coords.longitude
//     const base = "https://api.openweathermap.org/data/2.5/";
//     const key ="12cf99c35db830ceeb7bc888be1ec4ce";
//     const promise = fetch(`${base}weather?lat=${lat}&lon=${lon}&appid=${key}`)
//     .then( res => {
//       if (!res.ok) {
//         throw res;
//       }
//       return res.json()
//     })
//     return promise
//   })
// }

navigator.geolocation.getCurrentPosition((location, error) => {
  if (error) {
    console.log("not find your location")
  }
  const {latitude, longitude} = location.coords
  console.log(latitude)
  console.log(longitude)
  const base = "https://api.openweathermap.org/data/2.5/"
  const key ="12cf99c35db830ceeb7bc888be1ec4ce"
})

function Weather() {

}
