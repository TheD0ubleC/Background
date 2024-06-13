//Sakura and Star Background By TheD0ubleC | https://github.com/TheD0ubleC/Background |i wanna some stars plz TT
const backgroundEffect = (() => {
    const css = `
    body, html {
        height: 100%;
        margin: 0;
        overflow: hidden;
        background-color: #ffe0e0;
        font-family: Arial, sans-serif;
        transition: background-color 0.5s cubic-bezier(0.42, 0, 0.58, 1);
    }

    body.night-mode {
        background-color: #40426d;
    }

    .switch-container {
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 1000; /* 高z-index确保按钮在最上层 */
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #c281ff;
        transition: background-color 0.5s cubic-bezier(0.42, 0, 0.58, 1);
        border-radius: 34px;
    }
    
    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: transform 0.5s cubic-bezier(0.42, 0, 0.58, 1), background-image 0.5s;
        border-radius: 50%;
        background-image: url('images/star.png');
        background-size: contain;
        background-repeat: no-repeat;
    }

    input:checked + .slider {
        background-color: #ffadc7;
    }

    input:checked + .slider:before {
        transform: translateX(26px);
        background-image: url('images/sakura.png');
    }

    .background {
        height: 100%;
        width: 100%;
        position: fixed; /* 固定定位 */
        top: 0;
        left: 0;
        z-index: -1; /* 设置较低的z-index确保在最底层 */
        overflow: hidden;
        perspective: 1000px;
        transition: background-color 0.5s cubic-bezier(0.42, 0, 0.58, 1);
    }

    .particles {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    }

    .particle, .explosion {
        position: absolute;
        top: -50px;
        background: url('images/sakura.png') no-repeat center center;
        background-size: contain;
        opacity: 0.8;
        pointer-events: auto;
        will-change: transform;
        filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.3));
        transition: background-image 0.5s cubic-bezier(0.42, 0, 0.58, 1);
    }

    body.night-mode .particle, body.night-mode .explosion {
        background-image: url('images/star.png');
    }

    .particle {
        animation: fall linear infinite;
    }

    .particle:hover {
        animation-play-state: paused;
    }

    @keyframes fall {
        0% {
            transform: translateY(-50px) rotate(0deg);
        }
        100% {
            transform: translateY(calc(100vh + 50px)) rotate(360deg);
        }
    }

    @keyframes explode {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
    `;

    const html = `
    <div class="switch-container">
        <label class="switch">
            <input type="checkbox" id="modeSwitch">
            <span class="slider"></span>
        </label>
    </div>
    <div class="background">
        <div class="particles layer" id="layer1"></div>
        <div class="particles layer" id="layer2"></div>
    </div>
    `;

    const script = () => {
        document.addEventListener('DOMContentLoaded', () => {
            const layer1 = document.getElementById('layer1');
            const layer2 = document.getElementById('layer2');
            const modeSwitch = document.getElementById('modeSwitch');
            const maxParticles = 50;
            const minSize = 15;
            const maxSize = 25;
            const particles = [];

            const savedMode = localStorage.getItem('nightMode');
            if (savedMode === 'true') {
                document.body.classList.add('night-mode');
                modeSwitch.checked = true;
            }

            modeSwitch.addEventListener('change', () => {
                const isChecked = modeSwitch.checked;
                document.body.classList.toggle('night-mode', isChecked);
                localStorage.setItem('nightMode', isChecked);
                updateParticleImages();
                updateFavicon();
            });

            function createParticle(layer) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                const size = Math.random() * (maxSize - minSize) + minSize;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;

                particle.style.left = `${Math.random() * 100}%`;
                
                const duration = Math.random() * 8 + 5;
                const delay = Math.random() * 5;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${delay}s`;

                particles.push(particle);

                particle.addEventListener('click', (event) => {
                    const style = window.getComputedStyle(particle);
                    const matrix = new WebKitCSSMatrix(style.transform);
                    const rotation = matrix.a === 1 && matrix.b === 0 ? 0 : Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
                    
                    const explosion = document.createElement('div');
                    explosion.classList.add('explosion');
                    explosion.style.width = particle.style.width;
                    explosion.style.height = particle.style.height;
                    explosion.style.left = particle.style.left;
                    explosion.style.top = `${event.clientY - size / 2}px`;
                    explosion.style.transform = `rotate(${rotation}deg)`;
                    explosion.style.animation = 'explode 1s forwards';
                    document.body.appendChild(explosion);

                    explosion.addEventListener('animationend', () => {
                        document.body.removeChild(explosion);
                    });
                    layer.removeChild(particle);
                });

                layer.appendChild(particle);

                particle.addEventListener('animationend', () => {
                    if (particle.style.animationName !== 'explode') {
                        layer.removeChild(particle);
                        createParticle(layer);
                    }
                });
            }

            function updateParticleImages() {
                const isNightMode = document.body.classList.contains('night-mode');
                const particles = document.querySelectorAll('.particle');
                particles.forEach(particle => {
                    particle.style.backgroundImage = isNightMode ? "url('images/star.png')" : "url('images/sakura.png')";
                });
            }

            function addParticles() {
                const currentParticlesLayer1 = layer1.getElementsByClassName('particle').length;
                const currentParticlesLayer2 = layer2.getElementsByClassName('particle').length;
                if (currentParticlesLayer1 < maxParticles) {
                    createParticle(layer1);
                }
                if (currentParticlesLayer2 < maxParticles) {
                    createParticle(layer2);
                }
                requestAnimationFrame(addParticles);
            }

            function updateFavicon() {
                const isNightMode = document.body.classList.contains('night-mode');
                let link = document.querySelector("link[rel~='icon']");
                if (!link) {
                    link = document.createElement('link');
                    link.rel = 'icon';
                    document.getElementsByTagName('head')[0].appendChild(link);
                }
                link.href = isNightMode ? 'images/star.png' : 'images/sakura.png';
            }
            function handleOrientation(event) {
                const x = event.gamma || 0; // 左右倾斜
                const y = event.beta || 0; // 前后倾斜

                const xPercentage = x / 45; // 标准化到[-1, 1]
                const yPercentage = y / 45; // 标准化到[-1, 1]

                const fov = 100 - Math.sqrt(xPercentage * xPercentage + yPercentage * yPercentage) * 50;

                document.querySelector('.background').style.perspective = `${fov}vw`;
                layer1.style.transform = `translate(${xPercentage * 20}px, ${yPercentage * 20}px)`;
                layer2.style.transform = `translate(${xPercentage * -10}px, ${yPercentage * -10}px)`;

                const shadowX = xPercentage * 20;
                const shadowY = yPercentage * 20;
                const particles = document.querySelectorAll('.particle');
                particles.forEach(particle => {
                    particle.style.filter = `drop-shadow(${shadowX}px ${shadowY}px 15px rgba(0, 0, 0, 0.3))`;
                });
            }
            if (window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', handleOrientation, true);
            }

            document.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth) - 0.5;
                const y = (e.clientY / window.innerHeight) - 0.5;

                const fov = 100 - Math.sqrt(x * x + y * y) * 50;

                document.querySelector('.background').style.perspective = `${fov}vw`;
                layer1.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
                layer2.style.transform = `translate(${x * -10}px, ${y * -10}px)`;

                const shadowX = x * 20;
                const shadowY = y * 20;
                const particles = document.querySelectorAll('.particle');
                particles.forEach(particle => {
                    particle.style.filter = `drop-shadow(${shadowX}px ${shadowY}px 15px rgba(0, 0, 0, 0.3))`;
                });
            });

            requestAnimationFrame(addParticles);
            addParticles();
            updateParticleImages();
            updateFavicon();
        });
    };

    const injectCSS = () => {
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    };

    const injectHTML = () => {
        document.body.insertAdjacentHTML('afterbegin', html);
    };

    const injectScript = () => {
        script();
    };

    return {
        init: () => {
            injectCSS();
            injectHTML();
            injectScript();
        }
    };
})();
export default backgroundEffect;
