const songs = [
    {
        title: "Howling at the Moon",
        artist: "Milow",
        cover: "https://raw.githubusercontent.com/YunusDogru/Music-Player-React/main/img/howlingAtTheMoon.jpg",
        source: "https://raw.githubusercontent.com/YunusDogru/Music-Player-React/main/mp3/howlingAtTheMoon.mp3",
        favorited: false
    },
    {
        title: "The Path of Silence",
        artist: "Anne Sophie Versnaeyen",
        cover: "https://raw.githubusercontent.com/YunusDogru/Music-Player-React/main/img/thePathOfSilence.jpg",
        source: "https://raw.githubusercontent.com/YunusDogru/Music-Player-React/main/mp3/thePathOfSilence.mp3",
        favorited: false
    },
    {
        title: "The Goths",
        artist: "Bonny Grace",
        cover: "https://raw.githubusercontent.com/YunusDogru/Music-Player-React/main/img/theGoths.jpg",
        source: "https://raw.githubusercontent.com/YunusDogru/Music-Player-React/main/mp3/theGoths.mp3",
        favorited: true
      },
    {
      title: "Stan",
      artist: "Eminem, Dido",
      cover: "https://raw.githubusercontent.com/YunusDogru/Music-Player-React/main/img/stan.jpg",
      source: "https://raw.githubusercontent.com/YunusDogru/Music-Player-React/main/mp3/stan.mp3",
      favorited: false
    },
    {
      title: "Only Human",
      artist: "Jonas Brothers",
      cover: "https://raw.githubusercontent.com/YunusDogru/Music-Player-React/main/img/onlyHuman.jpg",
      source: "https://raw.githubusercontent.com/YunusDogru/Music-Player-React/main/mp3/onlyHuman.mp3",
      favorited: true
    },
    {
      title: "Roads",
      artist: "Vargas & Lagola",
      cover: "https://raw.githubusercontent.com/YunusDogru/Music-Player-React/main/img/roads.jpg",
      source: "https://raw.githubusercontent.com/YunusDogru/Music-Player-React/main/mp3/roads.mp3"
    }
  ];
  
  let audioElement = new Audio();
  let currentSongIndex = 0;
  let isPlaying = false;
  
  function play() {
    if (isPlaying) {
      audioElement.pause();
      isPlaying = false;
      document.querySelector(".play i").classList.remove("fa-pause");
      document.querySelector(".play i").classList.add("fa-play");
    } else {
      audioElement.play();
      isPlaying = true;
      document.querySelector(".play i").classList.remove("fa-play");
      document.querySelector(".play i").classList.add("fa-pause");
    }
  }
  
  function prev() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = songs.length - 1;
    }
    loadSong();
  }
  
  function next() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
      currentSongIndex = 0;
    }
    loadSong();
  }
  
  function setCurrentTime() {
    document.querySelector(".current-time").innerHTML = convertTime(audioElement.currentTime);
  }
  
  function setDuration() {
    document.querySelector(".duration").innerHTML = convertTime(audioElement.duration);
  }
  
  function setProgress() {
    let progress = document.querySelector(".progress");
    progress.style.width = (audioElement.currentTime / audioElement.duration) * 100 + "%";
  }
  
  function convertTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }
  
  function loadSong() {
    audioElement.src = songs[currentSongIndex].source;
    document.querySelector(".image").src = songs[currentSongIndex].cover;
    document.querySelector(".singer").innerHTML = songs[currentSongIndex].artist;
    document.querySelector(".song").innerHTML = songs[currentSongIndex].title;
    audioElement.play();
    isPlaying = true;
    document.querySelector(".play i").classList.remove("fa-play");
    document.querySelector(".play i").classList.add("fa-pause");
    if (songs[currentSongIndex].favorited == true) {
        document.querySelector(".hearth-icon").classList.add("favorited")
    }
    else if (songs[currentSongIndex].favorited == false) {
        document.querySelector(".hearth-icon").classList.remove("favorited")
    }
  }
  
  document.querySelector(".play").addEventListener("click", play);
  document.querySelector(".prev").addEventListener("click", prev);
  document.querySelector(".next").addEventListener("click", next);
  audioElement.addEventListener("timeupdate", setCurrentTime);
  audioElement.addEventListener("durationchange", setDuration);
  audioElement.addEventListener("timeupdate", setProgress);
  document.querySelector(".volume").addEventListener("mouseover", function () {document.querySelector(".volume").classList.add("volumeOnClick");});
  document.querySelector(".volume").addEventListener("mouseout", function () {document.querySelector(".volume").classList.remove("volumeOnClick");});
  document.querySelector(".volume-range").addEventListener("input", function () {audioElement.volume = this.value / 100;});
  document.querySelector(".hearth-icon").addEventListener("click", function () {
    if (songs[currentSongIndex].favorited == true) {
        document.querySelector(".hearth-icon").classList.remove("favorited");
        songs[currentSongIndex].favorited = false;
    }
    else {
        document.querySelector(".hearth-icon").classList.add("favorited");
        songs[currentSongIndex].favorited = true;
    }
  });

const shuffleButton = document.querySelector(".shuffle");
const repeatButton = document.querySelector(".repeat");

let shuffle = false;

let repeat = false;

shuffleButton.addEventListener("click", function() {
  shuffle = !shuffle;
  if (shuffle) {
    shuffleButton.classList.add("active");
    repeatButton.classList.remove("active");
  } else {
    shuffleButton.classList.remove("active");
  }
});

repeatButton.addEventListener("click", function() {
  repeat = !repeat;
  if (repeat) {
    repeatButton.classList.add("active");
    shuffleButton.classList.remove("active");

  } else {
    repeatButton.classList.remove("active");
  }
});

audioElement.addEventListener("ended", function() {
  if (shuffle) {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    loadSong(songs[currentSongIndex]);
    audioElement.play();
  } else if (repeat) {
    audioElement.currentTime = 0;
    audioElement.play();
  } else {
    next();
  }
});
  
  


let progressBar = document.querySelector(".progress-bar");
let progress = document.querySelector(".progress");

progressBar.addEventListener("click", function(event) {
    let x = event.offsetX; 
    console.log(x)
    let width = this.offsetWidth;
    audioElement.currentTime = (x / width) * audioElement.duration;
    });

function updateProgress() {
  let x = progressBar.offsetWidth;
  progress.style.width = x;
  audioElement.currentTime = (x / progress.clientWidth) * audioElement.duration;
}

progress.addEventListener("click", updateProgress);


loadSong();
  