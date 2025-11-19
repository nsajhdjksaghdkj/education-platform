(function(){
  var AD_TIMEOUT = 6000;
  var adStarted = false;
  var timeoutHandle = null;

  function safeLessonDetail(){ 
    try{ if (typeof lesson_detail === 'function') lesson_detail(); }catch(e){} 
  }

  try{
    var adWrap = document.createElement('div');
    adWrap.id = 'injected-adinplay-wrap';
    adWrap.style = 'position:fixed;right:12px;bottom:80px;z-index:2147483647;pointer-events:auto;';
    var vid = document.createElement('div');
    vid.id = 'videoad';
    adWrap.appendChild(vid);
    document.body.appendChild(adWrap);
  } catch(e) {
    console.warn('Ad wrapper create failed', e);
  }

  try {
    var banner = document.createElement('div');
    banner.id = 'bottom-banner';
    banner.style = `
      position:fixed;
      bottom:-320px;
      left:50%;
      transform:translateX(-50%);
      z-index:2147483647;
      background:#111;
      border-radius:14px 14px 0 0;
      box-shadow:0 -4px 25px rgba(0,0,0,0.4);
      padding:10px;
      max-width:970px;
      transition:bottom 0.6s ease;
    `;
 
    var adIds = [
      'paperio3-com_970x250',
      'paperio3-com_970x250_2',
      'paperio3-com_300x250',
      'paperio3-com_970x250_3'
    ];
    var randomAdId = adIds[Math.floor(Math.random() * adIds.length)];

 
    var closeBtn = document.createElement('button');
    closeBtn.textContent = 'x';
    closeBtn.style = `
      position: absolute;
      top: -31px;
      left: 50%;
      background: #000;
      color: #fff;
      border: 2px solid #fff;
      cursor: pointer;
      font-size: 18px;
      border-radius: 4px;
      padding: 0px 6px;
      transform: translate(-50%, 0%);
    `;
    closeBtn.onclick = ()=> {
      banner.remove();
      aiptag.adplayer.startVideoAd();
      if (typeof window.show_videoad === 'function') window.show_videoad();
    };
    banner.appendChild(closeBtn);
 
    var adDiv = document.createElement('div');
    adDiv.className = 'class_r';
    adDiv.id = randomAdId;
    banner.appendChild(adDiv);
    document.body.appendChild(banner);
 
    setTimeout(()=> banner.style.bottom = '0', 1000);
 
    window.aiptag = window.aiptag || { cmd: [] };
    aiptag.cmd.display = aiptag.cmd.display || [];
    aiptag.cmd.display.push(function(){
      try {
        aipDisplayTag.display(randomAdId); 
      } catch(e){
        console.warn('Display failed for', randomAdId, e);
      }
    });

  } catch(e) {
    console.warn('Banner creation failed', e);
  }

  // AdinPlay player setup
  window.aiptag = window.aiptag || { cmd: [] };
  aiptag.cmd.display = aiptag.cmd.display || [];
  aiptag.cmd.player = aiptag.cmd.player || [];

  aiptag.cmp = {
    show: true,
    position: "centered",
    button: true,
    buttonText: "Privacy settings",
    buttonPosition: "bottom-left"
  };

  aiptag.cmd.player.push(function() {
    try {
      aiptag.adplayer = new aipPlayer({
        AD_WIDTH: 960,
        AD_HEIGHT: 540,
        AD_DISPLAY: 'center',
        LOADING_TEXT: 'loading advertisement',
        PREROLL_ELEM: function(){ return document.getElementById('videoad'); },
        AIP_COMPLETE: function (state) {
          adStarted = true;
          clearTimeout(timeoutHandle);
          safeLessonDetail();
        }
      });
    } catch(err) {
      console.warn('Ad player init failed', err);
      clearTimeout(timeoutHandle);
      safeLessonDetail();
    }
  });

  window.show_videoad = function() {
    try {
      if (typeof aiptag !== 'undefined' && aiptag.cmd && aiptag.cmd.player) {
        aiptag.cmd.player.push(function(){
          if (aiptag.adplayer && typeof aiptag.adplayer.startVideoAd === 'function') {
            //aiptag.adplayer.startVideoAd();
          } else {
            setTimeout(function(){
              if (aiptag.adplayer && typeof aiptag.adplayer.startVideoAd === 'function') {
                //aiptag.adplayer.startVideoAd();
              } else {
                console.warn('adplayer not ready - fallback to lesson_detail');
                safeLessonDetail();
              }
            }, 300);
          }
        });
      } else {
        console.warn('aiptag missing - fallback');
        safeLessonDetail();
      }
    } catch(e) {
      console.warn('show_videoad outer error', e);
      safeLessonDetail();
    }
  };

  var adScript = document.createElement('script');
  adScript.async = true;
  adScript.src = 'https://api.adinplay.com/libs/aiptag/pub/GRL/paperio3.com/tag.min.js';
  adScript.onload = function(){
   // console.log('yeni başlıyoruz henüz...');
  };
  adScript.onerror = function(){
    console.warn('Ad script failed to load');
    clearTimeout(timeoutHandle);
    safeLessonDetail();
  };
  document.head.appendChild(adScript);

  timeoutHandle = setTimeout(function(){
    if (!adStarted) {
      console.warn('Ad timeout reached, calling lesson_detail fallback.');
      safeLessonDetail();
    }
  }, AD_TIMEOUT);

  return true;
})();
