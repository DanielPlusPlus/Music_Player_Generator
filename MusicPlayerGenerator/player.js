let player;
const playPauseBtn = document.getElementById('dcplayPauseBtn');
const rewindBtn = document.getElementById('dcrewindBtn');
const forwardBtn = document.getElementById('dcforwardBtn');
const videoUrlSlct = document.getElementById('dcselect');
const progressBar = document.getElementById('dcprogressBar');
const currentTimeLabel = document.getElementById('dccurrentTime');
const endTimeLabel = document.getElementById('dcendTime');
let isPlaying = false;
let rewindInterval;
let forwardInterval;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('dcplayerYT', {
      height: '100',
      width: '100',
      videoId: '',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

function onPlayerReady(event) {
    playPauseBtn.addEventListener('click', playPause);
    rewindBtn.addEventListener('mousedown', startRewind);
    forwardBtn.addEventListener('mousedown', startForward);
    document.addEventListener('mouseup', stopInterval);
    videoUrlSlct.addEventListener('change', loadVideo);
    loadVideo();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        playPauseBtn.innerHTML = '||';
        updateProgressBar();
    }
    else if (event.data === YT.PlayerState.ENDED) {
        player.seekTo(0);
        player.playVideo();
    }
    else {
        isPlaying = false;
        playPauseBtn.innerHTML = '|&#9658;';
    }
}

function playPause() {
    if (isPlaying) {
        player.pauseVideo();
    }
    else {
        player.playVideo();
    }
}

function startRewind() {
    rewindInterval = setInterval(() => {
        const currentTime = player.getCurrentTime();
        player.seekTo(currentTime - 1, true);
    }, 100);
}

function startForward() {
    forwardInterval = setInterval(() => {
        const currentTime = player.getCurrentTime();
        player.seekTo(currentTime + 1, true);
    }, 100);
}

function stopInterval() {
    clearInterval(rewindInterval);
    clearInterval(forwardInterval);
}

function updateProgressBar() {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    const progress = (currentTime / duration) * 100;
    progressBar.value = progress;
    currentTimeLabel.textContent = formatTime(currentTime);
    endTimeLabel.textContent = formatTime(duration);
    requestAnimationFrame(updateProgressBar);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function loadVideo() {
    player.loadVideoById(videoUrlSlct.value);
}