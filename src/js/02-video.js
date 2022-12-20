import Player from '@vimeo/player';
import { throttle } from 'throttle-debounce';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const savedTimeLocalStorage = +localStorage.getItem('videoplayer-current-time');

if (savedTimeLocalStorage) {
  player.setCurrentTime(savedTimeLocalStorage);
}

player.on('timeupdate', throttle(1000, onPlay));

function onPlay(data) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(data.seconds)
  );
}
