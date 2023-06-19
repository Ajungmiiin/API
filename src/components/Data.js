import { useEffect, useState } from 'react';
import Map from './Map';
export default Data


function Data (siDo,gunGu) {

  const serviceKey = 'LgZUP47Qw1wq%2Fsk9qTEd3%2F8iWrddFDcGvqN4Ju7jLwyLl%2FSFIqWnVPdjRWfVdCUg%2F2jqorOjOBi0b7vZ%2Fkvftw%3D%3D'
  const endPoint = 'https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst'
  const numOfRows = 10;
  const pageNo = 1;
  const promise = fetch(`${endPoint}?serviceKey=${serviceKey}&returnType=json&numOfRows=${numOfRows}&pageNo=${pageNo}&sidoName=${siDo}&searchCondition=DAILY`)
  .then (res => res.json())
    .then(data => {
      const res = data.response.body.items
      console.log(res)
      res.forEach((item,index) => {
      
      });
    })
}

// function Data (siDo,gunGu) {
  // const serviceKey = 'lI4QugC17nmC8VBM9kZD47QHISfjPfmfQ2vseKTIoZS9UFLyvy18Ie10lRX99AhGAwGoVUk7%2FcX3xtKqhPYHLQ%3D%3D'
  // const endPoint = 'http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst'
//   const type = 'json'
  // const numOfRows = 10;
  // const pageNo = 1;
  // const promise = fetch(`${endPoint}?serviceKey=${serviceKey}&returnType=${type}&numOfRows=${numOfRows}&pageNo=${pageNo}&sidoName=${siDo}&searchCondition=DAILY`)
//     .then(res => res.json())
//     .then(data => {
//       const res = data.response.body.items
//       console.log(res)
//       res.forEach((item,index) => {
//         let resObj = res[index]
//         if ( resObj.cityName === gunGu) {
//           res = resObj
//         }
//       });
//     })
// }