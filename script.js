const play = document.getElementById('play')
const audio = document.getElementById('audio')
const list = document.getElementById('list')
const playlist = document.querySelector('.playlist')
const panel = document.querySelector('.panel')
const next_btn = document.querySelector('#next')
const prev_btn = document.querySelector('#prev')
const play_pause = document.getElementById('play_pause')
const artist_name = document.querySelector('.artist_name')
const cover_image = document.querySelector('.circle_image')

// songs
const songs = [
  { path: "assets/songs/Jeene Laga hu.m4a", artist: "Atif Aslam", cover: "assets/image/jeene_laga_hoon.webp" },
  { path: "assets/songs/Doremon.m4a", artist: "Sonal Kaushal", cover: "assets/image/doraemon.jpeg" },
  { path: "assets/songs/Cupid.m4a", artist: "FIFTY FIFTY", cover: "assets/image/cupid.jpg" },
  { path: "assets/songs/demon_slayer.m4a", artist: "LiSA", cover: "assets/image/demon_slayer.webp" },
  { path: "assets/songs/Falling Down.m4a", artist: "Wild Cards", cover: "assets/image/falling_down.webp" },
  { path: "assets/songs/Jalebi Baby.m4a", artist: "Tesher", cover: "assets/image/jalebi.webp" },
  { path: "assets/songs/Pretty Little Baby.m4a", artist: "Marvin Gaye", cover: "assets/image/pretty.jpg" },
  { path: "assets/songs/Shape of You.m4a", artist: "Ed Sheeran", cover: "assets/image/shape.webp" },
  { path: "assets/songs/Suzume.m4a", artist: "RADWIMPS", cover: "assets/image/suzume.webp" },
  { path: "assets/songs/Ziddi Dil.m4a", artist: "Vishal Dadlani", cover: "assets/image/ziddi.jpg" },
  { path: "assets/songs/ride_it.mp3", artist: "jay Sean", cover: "assets/image/ride_it.jpg" },

];

// to show the total songs in the Play list

document.getElementById('total_song').textContent = songs.length;
let currentSongIndex = 0;

// functionalities for next song, play song, pause song, previous song.

play.addEventListener('click', () => {
  if (audio.paused) {
    audio.play()
    play_pause.src = "assets/svgs/pause.svg"
    panel.style.boxShadow = '0 0 20px #1db954';
  }
  else {
    panel.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.6)';
    audio.pause()
    play_pause.src = "assets/svgs/play-circle-fill.svg"
  }
})


next_btn.addEventListener('click', () => {
  panel.style.boxShadow = '0 0 20px #1db954';
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo(currentSongIndex);
})

prev_btn.addEventListener('click', () => {
  panel.style.boxShadow = '0 0 20px #1db954';
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo(currentSongIndex);
})

audio.addEventListener('ended', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo(currentSongIndex);
})

// functionalities for playlist

list.addEventListener('click', () => {
  if (playlist.style.display === 'none' || playlist.style.display === '') {
    playlist.style.display = 'flex'
  }
  else {
    playlist.style.display = 'none'
  }
})

// add songs in the plalist section

const songListElement = document.getElementById('song_list');

// add each song to the plalist

songs.forEach((songObj, index) => {
  const songName = songObj.path.split('/').pop().replace('.m4a', '');
  const songItem = document.createElement('p')
  songItem.textContent = songName;

  // for playing the selected song from the playlist;
  songItem.addEventListener('click', () => {
    currentSongIndex = index;
    updateSongInfo(currentSongIndex)
  })
  songListElement.appendChild(songItem)
})

// Song Duration

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

audio.addEventListener('loadedmetadata', () => {
  document.getElementById('total-time').textContent = formatDuration(audio.duration)
})

audio.addEventListener('timeupdate', () => {
  document.getElementById('current-time').textContent = formatDuration(audio.currentTime)
})

// for shuffle button

const shuffle_btn = document.getElementById('shuffle');
shuffle_btn.addEventListener('click', () => {
  let random_song = Math.floor(Math.random() * songs.length);
  updateSongInfo(random_song);
})

// function for song update

function updateSongInfo(index) {
  const name = songs[index].path.split('/').pop().replace('.m4a', '')
  document.querySelector('.song_name').textContent = name;
  document.getElementById('current_song_number').textContent = index + 1;
  artist_name.textContent = songs[index].artist;
  audio.src = songs[index].path;
  play_pause.src = 'assets/svgs/pause.svg'
  cover_image.src = songs[index].cover
  panel.style.boxShadow = '0 0 20px #1db954';
  audio.play();
}

// volume Control Logic

// default volume(0.5)  means volume is at 50 %
// for full ---> 1 and for mute ----> 0

const volume_line = document.getElementById('volume-line')
audio.volume = 0.5;
volume_line.value = 50;

volume_line.addEventListener('input', () => {
  audio.volume = volume_line.value / 100;
})

const volume_up_btn = document.getElementById('volume-up')
const volume_down_btn = document.getElementById('volume-down')

// volume up
volume_up_btn.addEventListener('click', () => {
  audio.volume = Math.min(1, audio.volume + 0.1);
  volume_line.value = audio.volume * 100;
})

// volume down
volume_down_btn.addEventListener('click', () => {
  audio.volume = Math.max(0, audio.volume - 0.1);
  volume_line.value = audio.volume * 100;
})

// progress Bar logic

const audio_line = document.getElementById('audio_line')

audio.addEventListener('timeupdate', () => {
  audio_line.value = (audio.currentTime / audio.duration) * 100;
});

audio_line.addEventListener('input', () => {
  audio.currentTime = (audio_line.value / 100) * audio.duration;
})
