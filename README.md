<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Upscaler</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Image Upscaler</h1>
    <input type="file" id="imageInput" accept="image/*" />
    <button id="uploadBtn">Upscale Image</button>
    <div id="result">
      <h2>Upscaled Image</h2>
      <img id="upscaledImage" src="" alt="Upscaled Image" />
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>
