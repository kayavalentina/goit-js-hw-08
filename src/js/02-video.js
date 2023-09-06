import Player from '@vimeo/player';
import throttle from 'lodash.throttle'; 

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';


function saveCurrentTime(time) {
  localStorage.setItem(LOCAL_STORAGE_KEY, time);
}


function loadCurrentTime() {
  const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedTime ? parseFloat(savedTime) : 0;
}


player.setCurrentTime(loadCurrentTime());


player.on('timeupdate', throttle((data) => {
  saveCurrentTime(data.seconds);
}, 1000));


