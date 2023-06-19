import React, { useEffect, useState } from 'react';
import Data from './Data';
const { kakao } = window; // kakao 객체 생성


export default function Map () {
      // geolocation 을 통해 사용자의 위치정보를 얻음
      // 위치정보를 얻는 것을 성공했을 떄 handleGeoSucc 실행

    navigator.geolocation.getCurrentPosition(handleGeoSucc);
    function handleGeoSucc(position) {
      const latitude = position.coords.latitude // 경도
      const longitude = position.coords.longitude // 위도
      getMap(latitude, longitude);
      getSiDo(latitude, longitude);
    }
  
    function getMap (lat,lon) { 
      // handleGeoSucc 에서 전달받은 경도와 위도 값을 넘겨받음
      const container = document.getElementById('map'); 
      // 지도를 생성할 DOM 요소
      const options = { // 지도의 옵션
        center: new kakao.maps.LatLng(lat, lon), // 현재 위치의 위도와 경도
        level : 5 // 확대,축소 값
       };
      const kakaoMap = new kakao.maps.Map(container, options); 
    }

    function getSiDo (lat,lon) {
      fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`,{
        method: "GET",
        headers: {
          "Authorization": `KakaoAK a5b7a199322f9ac423ee6a91c15b991c`
        }
      })
        .then(res => res.json())
        .then(data => {
          const siDo = data.documents[0].address.region_1depth_name
          const gunGu = data.documents[0].address.region_2depth_name
          Data(siDo,gunGu)
        })
      }

    return (
      <>
        <main className='p-8'>
        <div className='flex justify-center mb-8'>
          <button className='border mx-8 px-12 py-4 font-semibold text-xs'>지역</button>
          <button className='border mx-8 px-12 py-4 font-semibold text-xs'>지역</button>
          <button className='border mx-8 px-12 py-4 font-semibold text-xs'>지역</button>
        </div>
        <div className='h-full w-full lg:flex'>
          <div
            className='bg-gray-100 w-full h-96 relative lg:w-1/2'
          >
            <div className='absolute w-36 h-12 border bg-gray-300 top-5 left-5 text-center'>drop down</div>
          </div>
          <div
          id='map'
          className='w-full h-96 lg:w-1/2'
          >
          </div>
      </div>
        </main>
      </>
    );
};


