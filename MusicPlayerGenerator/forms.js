function changeBackground(){
    let colours = document.getElementsByName("colour");
    for(let i = 0; i < colours.length; i++) {
        if (colours[i].checked) {
            selectedColour = colours[i].value;
            break;
        }
    }
    document.getElementById("dcPlayer").style.backgroundColor = selectedColour;
}
function changeBorderStyle(){
    let borders = document.getElementsByName("border");
    for(let i = 0; i < borders.length; i++) {
        if (borders[i].checked) {
            selectedBorder = borders[i].value;
            break;
        }
    }
    document.getElementById("dcPlayer").style.borderStyle = selectedBorder;
}
function changeBorderColor(){
    let bordersColours = document.getElementsByName("bcolour");
    for(let i = 0; i < bordersColours.length; i++) {
        if (bordersColours[i].checked) {
            selectedBorderColour = bordersColours[i].value;
            break;
        }
    }
    document.getElementById("dcPlayer").style.borderColor = selectedBorderColour;
}
function changeBtnColor(){
    let buttons = document.getElementsByClassName("dcbuttons");
    let buttonsColours = document.getElementsByName("btncolour");
    for(let i = 0; i < buttonsColours.length; i++) {
        if (buttonsColours[i].checked) {
            selectedBtnColour = buttonsColours[i].value;
            break;
        }
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = selectedBtnColour;
    }
    document.getElementById("dcselect").style.backgroundColor = selectedBtnColour;
}
function extractVideoId(url) {
    const regExp = /^.*(youtu\.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        return match[2];
    }
    else {
        return alert("Wrong link - it must be from YouTube");
    }
}
function generateCode(){
    generateHTML();
    generateCss();
    generateJS();
    document.getElementById("printedCode").value = code;
}
function generateHTML(){
    let titles = [];
    let urls = [];
    let titleInputs = document.getElementsByClassName('titleInput');
    let urlInputs = document.getElementsByClassName('urlInput');
    for(let i = 0; i < titleInputs.length; i++) {
        let title = titleInputs[i].value;
        let url = urlInputs[i].value;
        if (title.trim() !== ''){
            titles.push(title);
        }
        if (url.trim() !== ''){
            urls.push(extractVideoId(url));
        }
    }
    code = "** HTML CODE ** \n";
    code += "<div id = 'dcPlayer'>\n\
    <button class = 'dcbuttons' id = 'dcrewindBtn' title = 'Rewind'>&#9664;</button>\n\
    <button class = 'dcbuttons' id = 'dcplayPauseBtn' title = 'Play'>|&#9658;</button>\n\
    <button class = 'dcbuttons' id = 'dcforwardBtn' title = 'Forward'>&#9654;</button>\n\
    <div id = 'dcprogress'>\n\
        <span id = 'dccurrentTime'>0:00</span>\n\
        <progress id = 'dcprogressBar' value = '0' max = '100'></progress>\n\
        <span id='dcendTime'>0:00</span>\n\
    </div>\n\
    <select id = 'dcselect' title = 'Playlist'>\n";
    for(let i = 0; i < titles.length; i++){
        code += "       <option value = '" + urls[i] + "'>" + titles[i] +"</option>\n";
    }
    code += "    </select>\n\
    <script src = 'player.js' defer></script>\n\
    <script src = 'https://www.youtube.com/iframe_api' defer></script>\n\
</div>\n";
}
function generateCss(){
    code += "** CSS CODE ** \n";
    code += "#dcPlayer{\n\
    display: flex;\n\
    position: fixed;\n\
    top: 0px;\n\
    left: 0px;\n\
    width: 100%;\n\
    height: 50px;\n\
    z-index: 2;\n\
    background-color: " + selectedColour + ";\n\
    justify-content: center;\n\
    align-items: center;\n\
    border: 2px " + selectedBorder + " " + selectedBorderColour + ";\n\
    box-sizing: border-box;\n\
}\n\
#dcplayerYT {\n\
    width: 0;\n\
    height: 0;\n\
}\n\
.dcbuttons{\n\
    height: 80%;\n\
    width: 40px;\n\
    border-radius: 20px;\n\
    text-align: center;\n\
    background-color: " + selectedBtnColour + ";\n\
}\n\
#dcplayPauseBtn, #dcforwardBtn{\n\
    margin-left: 1%;\n\
}\n\
#dcprogress {\n\
    margin-left: 1%;\n\
}\n\
#dcselect{\n\
    height: 80%;\n\
    margin-left: 1%;\n\
    width: 240px;\n\
    text-align: center;\n\
    border-radius: 40px;\n\
    appearance: none;\n\
    background-color: " + selectedBtnColour + ";\n\
}\n";
}
function generateJS(){
    let autoPlay = document.getElementById("autoPlay");
    let repeatSongs = document.getElementById("repeatSongs");
    code += "** JAVASCRIPT CODE ** \n";
    code += "let player;\n\
const playPauseBtn = document.getElementById('dcplayPauseBtn');\n\
const rewindBtn = document.getElementById('dcrewindBtn');\n\
const forwardBtn = document.getElementById('dcforwardBtn');\n\
const videoUrlSlct = document.getElementById('dcselect');\n\
const progressBar = document.getElementById('dcprogressBar');\n\
const currentTimeLabel = document.getElementById('dccurrentTime');\n\
const endTimeLabel = document.getElementById('dcendTime');\n\
let isPlaying = false;\n\
let rewindInterval;\n\
let forwardInterval;\n\
function onYouTubeIframeAPIReady() {\n\
    player = new YT.Player('dcplayerYT', {\n\
        height: '100',\n\
        width: '100',\n\
        videoId: '',\n\
        events: {\n\
            'onReady': onPlayerReady,\n\
            'onStateChange': onPlayerStateChange\n\
        }\n\
    });\n\
}\n\
function onPlayerReady(event) {\n\
    playPauseBtn.addEventListener('click', playPause);\n\
    rewindBtn.addEventListener('mousedown', startRewind);\n\
    forwardBtn.addEventListener('mousedown', startForward);\n\
    document.addEventListener('mouseup', stopInterval);\n\
    videoUrlSlct.addEventListener('change', loadVideo);\n\
    loadVideo();\n\
}\n\
function onPlayerStateChange(event) {\n\
    if (event.data === YT.PlayerState.PLAYING) {\n\
        isPlaying = true;\n\
        playPauseBtn.innerHTML = '||';\n\
        updateProgressBar();\n\
    }\n";
    if (repeatSongs.checked) {
        code += "    else if (event.data === YT.PlayerState.ENDED) {\n\
        player.seekTo(0);\n\
        player.playVideo();\n\
    }\n";
    }
    code += "    else {\n\
        isPlaying = false;\n\
        playPauseBtn.innerHTML = '|&#9658;';\n\
    }\n\
}\n\
function playPause() {\n\
    if (isPlaying) {\n\
        player.pauseVideo();\n\
    }\n\
    else {\n\
        player.playVideo();\n\
    }\n\
}\n\
function startRewind() {\n\
    rewindInterval = setInterval(() => {\n\
        const currentTime = player.getCurrentTime();\n\
        player.seekTo(currentTime - 1, true);\n\
    }, 100);\n\
}\n\
function startForward() {\n\
    forwardInterval = setInterval(() => {\n\
        const currentTime = player.getCurrentTime();\n\
        player.seekTo(currentTime + 1, true);\n\
    }, 100);\n\
}\n\
function stopInterval() {\n\
    clearInterval(rewindInterval);\n\
    clearInterval(forwardInterval);\n\
}\n\
function updateProgressBar() {\n\
    const currentTime = player.getCurrentTime();\n\
    const duration = player.getDuration();\n\
    const progress = (currentTime / duration) * 100;\n\
    progressBar.value = progress;\n\
    currentTimeLabel.textContent = formatTime(currentTime);\n\
    endTimeLabel.textContent = formatTime(duration);\n\
    requestAnimationFrame(updateProgressBar);\n\
}\n\
function formatTime(time) {\n\
    const minutes = Math.floor(time / 60);\n\
    const seconds = Math.floor(time % 60);\n\
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;\n\
}\n\
function loadVideo() {\n";
    if (autoPlay.checked) {
        code += "    player.loadVideoById(videoUrlSlct.value);\n";
    }
    else{
        code += "    player.cueVideoById(videoUrlSlct.value);\n";
    }
    code += "}";
}

let selectedColour = "orange";
let selectedBorder = "solid";
let selectedBorderColour = "green";
let selectedBtnColour = "white";
let code;