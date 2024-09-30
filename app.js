document.getElementById("uploadBtn").addEventListener("click", async function() {
  const fileInput = document.getElementById("imageInput");
  const resultDiv = document.getElementById("result");
  const upscaledImage = document.getElementById("upscaledImage");
  const downloadBtn = document.getElementById("downloadBtn");
  const progressDiv = document.getElementById("progress");
  const progressPercentage = document.getElementById("progressPercentage");

  if (!fileInput.files.length) {
    alert("Please select an image first.");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("image", file);

  try {
    // Show progress section
    progressDiv.style.display = 'block';
    progressPercentage.textContent = '0%';

    const response = await fetch("https://api.deepai.org/api/torch-srgan", {
      method: "POST",
      headers: {
        "Api-Key": "810f7f3e-766f-4632-8b92-ac2e56dbabca" // Your API Key here
      },
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      
      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        progressPercentage.textContent = `${progress}%`;
        if (progress >= 100) clearInterval(interval);
      }, 300);

      if (data && data.output_url) {
        setTimeout(() => {
          // Hide progress section
          progressDiv.style.display = 'none';

          // Show result and display upscaled image
          upscaledImage.src = data.output_url;
          resultDiv.style.display = 'block';
          downloadBtn.style.display = 'block';

          // Set up download functionality
          downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.href = data.output_url;
            link.download = 'upscaled_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          };
        }, 1600); // Slight delay to show 100% progress
      } else {
        alert("Failed to upscale the image.");
      }
    } else {
      alert("HTTP Error: " + response.status);
    }
  } catch (error) {
    console.error("Error upscaling image:", error);
    alert("There was an error processing your request.");
  }
});
