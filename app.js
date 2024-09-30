document.getElementById("uploadBtn").addEventListener("click", async function() {
  const fileInput = document.getElementById("imageInput");
  const resultDiv = document.getElementById("result");
  const upscaledImage = document.getElementById("upscaledImage");
  const downloadBtn = document.getElementById("downloadBtn");
  const uploadingProgress = document.getElementById("uploadingProgress");
  const upscalingProgress = document.getElementById("upscalingProgress");

  if (!fileInput.files.length) {
    alert("Please select an image first.");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("image", file);

  // Reset the progress and result sections
  uploadingProgress.style.display = "block";
  uploadingProgress.textContent = "Uploading Image: 0%";
  upscalingProgress.style.display = "none";
  resultDiv.style.display = "none";
  downloadBtn.style.display = "none";
  
  // Create a new XMLHttpRequest to show upload progress
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://api.deepai.org/api/torch-srgan");
  
  xhr.upload.onprogress = function(event) {
    if (event.lengthComputable) {
      const percentComplete = Math.round((event.loaded / event.total) * 100);
      uploadingProgress.textContent = `Uploading Image: ${percentComplete}%`;
    }
  };

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      uploadingProgress.style.display = "none";
      if (xhr.status === 200) {
        upscalingProgress.style.display = "block";
        const response = JSON.parse(xhr.responseText);
        if (response.output_url) {
          // Display upscaled image and show download button
          upscaledImage.src = response.output_url;
          resultDiv.style.display = "block";
          downloadBtn.style.display = "inline-block";
          downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.href = response.output_url;
            link.download = 'upscaled_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          };
          upscalingProgress.style.display = "none";
        } else {
          alert("Failed to upscale the image. Error: " + response.error);
          upscalingProgress.style.display = "none";
        }
      } else {
        alert("HTTP Error: " + xhr.status);
        upscalingProgress.style.display = "none";
      }
    }
  };

  // Set request headers and send form data
  xhr.setRequestHeader("Api-Key", "810f7f3e-766f-4632-8b92-ac2e56dbabca");
  xhr.send(formData);

  // Display processing message while image is being upscaled
  upscalingProgress.textContent = "Upscaling Image: Processing...";
});
