const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();
const API_KEY = '5bf1d8d6dfc016857c1aec6c697a72be';

const getWeatherForMonth = async () => {
    let city = 'Kiev,ua';

    if (localStorage.getItem('userLocation')) {
        city = localStorage.getItem('userLocation');
    } else {
        try {
            const location = await getLocation();
            const { latitude, longitude } = location;
            const locationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
            const data = await fetchApiData(locationApiUrl);
            city = `${data.name},${data.sys.country.toLowerCase()}`;
            localStorage.setItem('userLocation', city);
        } catch (error) {
            console.error('Failed to retrieve weather forecast data.', error);
            return {};
        }
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    const forecastData = await fetchApiData(apiUrl);

    return forecastData.list.reduce((acc, item) => {
        const forecastDate = new Date(item.dt * 1000);
        const forecastDayOfMonth = forecastDate.getDate();
        const forecastMonth = forecastDate.getMonth();
        const forecastYear = forecastDate.getFullYear();

        if (forecastMonth === currentMonth && forecastYear === currentYear) {
            if (!acc[forecastDayOfMonth]) {
                acc[forecastDayOfMonth] = [];
            }
            acc[forecastDayOfMonth].push(item);
        }
        return acc;
    }, {});
};

const fetchApiData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
};

const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
        }, reject);
    });
};

const generateCalendar = async () => {
    const calendarBody = document.getElementById("calendar-body");
    const currentDay = today.getDate();
    const startDay = (new Date(currentYear, currentMonth, 1).getDay() || 7) - 1; 
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    const dailyForecasts = await getWeatherForMonth();

    for (let i = 0, currentDate = 1; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if ((i === 0 && j >= startDay) || (i > 0 && currentDate <= totalDays)) {
                const dayContent = createDayElement(currentDate, currentDay, dailyForecasts[currentDate]);
                cell.appendChild(dayContent);
                currentDate++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
};

const createDayElement = (day, currentDay, forecast) => {
    const daySpan = document.createElement('span');
    daySpan.className = "day";

    const dayNumberSpan = document.createElement('span');
    dayNumberSpan.className = "dayNumber";
    dayNumberSpan.textContent = day;

    if (day === currentDay) {
        dayNumberSpan.classList.add('highlighted');
    }

    daySpan.appendChild(dayNumberSpan);

    if (forecast && forecast.length) {
        const maxTempForDay = Math.max(...forecast.map(item => item.main.temp_max));
        const minTempForDay = Math.min(...forecast.map(item => item.main.temp_min));
        const iconCode = forecast[0].weather[0].icon;

        appendWeatherToDay(daySpan, maxTempForDay, minTempForDay, iconCode);
    }

    return daySpan;
};

const appendWeatherToDay = (daySpan, maxTemp, minTemp, iconCode) => {
    const maxTempSpan = document.createElement('span');
    maxTempSpan.className = "temp max-temp";
    maxTempSpan.textContent = `${maxTemp}°C`;
    daySpan.appendChild(maxTempSpan);

    const weatherIcon = document.createElement('img');
    weatherIcon.src = `http://openweathermap.org/img/w/${iconCode}.png`;
    weatherIcon.alt = "Weather Icon";
    weatherIcon.className = "weatherIcon";
    daySpan.appendChild(weatherIcon);

    const minTempSpan = document.createElement('span');
    minTempSpan.className = "temp min-temp";
    minTempSpan.textContent = `${minTemp}°C`;
    daySpan.appendChild(minTempSpan);
};

generateCalendar();
