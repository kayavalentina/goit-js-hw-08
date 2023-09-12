import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = "videoplayer-current-time";

const saveCurrentTimeToLS = () => {
    player.getCurrentTime().then((time) => {
      localStorage.setItem(LOCALSTORAGE_KEY, time);
    });
  };
  
const restoreCurrentTimeFromLS = () => {
    const savedTime = localStorage.getItem(LOCALSTORAGE_KEY);
    if (savedTime) {
      player.setCurrentTime(parseFloat(savedTime)).catch((error) => {
        console.error('Failed to set current time:', error);
      });
    }
  };
  
  player.on('timeupdate', throttle(saveCurrentTimeToLS, 1000));
  
  player.ready().then(() => {
    restoreCurrentTimeFromLS();
  });
