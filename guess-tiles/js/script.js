document.addEventListener('DOMContentLoaded', function() {
    const gameMessage = document.getElementById('gameMessage');
    const container = document.querySelector('.container');
    const tiles = Array.from(container.children);
    const restartButton = document.querySelector('.restart-game');
    let openedTiles = [];

    function shuffle(array) {
        let currentIndex = array.length, randomIndex, tempValue;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    function shuffleTiles() {
        const shuffledTiles = shuffle(tiles);
        shuffledTiles.forEach(tile => container.appendChild(tile));
    }

    function toggleTile(tile) {
        tile.classList.toggle('closed');
    }

    function checkMatch() {
        const [firstTile, secondTile] = openedTiles;
        if (firstTile.textContent === secondTile.textContent) {
            openedTiles.forEach(tile => tile.classList.add('matched'));
            checkAllMatched();
        } else {
            openedTiles.forEach(tile => toggleTile(tile));
        }
    }

    function checkAllMatched() {
        const allMatched = tiles.every(tile => tile.classList.contains('matched'));
        if (allMatched) displayParticlesAnimation();
    }

    function displayParticlesAnimation() {
        const particlesElem = document.getElementById('particles-js');
        particlesElem.style.display = 'block';
        particlesJSLoad();
        setTimeout(() => {
            particlesElem.style.display = 'none';
            document.querySelectorAll('.button').forEach(btn => btn.style.display = 'flex');
        }, 5000);
    }

    function startGame() {
        document.querySelectorAll('.button').forEach(btn => btn.style.display = 'none'); 
        hideMessage();
        resetTiles();
        shuffleTiles();
    }


    function hideMessage() {
        gameMessage.style.display = 'none';
    }

    function resetTiles() {
        tiles.forEach(tile => {
            tile.classList.remove('matched', 'initially-hidden');
            tile.classList.add('closed');
        });
    }

    function handleTileClick(e) {
        const isTile = e.target.classList.contains('tile');
        const isMatched = e.target.classList.contains('matched');
        if (!isTile || isMatched || openedTiles.length >= 2 || openedTiles.includes(e.target)) return;

        toggleTile(e.target);
        openedTiles.push(e.target);

        if (openedTiles.length === 2) {
            setTimeout(() => {
                checkMatch();
                openedTiles = [];
            }, 500);
        }
    }

    tiles.forEach(tile => tile.classList.add('initially-hidden'));
    setTimeout(() => {
        hideMessage();
        startGame();
    }, 3000);

    container.addEventListener('click', handleTileClick);
    restartButton.addEventListener('click', function(e) {
        e.preventDefault();
        startGame();
    });
});



function particlesJSLoad() {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 400,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 10,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 14,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}