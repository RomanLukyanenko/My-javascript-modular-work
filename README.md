# My-javascript-modular-work. Here is the link - https://romanlukyanenko.github.io/My-javascript-modular-work/

# This webpage is an interactive demonstration of three distinct modules, each presented in the form of an animated card.

Each module is implemented as a "card" with two "surfaces". The first surface contains the module's name and icon and is clickable – leading to the respective page or function. The second surface provides a detailed description of the module. When a user hovers over a card, it animates to flip, revealing the additional information.

The page's design is minimalist, employing dark tones and neon accents, which gives the interface a modern and stylish look. For added dynamics in the background, the Three.js library is used to create an interactive 3D backdrop. The page also features a digital clock and calendar, designed in a retro aesthetic using the "Share Tech Mono" font.

# Here's a detailed description of each modul: 

# Guess the Tiles
Is an interactive game designed to enhance memory. The game encourages users to flip tiles and find pairs with matching numbers. Every new game shuffles the tiles, making each round a unique memory challenge.

# Calendar + Weather 
Is a module that displays the current month in a calendar format, showcasing the weather for each day. The weather data is sourced from the OpenWeatherMap API. Users can view the weather either for their current location or for a city saved in the browser's local storage.

1. Weather Data Retrieval:
* The system retrieves data for the current month and year.
* By default, the weather is displayed for the city of Kyiv, Ukraine.
* If the user's location information is stored in localStorage, that location is used.
* In the absence of user location data, the system attempts to get the user's geolocation and fetches the weather for that location based on it.

2. Calendar Display: 
* The calendar displays the current month, with dates arranged according to the days of the week.
* The current date is highlighted.

3. Weather Data Display on the Calendar:
* For each day on the calendar, if weather data exists, the following are displayed:
* Maximum temperature for that day.
* Minimum temperature for that day.
* A weather icon representing the primary weather condition (e.g., clear, cloudy, rainy).

# Calculator 
Is an advanced calculator that not only provides standard arithmetic operations but also functions such as exponentiation, square root calculation, sine, and cosine. This module supports keyboard input and offers a user-friendly interface.

# Tech stack:
1. javascript
2. html/css
* Libraries:
 1. Three.js
 2. Particles.js
 3. Math.js
