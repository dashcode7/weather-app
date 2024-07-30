
document.querySelector('#city').addEventListener('keypress', function (event){
  if(event.key == 'Enter' && event.target.value.length >0){
  getcities(event.target.value)
  }
  if(event.target.value.length == 0){
    let cityelement = document.querySelectorAll('.cities')[0];
    cityelement.parentElement.classList.remove('-open')
  }

})

async function getData(data) {
  resetdata();
  let key = '39fbd5e6a6d3bf85a93c31b60b7112ad'
  let lon;
  let lat;
  if(data == null){
 lat =11.916064;
 lon=79.812325; 
}
else{
lat = data.latitude;
lon=data.longitude;
}
const apiURl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
  let weather_data = {};

  try {
    let res = await fetch(apiURl)
    res = await res.json()
    weather_data.main = res.main;
    [weather_data.weather] = res.weather;
    weather_data.wind = res.wind;
    weather_data.station = res.name;
    if(data == null){
      document.querySelector('#city').value = weather_data.station
    }
   loaddata(weather_data)
  
  }
  catch (error) {
    console.log(error)
  }

}

(function () {
  getData(null);
})()

function loaddata(data)
{
  let image_parent = document.querySelectorAll('.img')[0];
  let weather_parent =  document.querySelectorAll('.weather')[0];
  let desc_parent =  document.querySelectorAll('.desc')[0];
let image = document.createElement('img')
image.setAttribute('src',`https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`)
let temp = document.createElement('span')
temp.textContent = `${parseInt(data.main.temp - 273.15)} °C`
image_parent.appendChild(image)
weather_parent.appendChild(temp);
let desc = `<span>${data.weather.description}</span> <span>Feels like ${parseInt(data.main.feels_like - 273.5)} °C</span>`
desc_parent.innerHTML=desc
loadAdditional(data)
}

function loadAdditional(data)
{
  let humidity_parent = document.querySelectorAll('.humidity')[0];
  let wind_parent = document.querySelectorAll('.wind-speed')[0];
  let pressure_parent = document.querySelectorAll('.pressure')[0];

  let humidity = document.createElement('img')
  humidity.setAttribute('src','assets/images/humidity.svg')
  humidity_parent.appendChild(humidity)
  let h_text = document.createElement('span')
  h_text.textContent = `${data.main.humidity}%`
  humidity_parent.appendChild(h_text); 

  let wind = document.createElement('img')
  wind.setAttribute('src','assets/images/wind.svg')
  wind_parent.appendChild(wind)
  let w_text = document.createElement('span')
  w_text.textContent = `${data.wind.speed}`
  wind_parent.appendChild(w_text); 

  let pressure = document.createElement('img')
  pressure.setAttribute('src','assets/images/pressure.svg')
  pressure_parent.appendChild(pressure)
  let p_text = document.createElement('span')
  p_text.textContent = `${data.main.pressure} mb`
  pressure_parent.appendChild(p_text); 




}

async function getcities(city){
 let cities=[];
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${city}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'a935ce551emshc3db291f65f3b12p1c093cjsncf2e70d2b023',
		'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
	}
};
try {
	const response = await fetch(url, options);
	cities = await response.json();
	console.log(cities);
  let cityelement = document.querySelectorAll('.cities')[0];
  cityelement.innerHTML='';
cities = cities.data;
if(cities.length >0){
for(let i=0;i<cities.length;i++){
  let ele= document.createElement('div')
  ele.classList.add('city')
  ele.textContent = `${cities[i].name} - ${cities[i].countryCode}`
  ele.addEventListener('click',()=>{
    document.querySelector('#city').value = cities[i].name
    getwetaher(cities[i])
  })
  cityelement.appendChild(ele)
}
cityelement.parentElement.classList.add('-open')
}
else{
  cityelement.parentElement.classList.remove('-open')
}
} catch (error) {
	console.error(error);
}
}
function getwetaher(data){
  let cityelement = document.querySelectorAll('.cities')[0];
  cityelement.parentElement.classList.remove('-open')
 getData(data);
}
function resetdata(){
  document.querySelectorAll('.img')[0].innerHTML='';
   document.querySelectorAll('.weather')[0].innerHTML='';
  document.querySelectorAll('.desc')[0].innerHTML='';
  document.querySelectorAll('.humidity')[0].innerHTML='';
  document.querySelectorAll('.wind-speed')[0].innerHTML='';
   document.querySelectorAll('.pressure')[0].innerHTML='';
}