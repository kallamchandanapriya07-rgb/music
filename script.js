const songs = [
    {
        title: "Dreams",
        artist: "SoundHelix",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },

    {
        title: "Summer",
        artist: "SoundHelix",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },

    {
        title: "Adventure",
        artist: "SoundHelix",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

const audio = document.getElementById("audio");

const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const title = document.getElementById("song-title");
const artist = document.getElementById("artist");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

let songIndex = 0;


// Load song
function loadSong(index) {

    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;

    audio.src = songs[index].audio;

    updatePlaylist();
}


// Play song
function playSong() {

    audio.play();

    playButton.textContent = "⏸";
}


// Pause song
function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";
}


// Play / Pause button
playButton.addEventListener("click", function () {

    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }

});


// Next song
nextButton.addEventListener("click", function () {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();

});


// Previous song
prevButton.addEventListener("click", function () {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();

});


// Update progress bar
audio.addEventListener("timeupdate", function () {

    if (audio.duration) {

        const progressValue =
            (audio.currentTime / audio.duration) * 100;

        progress.value = progressValue;
    }

    currentTime.textContent =
        formatTime(audio.currentTime);

});


// Get duration
audio.addEventListener("loadedmetadata", function () {

    duration.textContent =
        formatTime(audio.duration);

});


// Move progress bar
progress.addEventListener("input", function () {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;
    }

});


// Volume control
volume.addEventListener("input", function () {

    audio.volume = volume.value;

});


// Automatically play next song
audio.addEventListener("ended", function () {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();

});


// Format time
function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

    return minutes + ":" + seconds;
}


// Create playlist
function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach(function (song, index) {

        const songElement =
            document.createElement("div");

        songElement.classList.add("song");

        songElement.textContent =
            (index + 1) + ". " + song.title;

        songElement.addEventListener("click", function () {

            songIndex = index;

            loadSong(songIndex);
            playSong();

        });

        playlist.appendChild(songElement);

    });
}


// Highlight current song
function updatePlaylist() {

    const songItems =
        document.querySelectorAll(".song");

    songItems.forEach(function (item, index) {

        item.classList.remove("active");

        if (index === songIndex) {
            item.classList.add("active");
        }

    });

}


// Start
createPlaylist();
loadSong(songIndex);