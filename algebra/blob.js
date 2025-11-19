(function(){
  fetch("https://blob.math-home.work/blob.json?a=" + Date.now())
    .then(r => r.json())
    .then(list => {
      let randoms = list.sort(() => 0.5 - Math.random()).slice(0, 4);

      let box = document.createElement("div");
      box.className = "blob-box";

      let html = `
        <div class="blob-header">
          <span class="blob-title">Recommended Sites</span>
          <button id="blobCloseBtn" class="blob-close">&times;</button>
        </div>

        <div class="blob-list">
          ${randoms.map(s=>{
            let imgSrc = s.image 
              ? (s.image.startsWith("http") ? s.image : "https://blob.math-home.work/" + s.image)
              : "";

            return `
              <a href="${s.url}" target="_blank" class="blob-item">
                ${imgSrc ? `<img src="${imgSrc}" class="blob-thumb">` : ""}
                <span>${s.title}</span>
                <div class="blob-shine"></div>
              </a>
            `;
          }).join("")}
        </div>
      `;
      box.innerHTML = html;
      document.body.appendChild(box);

      // Close button
      document.getElementById("blobCloseBtn").onclick = () => {
        box.style.animation = "blobFadeOut 0.4s forwards";
        setTimeout(()=>box.remove(), 300);
      };

      // Auto-hide after 150 sec
      setTimeout(()=>{
        if (document.body.contains(box)) {
          box.style.animation = "blobFadeOut 0.5s forwards";
          setTimeout(()=>box.remove(),500);
        }
      },150000);

      // Styles
      let style = document.createElement("style");
      style.innerHTML = `
       .blob-box {
    position: fixed;
    top: 50px;
	font-family: arial;
    right: 20px;
    z-index: 999999;
    background: rgba(30, 30, 30, 0.75);
    backdrop-filter: blur(12px);
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-radius: 18px;
    padding: 16px;
    max-width: 280px;
    color: #fff;
    animation: blobPopIn .45s cubic-bezier(.25, 1.25, .5, 1);
    box-shadow: 0 8px 40px rgba(0, 0, 0, .35);
}

        .blob-header {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:10px;
        }

        .blob-title {
          font-weight:600;
          letter-spacing:0.4px;
          font-size:15px;
          background: linear-gradient(90deg,#fffd9b,#ffe147);
          color:#000;
          padding:4px 10px;
          border-radius:6px;
        }

.blob-close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 40px;
    color: #fff;
    padding: 0;
    opacity: 1;
    position: absolute;
    top: -10px;
    height: 30px;
    width: 30px;
    left: -10px;
    background: #000;
    display: grid;
    align-items: center;
    line-height: 30px;
    border-radius: 30px;
}
        .blob-close:hover { opacity:1; 
		background:#ff0000;
		
		}

        .blob-list { display:flex; flex-direction:column; gap:8px; }

        .blob-item {
    position: relative;
    display: flex;
    align-items: center;
    background: #ffee1d;
    color: #000;
    padding: 8px 10px;
    border-radius: 10px;
    gap: 10px;
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
    overflow: hidden;
    transition: transform .15s 
ease, box-shadow .15s 
ease;
}
        .blob-item:hover {
          transform: translateY(-3px);
          box-shadow:0 4px 12px rgba(255,238,29,0.4);
        }

        .blob-thumb {
          width:34px;
          height:34px;
          border-radius:8px;
          object-fit:cover;
          flex-shrink:0;
          transition: transform .25s;
        }
        .blob-item:hover .blob-thumb {
          transform:scale(1.2);
        }

        /* Shine Effect */
        .blob-shine {
          position:absolute;
          top:0;
          left:-80%;
          width:50%;
          height:100%;
          background:linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%);
          transform:skewX(-20deg);
        }
        .blob-item:hover .blob-shine {
          animation: shineMove 0.7s ease forwards;
        }

        @keyframes shineMove {
          from { left:-80%; }
          to   { left:130%; }
        }

        @keyframes blobPopIn {
          0% { opacity:0; transform:scale(.7) translateY(15px); }
          80% { transform:scale(1.05); }
          100% { opacity:1; transform:scale(1) translateY(0); }
        }

        @keyframes blobFadeOut {
          to { opacity:0; transform:translateY(20px) scale(.9); }
        }
      `;
      document.head.appendChild(style);
    })
    .catch(e=>console.log("blob fetch failed:", e));
})();
