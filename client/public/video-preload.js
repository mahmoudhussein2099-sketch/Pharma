// This script helps preload the video for better performance
document.addEventListener('DOMContentLoaded', function() {
  // Preload the video
  const videoPreload = document.createElement('link');
  videoPreload.rel = 'preload';
  videoPreload.href = '/videos/istockphoto-1145285950-640_adpp_is.mp4';
  videoPreload.as = 'video';
  videoPreload.type = 'video/mp4';
  document.head.appendChild(videoPreload);
});