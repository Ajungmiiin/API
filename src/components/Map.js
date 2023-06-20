import React, { useEffect, useState} from 'react';


export default function Map () {
  // geolocation 을 통해 사용자의 위치정보를 얻음
  const [sidoName, setSidoName] = useState()
  const [cityName, setCityName] = useState()
  const [pm, setPm] = useState()
  const [aerosol, setAerosol] = useState()
  const [coValue , setCoValue] = useState()
  const [oValue, setOValue] = useState()

  const [coords, saveCoords] = useState(); // 현재 위치의 위도와 경도
  const [name, setName] = useState() // 도시의 이름
  const [temp, setTemp] = useState(); // 현재 날씨 온도
  const [weather, setWeather] = useState() // 현재 날씨 상태

  // 사용자의 현재 위치한 좌표값을 알아내는 함수
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude // 경도
    const longitude = position.coords.longitude // 위도
    getSiDo(latitude, longitude);
    getWeather(latitude, longitude);
  });
  // 좌표를 통해 주소를 알아내는 api (카카오)
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
        getData(siDo,gunGu)
       })
  }

  function getData (siDo,gunGu) {
    const serviceKey = 'LgZUP47Qw1wq%2Fsk9qTEd3%2F8iWrddFDcGvqN4Ju7jLwyLl%2FSFIqWnVPdjRWfVdCUg%2F2jqorOjOBi0b7vZ%2Fkvftw%3D%3D'
    const endPoint = 'https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst'
    const numOfRows = 10;
    const pageNo = 1;
      fetch(`${endPoint}?serviceKey=${serviceKey}&returnType=json&numOfRows=${numOfRows}&pageNo=${pageNo}&sidoName=${siDo}&searchCondition=DAILY`)
        .then (res => res.json())
        .then(data => {
        // 현재 위치한 지역에 맞는 아이템 추출
          const res = data.response.body.items
          const currentLocation = res.find((el,i) => {
            if (res[i].cityName === gunGu){
                return true
            }
          })
          setSidoName(currentLocation.sidoName)
          setCityName(currentLocation.cityName)
          setCoValue(currentLocation.coValue)
          setPm(currentLocation.pm10Value)
          setAerosol(currentLocation.pm25Value)
          setOValue(currentLocation.o3Value)
       })
  }

  function getWeather(lat, lon) {
    const base = "https://api.openweathermap.org/data/2.5/" // API 주소
    const key ="12cf99c35db830ceeb7bc888be1ec4ce" //API 키값
    fetch(`${base}weather?lat=${lat}&lon=${lon}&appid=${key}`) 
      .then(res => res.json()) // API 주소를 통해 응답받은 파일은 json 으로 변환
      .then(data => { // json 으로 변환된 data 사용
        const name = data.name.toUpperCase() // 도시 이름을 대문자로 변환
        const temp = Math.round(data.main.temp - 273.15); // 섭씨온도로 변환
        const weather = data.weather[0] // weather 배열의 0번째 인덱스 정보 저장
        setTemp(`${temp}°C`) // 저장된 temp 변수 값에 기호 붙히기
        setWeather(weather.main) // weather의 0번쨰 객체 데이터 중 main 값 불러오기
        setName(name) // 대문자로 변환된 도시 이름 저장
      })
  }
  // 그날 날씨에 따른 아이콘을 불러오는 함수
  const weatherIcon = () => { 
      if (weather === "Clear") {
        return "https://openweathermap.org/img/wn/01d@2x.png"
      } else if ( weather === "Clouds") {
        return "https://openweathermap.org/img/wn/02d@2x.png"
      } else if ( weather === "Rain") {
        return "https://openweathermap.org/img/wn/09d@2x.png"
      } else if ( weather === "Thunderstorm") {
        return "https://openweathermap.org/img/wn/11d@2x.png"
      } else if ( weather === "Snow") {
        return "https://openweathermap.org/img/wn/13d@2x.png"
      } else if ( weather === "Mist") {
        return "https://openweathermap.org/img/wn/50d@2x.png"
      }
  }
    return (
      <>
      <div className='w-64 flex justify-center items-center pr-6 absolute left-0 h-24 lg:left-28'>
        <img src={weatherIcon()} alt="" />
          <strong className='text-xl'>
            {name}
            <span className='text-red-500 ml-2'>{temp}</span>
          </strong>
      </div>
        <main className='p-8'>
          <div className='h-full w-full lg:flex'>
            <div className='lg:w-full'>
            <strong className='block text-center p-8 text-3xl'>{sidoName} {cityName}</strong>
              <ul className='w-full flex flex-wrap justify-center'>
                <li className='text-center w-96 h-300 py-24 m-4 rounded-3xl border'
                  style={
                    pm < 51 ? {backgroundColor:'#66ff00'} : 
                    pm < 101 ? {backgroundColor:'#0066ff'} :
                    pm < 250 ? {backgroundColor:'#ff0066'} :
                    {backgroundColor:'#ff0000'}
                  }>
                  <h3 className='my-4 text-3xl font-semibold text-white'>미세먼지 농도</h3>
                  <strong className='text-2xl text-white'>{pm} m3</strong>
                </li>
                <li className='text-center w-96 h-300 py-24 m-4 rounded-3xl border'
                  style={
                    pm < 51 ? {backgroundColor:'#66ff00'} : 
                    pm < 101 ? {backgroundColor:'#0066ff'} :
                    pm < 250 ? {backgroundColor:'#ff0066'} :
                    {backgroundColor:'#ff0000'}
                  }>
                  <h3 className='my-4 text-3xl font-semibold text-white'>초 미세먼지 농도</h3>
                  <strong className='text-2xl text-white'>{aerosol} m3</strong>
                </li>
                <li className='text-center w-96 h-300 py-24 m-4 rounded-3xl border'
                  style={
                    coValue < 30 ? {backgroundColor:'#0066ff'} : 
                    coValue < 500 ? {backgroundColor:'#ff0066'} :
                    {backgroundColor:'#ff0000'} 
                  }>
                  <h3 className='my-4 text-3xl font-semibold text-white'>일산화탄소 평균농도</h3>
                  <strong className='text-2xl text-white'>{coValue} ppm</strong>
                </li>
                <li className='text-center w-96 h-300 py-24 m-4 rounded-3xl border'
                  style={
                    oValue < 0.030 ? {backgroundColor:'#66ff00'} : 
                    oValue < 0.090 ? {backgroundColor:'#0066ff'} :
                    {backgroundColor:'#ff0000'} 
                  }>
                  <h3 className='my-4 text-3xl font-semibold text-white'>오존 평균농도</h3>
                  <strong className='text-2xl text-white'>{oValue} ppm</strong>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </>
    );
};


