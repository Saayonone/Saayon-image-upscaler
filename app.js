document.getElementById("uploadBtn").addEventListener("click", async function() {
    const fileInput = document.getElementById("imageInput");
    const resultDiv = document.getElementById("result");
    const upscaledImage = document.getElementById("upscaledImage");
    const downloadBtn = document.getElementById("downloadBtn");
    const uploadProgress = document.getElementById("uploadProgress");
    const upscaleProgress = document.getElementById("upscaleProgress");

    if (!fileInput.files.length) {
        alert("Please select an image first.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
        // Show initial progress
        uploadProgress.innerText = "Upload Progress: 0%";
        upscaleProgress.innerText = "Upscale Progress: 0%";

        // Make API call to DeepAI for upscaling
        const response = await fetch("https://api.deepai.org/api/torch-srgan", {
            method: "POST",
            headers: {
                "Api-Key": "da778622-f82f-4e62-a74b-bd4f286517f4" // Your API Key here
            },
            body: formData,
            onUploadProgress: function(event) {
                if (event.lengthComputable) {
                    let percentComplete = Math.round((event.loaded / event.total) * 100);
                    uploadProgress.innerText = `Upload Progress: ${percentComplete}%`;
                }
            }
        });

        // After upload is done, show that upscaling is in progress
        upscaleProgress.innerText = "Upscale Progress: Processing...";

        // Process the response
        const data = await response.json();
        if (data && data.output_url) {
            // Display the upscaled image
            upscaledImage.src = data.output_url;
            resultDiv.style.display = "block";
            downloadBtn.style.display = "block";
            downloadBtn.onclick = function() {
                const link = document.createElement('a');
                link.href = data.output_url;
                link.download = 'upscaled_image.png';
                link.click();
            };

            // Update progress status to 100%
            upscaleProgress.innerText = "Upscale Progress: 100% Complete";
        } else {
            upscaleProgress.innerText = "Upscale Progress: Failed";
            alert("Failed to upscale the image.");
        }
    } catch (error) {
        console.error("Error upscaling image:", error);
        alert("There was an error processing your request.");
    }
});
