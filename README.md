
# Sakura and Star Background Package
---
[English](https://github.com/TheD0ubleC/Background/wiki/EN) | [简体中文](https://github.com/TheD0ubleC/Background/wiki/ZH‐CN) | [繁體中文](https://github.com/TheD0ubleC/Background/wiki/ZH‐TW) | [日本語](https://github.com/TheD0ubleC/Background/wiki/JP)
---

A lightweight JavaScript library for adding a beautiful Sakura and Star particle background effect to your web pages.

## Features

- Sakura (cherry blossom) and Star particles.
- Night mode switch.
- Responsive and interactive with mouse and device orientation.

## Installation

### Using a script tag

You can include the package directly via a script tag from the GitHub Pages link or Cloudflare Pages link.

#### GitHub Pages

```html
<script type="module">
    import backgroundEffect from 'https://thed0ublec.github.io/ParticleBackground/package/backgroundEffect.js';
    backgroundEffect.init();
</script>
```

#### Cloudflare Pages

```html
<script type="module">
    import backgroundEffect from 'https://background-dhy.pages.dev/backgroundEffect.js';
    backgroundEffect.init();
</script>
```

## Usage

### Basic Usage

1. **Include the script**

   Make sure to include the `backgroundEffect.js` script in your HTML file:

    ```html
    <script type="module">
        import backgroundEffect from 'https://thed0ublec.github.io/ParticleBackground/package/backgroundEffect.js';
        backgroundEffect.init();
    </script>
    ```

    Or, using the Cloudflare Pages URL:

    ```html
    <script type="module">
        import backgroundEffect from 'https://background-dhy.pages.dev/backgroundEffect.js';
        backgroundEffect.init();
    </script>
    ```

2. **Add required images**

   Ensure that the required images (`sakura.png` and `star.png`) are available in the correct path (e.g., `images/` directory). If you place the images in a different directory, update the `backgroundEffect.js` accordingly.

### Example

Here is a complete example demonstrating how to use the background effect:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Background Effect</title>
    <style>
        body {
            position: relative; /* Ensure the main content is correctly positioned */
            z-index: 1; /* Ensure the main content is above the background layer */
        }
    </style>
</head>
<body>
    <h1>test1</h1>
    <script type="module">
        import backgroundEffect from 'https://thed0ublec.github.io/ParticleBackground/package/backgroundEffect.js';
        backgroundEffect.init();
    </script>
    <!-- Alternatively, use the Cloudflare Pages URL -->
    <!-- <script type="module">
        import backgroundEffect from 'https://background-dhy.pages.dev/backgroundEffect.js';
        backgroundEffect.init();
    </script> -->
    <h1>test2</h1>
</body>
</html>
```

### Customization

You can customize the number of particles, size, and other properties by modifying the `backgroundEffect.js` file.

#### Changing the number of particles

To change the maximum number of particles, you can update the `maxParticles` variable in the `backgroundEffect.js` file:

```javascript
const maxParticles = 100; // Increase or decrease the number of particles
```

#### Updating particle images

To use different images for the particles, update the `createParticle` and `updateParticleImages` functions in the `backgroundEffect.js` file to reference your new images.

## License

This project is licensed under the MIT License.

---

## Contributing

If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/TheD0ubleC/Background).

## Contact

For any questions or inquiries, please contact [TheD0ubleC](https://github.com/TheD0ubleC).
