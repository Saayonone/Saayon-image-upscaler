document.getElementById("uploadBtn").addEventListener("click", async function() {
  const fileInput = document.getElementById("imageInput");
  const resultDiv = document.getElementById("result");
  const upscaledImage = document.getElementById("upscaledImage");
  const downloadBtn = document.getElementById("downloadBtn");

  if (!fileInput.files.length) {
    alert("Please select an image first.");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("image", file);

  try {
    // Make API call to DeepAI
    const response = await fetch("https://api.deepai.org/api/torch-srgan", {
      method: "POST",
      headers: {
        "Api-Key": "810f7f3e-766f-4632-8b92-ac2e56dbabca" // Your API Key here
      },
      body: formData
    });

    const data = await response.json();
    if (response.ok && data && data.output_url) {
      // Display the upscaled image
      upscaledImage.src = data.output_url;
      resultDiv.style.display = "block"; // Show result section
      downloadBtn.style.display = "inline-block"; // Show download button
      
      // Set up the download button
      downloadBtn.onclick = () => {
        const link = document.createElement('a');
        link.href = data.output_url;
        link.download = 'upscaled_image.png'; // Change the file name if needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    } else {
      alert("Failed to upscale the image: " + (data.error || "Unknown error"));
    }
  } catch (error) {
    console.error("Error upscaling image:", error);
    alert("There was an error processing your request: " + error.message);
  }
});
