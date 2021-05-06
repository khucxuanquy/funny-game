var muSic = new Audio("./sound/muSic.mp3");
var hoverPlaySound = new Audio("./sound/HoverPlaySound.mp3");
var miss = new Audio("./sound/beep.mp3");
var ring = new Audio("./sound/ring.mp3");
// sound -> click
var soundClick = new Audio("./sound/click.mp3");
var soundGun = new Audio("./sound/gun.mp3");
var soundSword = new Audio("./sound/sword.mp3");
var soundHammer = new Audio("./sound/hammer.mp3");


function muteVolume() {
  miss.volume = 0;
  soundClick.volume = 0;
  soundGun.volume = 0;
  soundSword.volume = 0;
  soundHammer.volume = 0;
  hoverPlaySound.volume = 0;
}
function onVolume() {
  miss.volume = 1;
  soundClick.volume = 1;
  soundGun.volume = 1;
  soundSword.volume = 1;
  soundHammer.volume = 1;
  hoverPlaySound.volume = 0.05;
}
// resize
innerWidth > 750 ? onVolume() : muteVolume();
window.addEventListener('resize', () => innerWidth > 750 ? onVolume() : muteVolume())


function HoverPlaySound() {
  hoverPlaySound.play();
  hoverPlaySound.currentTime = 0.05;
}
function defaultSound() {
  soundClick.play();
  soundClick.currentTime = 0;
}
function gunSound() {
  soundGun.play();
  soundGun.currentTime = 0;
}
function swordSound() {
  soundSword.play();
  soundSword.currentTime = 0;
}
function hammerSound() {
  soundHammer.play();
  soundHammer.currentTime = 0;
}
function missSound() {
  miss.play();
  miss.currentTime = 0;
}
function ringSound() {
  ring.play();
  miss.volume = 1;
  ring.currentTime = 0;
}