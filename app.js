document.getElementById('uploadBtn').addEventListener('click', async () => {
  const input = document.getElementById('imageInput');
  const file = input.files[0];

  if (!file) {
    alert('Please select an image');
    return;
  }

  const formData = new FormData();
  formData.append('image', file);

  const apiKey = 'YOUR_API_KEY'; f9a4be1a-73ca-465f-9fbb-4ff8e57ba43c

  const response = await fetch('https://api.deepai.org/api/image-super-resolution', {
    method: 'POST',
    headers: {
      'api-key': apiKey
    },
    body: formData
  });

  const result = await response.json();
  
  if (result.output_url) {
    document.getElementById('upscaledImage').src = result.output_url;
  } else {
    alert('Failed to upscale the image');
  }
});
