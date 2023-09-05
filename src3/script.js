document.addEventListener("DOMContentLoaded", () => {
  const loadRandomVideosButton = document.querySelector(".loadRandomVideos");
  const randomVideoEmbeds = document.querySelectorAll(".random-video-embed");

  loadRandomVideosButton.addEventListener("click", loadRandomVideos);

  async function loadRandomVideos() {
    loadRandomVideosButton.disabled = true; // Disable the button during the request

    try {
      for (let i = 0; i < randomVideoEmbeds.length; i++) {
        const response = await axios.get("https://lust.scathach.id/pornhub/random");
        const data = response.data;

        if (data.success && data.data) {
          const embedUrl = data.assets[0];
          if (embedUrl) {
            randomVideoEmbeds[i].src = embedUrl;
            randomVideoEmbeds[i].style.height = "100%";
            randomVideoEmbeds[i].style.transform = "scale(1)";
          } else {
            handleLoadError(`No video URL available for container ${i + 1}`);
          }
        } else {
          handleLoadError(`API response indicates failure for container ${i + 1}`);
        }
      }
    } catch (error) {
      handleLoadError(`API request error: ${error.message}`);
    } finally {
      loadRandomVideosButton.disabled = false; // Re-enable the button after the request
    }
  }

  function handleLoadError(errorMessage) {
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error-container");
    errorContainer.textContent = errorMessage;
    document.body.appendChild(errorContainer);
    setTimeout(() => {
      errorContainer.remove();
    }, 5000); // Remove the error message after 5 seconds
  }
});
