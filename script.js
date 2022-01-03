const music = document.querySelector('audio');
const image = document.querySelector('img');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const duration = document.getElementById('duration');
const currentTime = document.getElementById('current-time');


// Music
const songs = [
    {name: 'jacinto-1',
displayName: 'Reggea Fusion',
artist: 'Jacinto'},
{name: 'jacinto-2',
displayName: 'Seven Nation Army',
artist: 'Jacinto'},
{name: 'jacinto-3',
displayName: 'Goodnight, Disco Queen',
artist: 'Jacinto'},
{name: 'metric-1',
displayName: 'Front Row',
artist: 'Jacinto'}
];


// Check if is playing
let isPlaying = false

// Play function
function playSong() {
    music.play();
    isPlaying= true;
    playBtn.classList.replace("fa-play", "fa-pause");
}

// Pause
function pauseSong() {
    music.pause();
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
}


// Play & Pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(songs) {
    title.textContent = songs.displayName;
    artist.textContext = songs.artist;
    music.src = `music/${songs.name}.mp3`;
    image.src = `img/${songs.name}.jpg`;
    
}

// Current Song
let songIndex = 0;



// Next Song

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0 
    };
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
        songIndex--;
    if (songIndex < 0) {
        songIndex =  songs.length - 1
    }
    loadSong(songs[songIndex]);
    playSong();
}


// On Load, select random Song

loadSong(songs[songIndex]);



function updateProgressBar() {
    // Update Progress Bar Width
var progressPercentage = music.currentTime / music.duration * 100;
progress.style.width = `${progressPercentage}%`;
// Update Progress Time
var minutes = Math.floor(music.currentTime / 60);
var seconds = Math.floor(music.currentTime % 60);
if(seconds < 10) {currentTime.textContent = `${minutes}:0${seconds}`}
else {currentTime.textContent = `${minutes}:${seconds}`}
// Update Duration
var minutes = Math.floor(music.duration / 60);
var seconds = Math.floor(music.duration % 60);
if (music.duration) {
if(seconds < 10) {duration.textContent = `${minutes}:0${seconds}`}
else {duration.textContent = `${minutes}:${seconds}`}
}}


function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = music.duration*clickX/width;
    playSong();
}


// Event Listeners
nextBtn.addEventListener('click', () => {nextSong()});
prevBtn.addEventListener('click', () => {prevSong()});
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);
music.addEventListener('ended',nextSong);
