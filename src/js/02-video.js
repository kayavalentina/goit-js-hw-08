import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const saveCurrentTimeThrottled = throttle(function(currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime.toFixed(2));
}, 1000); 

player.on('timeupdate', function(data) {
  const currentTime = data.seconds; 
 
  localStorage.setItem('videoplayer-current-time', currentTime.toFixed(2)); // Округлюємо до двох знаків після коми


  saveCurrentTimeThrottled(currentTime);
});

document.addEventListener('DOMContentLoaded', function() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(parseFloat(savedTime));
  }
});