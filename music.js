const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const music = document.querySelector('audio');
const image = document.querySelector('img');
const artist = document.getElementById('artist');
const title = document.getElementById('title');


const songs = [{
    name: 'music1',
    image: 'photo1',
    title: 'rata-lambiyan',
    artist: 'jubin'

},
{
    name: 'music2',
    image: 'photo2',
    title: 'Sakhiyan',
    artist: 'maninder'
},
{
    name: 'music3',
    image: 'photo3',
    title: 'desh mere',
    artist: 'ajay devgan'
},
{
    name: 'music4',
    image: 'photo4',
    title: 'relation',
    artist: 'nick-john'
}
    , {
    name: 'music5',
    image: 'photo5',
    title: 'hawa banke',
    artist: 'darshan rawal'
}
    , {
    name: 'music6',
    image: 'photo6',
    title: 'bholenath',
    artist: 'shankar'
}]

let isplaying = false;
//for play
const playmusic = () => {
    isplaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    image.classList.add('anime');
}
//for pause
const pausemusic = () => {
    isplaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    image.classList.remove('anime');
}

play.addEventListener('click', () => {
    if (isplaying) {
        pausemusic();
    }
    else {
        playmusic();
    }
})

const loadsong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = songs.name + ".mp3";
    image.src = songs.image + ".png";
}


let songindex = 0;
const nextsong = () => {
    songindex = (songindex + 1) % songs.length;
    loadsong(songs[songindex]);
    playmusic();
}

const prevsong = () => {
    songindex = (songindex - 1 + songs.length) % songs.length;
    loadsong(songs[songindex]);
    playmusic();
}




// progress bar work

let progress_bar = document.getElementById("progress")
let progress_start = document.getElementById("current_time")
let progress_end = document.getElementById("duration")
const progress_div = document.getElementById("progress_div")

music.addEventListener("timeupdate", (event) => {
    const { currentTime, duration } = event.srcElement;
    console.log(event)

    // progress bar width changing
    let progress_time = (currentTime / duration) * 100;
    progress_bar.style.width = `${progress_time}%`;


    // ending time
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    if (duration) {
        progress_end.textContent = `${min_duration}:${sec_duration}`;
    }

    // starting time
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`
    }

    progress_start.textContent = `${min_currentTime}:${sec_currentTime}`;
}
);


// clickingg on progress bar 
progress_div.addEventListener('click',(event)=>{
    const { duration } = music;
    let move_progress = (event.offsetX / event.srcElement.clientWidth)*duration;
    music.currentTime = move_progress;

})
music.addEventListener('ended', nextsong)
next.addEventListener('click', nextsong);
prev.addEventListener('click', prevsong);


