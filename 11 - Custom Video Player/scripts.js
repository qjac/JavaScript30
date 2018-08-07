 //  get elements

 const player = document.querySelector('.player');
 const video = player.querySelector('.viewer');
 // const play = player.querySelector('.player__button');
 // const volume = player.querySelector('input[name="volume"]');
 // const playbackRate = player.querySelector('input[name="playbackRate"]');
 const progress = player.querySelector('.progress');
 const progressBar = player.querySelector('.progress__filled');
 const toggle = player.querySelector('.toggle');
 const skipButtons = player.querySelectorAll('button[data-skip]');
 const ranges = player.querySelectorAll('.player__slider');

 // build functions
 function togglePlay() {(video.paused) ? video.play() : video.pause(); }

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

function skip() {
	// console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip); //parseFloat converts it to number. things were wonky without it.
}

function handleRangeUpdate() {
	// console.log(this.value);
	// console.log(this.name);
	// console.log(e.type);
	video[this.name] = this.value;
}

 function handleProgress() {
 	const percent = (video.currentTime / video.duration) * 100;
 	progressBar.style.flexBasis = `${percent}%`;
 	// console.log(percent);
 }

 function scrub(e) {
 	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
 	video.currentTime = scrubTime;
 }

 // hook up event listeners
 video.addEventListener('click', togglePlay);
 video.addEventListener('play', updateButton);
 video.addEventListener('pause', updateButton);
 video.addEventListener('timeupdate', handleProgress);

 toggle.addEventListener('click', togglePlay);
 skipButtons.forEach(button => button.addEventListener('click', skip));
 ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
 ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

 let mousedown = false;
 progress.addEventListener('click', scrub);
 progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); //if mousedown = false, returns nothing. if true, it runs scrub
 progress.addEventListener('mousedown', () => mousedown = true);
 progress.addEventListener('mouseup', () => mousedown = false);
