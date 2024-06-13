
# Sakura and Star Background Package | 樱花和星星背景包
---
# [ONLine Demo | 在线演示](https://thed0ublec.github.io/ParticleBackground/)

[English](https://github.com/TheD0ubleC/Background/wiki/EN) | [简体中文](https://github.com/TheD0ubleC/Background/wiki/ZH‐CN) | [繁體中文](https://github.com/TheD0ubleC/Background/wiki/ZH‐TW) | [日本語](https://github.com/TheD0ubleC/Background/wiki/JP)

---

A lightweight JavaScript library for adding a beautiful Sakura and Star particle background effect to your web pages. 

一个轻量级的 JavaScript 库，用于在网页上添加美丽的樱花和星星粒子背景效果。

## Features | 功能

- Sakura (cherry blossom) and Star particles. | 樱花（樱花瓣）和星星粒子。
- Night mode switch. | 夜间模式切换。
- Responsive and interactive with mouse and device orientation. | 响应和交互性，支持鼠标和设备方向。

## Installation | 安装

### Using a script tag | 使用 script 标签

You can include the package directly via a script tag from the GitHub Pages link or Cloudflare Pages link. 

你可以通过 GitHub Pages 链接或 Cloudflare Pages 链接直接包含该包。

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

## Usage | 使用

### Basic Usage | 基本使用

1. **Include the script | 包含脚本**

   Make sure to include the `backgroundEffect.js` script in your HTML file:

   确保在你的 HTML 文件中包含 `backgroundEffect.js` 脚本：

    ```html
    <script type="module">
        import backgroundEffect from 'https://thed0ublec.github.io/ParticleBackground/package/backgroundEffect.js';
        backgroundEffect.init();
    </script>
    ```

    Or, using the Cloudflare Pages URL: | 或者，使用 Cloudflare Pages URL：

    ```html
    <script type="module">
        import backgroundEffect from 'https://background-dhy.pages.dev/backgroundEffect.js';
        backgroundEffect.init();
    </script>
    ```

3. **Add required images | 添加所需的图像**

   Ensure that the required images (`sakura.png` and `star.png`) are available in the correct path (e.g., `images/` directory). If you place the images in a different directory, update the `backgroundEffect.js` accordingly.
   
   确保所需的图像（`sakura.png` 和 `star.png`）位于相应的 GitHub Pages 或 Cloudflare Pages 路径下。图像文件应直接放在相应的目录下。如果将图像放在不同的目录，请相应地更新 `backgroundEffect.js`。

### Example | 示例

Here is a complete example demonstrating how to use the background effect: | 以下是一个完整的示例，演示如何使用背景效果：

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

### Customization | 自定义

You can customize the number of particles, size, and other properties by modifying the `backgroundEffect.js` file. 

你可以通过修改 `backgroundEffect.js` 文件来自定义粒子的数量、大小和其他属性。

#### Changing the number of particles | 更改粒子数量

To change the maximum number of particles, you can update the `maxParticles` variable in the `backgroundEffect.js` file:

要更改最大粒子数量，可以更新 `backgroundEffect.js` 文件中的 `maxParticles` 变量：

```javascript
const maxParticles = 100; // Increase or decrease the number of particles
```

#### Updating particle images | 更新粒子图像

To use different images for the particles, update the `createParticle` and `updateParticleImages` functions in the `backgroundEffect.js` file to reference your new images.

要为粒子使用不同的图像，请在 `backgroundEffect.js` 文件中更新 `createParticle` 和 `updateParticleImages` 函数以引用新图像。

## License | 许可证

This project is licensed under the MIT License. | 此项目根据 MIT 许可证授权。

---

## Contributing | 贡献

If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/TheD0ubleC/Background).

如果你发现任何问题或有改进建议，请随时在 [GitHub 仓库](https://github.com/TheD0ubleC/Background) 中提出问题或提交拉取请求。

## Contact | 联系方式

For any questions or inquiries, please contact [TheD0ubleC](https://github.com/TheD0ubleC).

如有任何问题或查询，请联系 [TheD0ubleC](https://github.com/TheD0ubleC)。
