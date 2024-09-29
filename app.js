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
        const response = await fetch("https://api.deepai.org/api/torch-srgan", {
            method: "POST",
            headers: {
                "Api-Key": "810f7f3e-766f-4632-8b92-ac2e56dbabca" // Your API Key here
            },
            body: formData
        });

        if (!response.ok) {
            alert("HTTP Error: " + response.status);
            return;
        }

        const data = await response.json();

        if (data && data.output_url) {
            upscaledImage.src = data.output_url;
            downloadBtn.style.display = "inline-block";
            resultDiv.style.display = "block"; // Show result section

            downloadBtn.onclick = () => {
                const link = document.createElement('a');
                link.href = data.output_url;
                link.download = 'upscaled_image.png'; // Change the file name if needed
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
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
