const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const inputCity = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

searchButton.addEventListener('click', () => {
    const APIKey = 'cc8f16175953970679e32a8e1d9772e6';
    const city = inputCity.value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperatura = document.querySelector('.weather-box .temperatura');
            const descricao = document.querySelector('.weather-box .descricao');
            const humidade = document.querySelector('.weather-details .humidade span');
            const vento = document.querySelector('.weather-details .vento span');

            // Aplicando as imagens corretas e atualizando os textos
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'assets/img/clear.png';
                    break;
                case 'Rain':
                    image.src = 'assets/img/rain.png';
                    break;
                case 'Snow':
                    image.src = 'assets/img/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'assets/img/cloud.png';
                    break;
                case 'Haze':
                    image.src = 'assets/img/mist.png';
                    break;
                default:
                    image.src = ''; // caso padrão ou não identificado
            }

            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            descricao.innerHTML = json.weather[0].description;
            humidade.innerHTML = `${json.main.humidity}%`;
            vento.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        })
        .catch(error => {
            console.error('Failed to fetch data: ', error);
        });
});
