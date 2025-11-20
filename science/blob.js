/* Sol tarafa optimize edilmiş popup */
(function(){
  fetch("https://cdn.jsdelivr.net/gh/nsajhdjksaghdkj/education-platform/science/blob.json?a=" + Date.now())
    .then(r => r.json())
    .then(list => {
      let randoms = list.sort(() => 0.5 - Math.random()).slice(0, 5);

      let box = document.createElement("div");
      box.className = "left-box-reco";

      let html = `
        <div class="left-header">
          <span class="left-title">Start a New Activity</span>
          <button id="leftCloseBtn" class="left-close">&times;</button>
        </div>

        <div class="left-list">
          ${randoms.map(s => {
            let imgSrc = s.image 
              ? (s.image.startsWith("http") ? s.image : "https://cdn.jsdelivr.net/gh/nsajhdjksaghdkj/education-platform/science/" + s.image)
              : "";

            return `
              <a href="${s.url}" target="_blank" class="left-item">
                ${imgSrc ? `<img src="${imgSrc}" class="left-thumb">` : ""}
                <span class="left-name">${s.title}</span>
                <span class="left-arrow">›</span>
              </a>
            `;
          }).join("")}
        </div>
      `;

      box.innerHTML = html;
      document.body.appendChild(box);

      // Close button
      document.getElementById("leftCloseBtn").onclick = () => {
        box.style.animation = "leftFadeOut .3s forwards";
        setTimeout(()=>box.remove(), 250);
      };

      // Auto-hide after 150 sec
      setTimeout(() => {
        if (document.body.contains(box)) {
          box.style.animation = "leftFadeOut .3s forwards";
          setTimeout(()=>box.remove(), 250);
        }
      }, 150000);

      // Styles
      let style = document.createElement("style");
      style.innerHTML = `
        .left-box-reco {
          position: fixed;
          top: 40px;
          left: 20px;
          z-index: 999999;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(14px);
          padding: 16px;
          width: 280px;
          border-radius: 18px;
          box-shadow: 0 6px 30px rgba(0,0,0,0.18);
          animation: leftSlideIn .45s ease-out;
          font-family: 'Segoe UI', Roboto, sans-serif;
        }

        .left-header {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:12px;
        }

        .left-title {
          font-weight:700;
          font-size:15px;
          color:#0d2b5c;
        }

        .left-close {
          background: #ffe4e4;
          border:none;
          cursor:pointer;
          font-size:22px;
          width:28px;
          height:28px;
          border-radius:50%;
          display:grid;
          place-items:center;
          color:#111;
          transition:.15s;
        }
        .left-close:hover {
          background:#ff3d3d;
          color:#fff;
        }

        .left-list {
          display:flex;
          flex-direction:column;
          gap:10px;
        }

        .left-item {
          display:flex;
          align-items:center;
          gap:12px;
          background:#eef6ff;
          border:1px solid #d7e9ff;
          padding:10px 12px;
          border-radius:12px;
          text-decoration:none;
          color:#000;
          font-size:15px;
          font-weight:600;
          transition:.18s ease;
        }

        .left-item:hover {
          transform: translateX(6px);
          box-shadow:0 5px 12px rgba(0,0,0,0.15);
        }

        .left-item:active {
          transform: scale(.96);
        }

        .left-thumb {
          width:38px;
          height:38px;
          border-radius:10px;
          object-fit:cover;
          flex-shrink:0;
        }

        .left-arrow {
          margin-left:auto;
          font-size:18px;
          font-weight:700;
          color:#0d2b5c;
        }

        @keyframes leftSlideIn {
          from { opacity:0; transform:translateX(-40px) scale(.9); }
          to   { opacity:1; transform:translateX(0) scale(1); }
        }

        @keyframes leftFadeOut {
          to { opacity:0; transform:translateX(-20px) scale(.9); }
        }
      `;
      document.head.appendChild(style);
    })
    .catch(e=>console.log("left fetch failed:", e));
})();
