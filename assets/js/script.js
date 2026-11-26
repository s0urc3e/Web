const mobile = 'ontouchstart' in document.documentElement;
let switchAllowed = false;

function openSocial(type) {
  let url = 'about:blank';

  switch (type) {
    case 'discord':
      url = 'https://discord.com/users/991075367999655996';
      break;
    case 'github':
      url = 'https://github.com/s0urc3e';
      break;
    case 'twitter':
      url = 'https://twitter.com/none';
      break;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}

function startIntroTyping() {
  new TypeIt('#intro-text', {
    speed: 50,
  })
    .type('welcome.', { delay: 1200 })
    .delete(null, { delay: 1000 })
    .type(`${mobile ? 'tap' : 'press any key'} to enter.`)
    .go();

  setTimeout(() => {
    switchAllowed = true;
  }, 2500);
}

function typerStartTyping(typer) {
  typer.reset();

  const text = [
    'Lua Developer',
    'FiveM Developer',
    'HTML Developer',
    'Roblox Developer',
    'Proud Juice WRLD Glazer',
  ];

  text.forEach((role) => {
    typer.move(null);
    typer.type(role, { delay: 1000 });
    typer.pause(1200);
    typer.delete(role.length, { delay: 800 });
  });

  typer.go();
}

function startMainTyping() {
  const typer = new TypeIt('#subtext', {
    speed: 50,
    afterComplete: async () => {
      typerStartTyping(typer);
    },
  });

  typerStartTyping(typer);
}

function switchScreen() {
  document.title = 'source';

  $('.intro').fadeOut(800, function () {
    $('.bg-image, .bg-overlay').fadeIn(1000);
    $('.main')
      .css('display', 'flex')
      .hide()
      .fadeIn(1000, function () {
        startMainTyping();
      });
  });

  ['background', 'rain'].forEach((audioName) => {
    const fullPath = `assets/audio/${audioName}.mp3`;
    const audioElement = new Audio(fullPath);
    
    audioElement.volume = 0.5;
    audioElement.loop = true;
    audioElement.play().catch((err) => {
      console.warn(`Audio playback failed for ${audioName}:`, err);
    });
  });
}

document.addEventListener('keydown', () => {
  if (switchAllowed) {
    switchAllowed = false;
    switchScreen();
  }
});

document.addEventListener('touchstart', () => {
  if (switchAllowed && mobile) {
    switchAllowed = false;
    switchScreen();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  startIntroTyping();
});
