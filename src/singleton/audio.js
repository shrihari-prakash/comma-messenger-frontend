function AudioPlayer() {
  this.audio = new Audio();
}

AudioPlayer.prototype.src = function (src) {
  this.audio.src = src;
  return this;
};

AudioPlayer.prototype.play = function () {
  this.audio.play();
  return this;
};

const audioPlayer = new AudioPlayer();

export default audioPlayer;
