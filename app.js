document.getElementById("uploadBtn").addEventListener("click", async function() {
    const fileInput = document.getElementById("imageInput");
    const resultDiv = document.getElementById("result");
    const upscaledImage = document.getElementById("upscaledImage");
    const downloadLink = document.getElementById("downloadLink");

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
                "Api-Key": "f9a4be1a-73ca-465f-9fbb-4ff8e57ba43c"
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
            downloadLink.href = data.output_url;
            downloadLink.download = "upscaled_image.png"; // Name of the downloaded file
            downloadLink.style.display = "inline"; // Show the download link
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
