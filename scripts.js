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

    // Function to handle device orientation
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

    // Add event listener for device orientation
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
