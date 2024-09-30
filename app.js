document.getElementById("uploadBtn").addEventListener("click", async function() {
  const fileInput = document.getElementById("imageInput");
  const resultDiv = document.getElementById("result");
  const upscaledImage = document.getElementById("upscaledImage");
  const downloadBtn = document.getElementById("downloadBtn");
  const processingMessage = document.getElementById("processingMessage");

  if (!fileInput.files.length) {
    alert("Please select an image first.");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("image", file);

  // Show processing message
  processingMessage.style.display = "block";
  resultDiv.style.display = "none"; // Hide result initially
  downloadBtn.style.display = "none"; // Hide download button initially

  try {
    // Make API call to DeepAI
    const response = await fetch("https://api.deepai.org/api/torch-srgan", {
      method: "POST",
      headers: {
        "Api-Key": "da778622-f82f-4e62-a74b-bd4f286517f4" // Replace with your actual API Key
      },
      body: formData
    });

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    processingMessage.style.display = "none"; // Hide processing message after response

    if (data && data.output_url) {
      // Display the upscaled image
      upscaledImage.src = data.output_url;
      resultDiv.style.display = "block"; // Show result section
      downloadBtn.style.display = "inline-block"; // Show download button

      // Download button functionality
      downloadBtn.onclick = () => {
        const link = document.createElement('a');
        link.href = data.output_url;
        link.download = 'upscaled_image.png'; // Change the file name if needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    } else {
      alert("Failed to upscale the image. Please try again.");
    }
  } catch (error) {
    console.error("Error upscaling image:", error);
    alert("There was an error processing your request: " + error.message);
  }
});
