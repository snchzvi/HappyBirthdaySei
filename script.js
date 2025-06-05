let entered = '';
const correctPass = '060606';
const display = document.getElementById('passDisplay');

function enterDigit(d) {
  if (entered.length < 6) {
    entered += d;
    display.innerText = entered.padEnd(6, '-');
  }
}

function resetPass() {
  entered = '';
  display.innerText = '------';
}

function submitPass() {
  if (entered === correctPass) {
    document.getElementById('passcodeScreen').classList.remove('active');
    document.getElementById('mainContent').classList.add('active');

    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('playBtn');
    
    audio.play().then(() => {
      playBtn.textContent = '⏸';
    }).catch((e) => {
      console.log('Autoplay blocked:', e);
    });
    
  } else {
    alert('Incorrect passcode, baby. Try again mwa.');
    resetPass();
  }
}

function toggleReadMe() {
  document.getElementById('readmePopup').classList.toggle('active');
}

function togglePlay() {
  const audio = document.getElementById('audio');
  const btn = document.getElementById('playBtn');

  if (audio.paused) {
    audio.play();
    btn.textContent = '⏸';
  } else {
    audio.pause();
    btn.textContent = '▶';
  }
}

document.querySelectorAll('.photo-item').forEach(item => {
  const descDiv = item.querySelector('.photo-desc');
  const fullText = descDiv.getAttribute('data-text');
  let interval;

  item.addEventListener('mouseenter', () => {
    descDiv.textContent = '';
    let i = 0;
    interval = setInterval(() => {
      if (i < fullText.length) {
        descDiv.textContent += fullText[i++];
      } else {
        clearInterval(interval);
      }
    }, 30);
  });

  item.addEventListener('mouseleave', () => {
    clearInterval(interval);
    descDiv.textContent = '';
  });
});

const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');

audio.addEventListener('ended', () => {
  playBtn.textContent = '▶'; 
});
