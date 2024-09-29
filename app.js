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
        "Api-Key": "f9a4be1a-73ca-465f-9fbb-4ff8e57ba43c"
      },
      body: formData
    });

    const data = await response.json();
    if (data && data.output_url) {
      // Display the upscaled image
      upscaledImage.src = data.output_url;
downloadBtn.style.display = "inline-block";
downloadBtn.onclick = () => {
                const link = document.createElement('a');
                link.href = data.output_url;
                link.download = 'upscaled_image.png'; // Change the file name if needed
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
    } else {
      alert("Failed to upscale the image.");
    }
  } catch (error) {
    console.error("Error upscaling image:", error);
    alert("There was an error processing your request.");
  }
});
