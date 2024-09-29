document.getElementById("uploadBtn").addEventListener("click", async function() {
  const fileInput = document.getElementById("imageInput");
  const resultDiv = document.getElementById("result");
  const upscaledImage = document.getElementById("upscaledImage");

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
        "Api-Key": "810f7f3e-766f-4632-8b92-ac2e56dbabca"
      },
      body: formData
    });

    // Check if the response is ok (status 200)
    if (!response.ok) {
      alert("HTTP Error: " + response.status);
      return;
    }

    const data = await response.json();
    console.log(data); // Log the response to inspect it

    if (data && data.output_url) {
      // Display the upscaled image
      upscaledImage.src = data.output_url;
    } else if (data.error) {
      alert("Error from DeepAI API: " + data.error);
    } else {
      alert("Failed to upscale the image. Response data is incomplete.");
    }
  } catch (error) {
    console.error("Error upscaling image:", error);
    alert("There was an error processing your request: " + error.message);
  }
});
