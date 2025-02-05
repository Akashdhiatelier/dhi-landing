function segregateImagesAndVideos(mediaArray) {
  const imageExtensions = ["jpg", "jpeg", "png", "gif"]; // Add more image extensions if needed
  const videoExtensions = ["mp4", "avi", "mov", "mkv"]; // Add more video extensions if needed

  const images = [];
  const videos = [];

  mediaArray.forEach((mediaObject) => {
    const fileExtension = mediaObject.media.split(".").pop().toLowerCase();

    if (imageExtensions.includes(fileExtension)) {
      images.push(mediaObject);
    } else if (videoExtensions.includes(fileExtension)) {
      videos.push(mediaObject);
    }
    // You can add additional conditions for other file types if needed
  });

  return { images, videos };
}
export default segregateImagesAndVideos;
