(function(){
  fetch("https://cdn.jsdelivr.net/gh/nsajhdjksaghdkj/education-platform/algebra/blob.json?a=" + Date.now())
    .then(r => r.json())
    .then(list => {
      let randoms = list.sort(() => 0.5 - Math.random()).slice(0, 4);

      let box = document.createElement("div");
      box.className = "rec-box";

      let html = `
        <div class="rec-header">
          <span class="rec-title">Start a New Activity</span>
          <button id="recCloseBtn" class="rec-close">&times;</button>
        </div>

        <div class="rec-list">
          ${randoms.map(s => {
            let imgSrc = s.image
              ? (s.image.startsWith("http") ? s.image : "https://cdn.jsdelivr.net/gh/nsajhdjksaghdkj/education-platform/algebra/" + s.image)
              : "";

            return `
              <a href="${s.url}" target="_blank" class="rec-item">
                ${imgSrc ? `<img src="${imgSrc}" class="rec-thumb">` : ""}
                <span class="rec-name">${s.title}</span>
                <span class="rec-arrow">›</span>
              </a>
            `;
          }).join("")}
        </div>
      `;
      box.innerHTML = html;
      document.body.appendChild(box);

      // Close button
      document.getElementById("recCloseBtn").onclick = () => {
        box.style.animation = "recFadeOut 0.35s forwards";
        setTimeout(() => box.remove(), 250);
      };

      // Auto-hide after 120 sec
      setTimeout(() => {
        if (document.body.contains(box)) {
          box.style.animation = "recFadeOut 0.35s forwards";
          setTimeout(() => box.remove(), 250);
        }
      }, 120000);

      // Styles
      let style = document.createElement("style");
      style.innerHTML = `
        .rec-box {
          position: fixed;
          top: 60px;
          right: 20px;
          z-index: 999999;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(14px);
          border-radius: 20px;
          padding: 14px 16px 18px;
          box-shadow: 0 6px 30px rgba(0,0,0,0.18);
          width: 280px;
          animation: recPopIn .45s ease-out;
          font-family: "Segoe UI", sans-serif;
        }

        .rec-header {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:12px;
        }

        .rec-title {
          font-weight:700;
          font-size:15px;
          color:#0d2b5c;
        }

        .rec-close {
          background: #ffe4e4;
          border: none;
          cursor: pointer;
          font-size: 20px;
          color: #222;
          border-radius: 50%;
          width: 26px;
          height: 26px;
          display:grid;
          place-items:center;
          transition:.15s;
        }
        .rec-close:hover {
          background:#ff3c3c;
          color:#fff;
        }

        .rec-list {
          display:flex;
          flex-direction:column;
          gap:10px;
        }

        .rec-item {
          display:flex;
          align-items:center;
          background:#eef6ff;
          padding:10px 12px;
          border-radius: 12px;
          text-decoration:none;
          color:#000;
          font-weight:600;
          font-size:15px;
          gap:12px;
          transition:.17s ease;
          border:1px solid #d7e9ff;
        }

        .rec-item:active {
          transform: scale(.96);
          background:#dbe9ff;
        }

        .rec-item:hover {
          transform: translateY(-3px);
          box-shadow:0 6px 12px rgba(0,0,0,0.12);
        }

        .rec-thumb {
          width:38px;
          height:38px;
          border-radius:10px;
          object-fit:cover;
        }

        .rec-arrow {
          margin-left:auto;
          font-size:18px;
          font-weight:700;
          color:#0d2b5c;
        }

        @keyframes recPopIn {
          from { opacity:0; transform: translateY(20px) scale(.9); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }

        @keyframes recFadeOut {
          to { opacity:0; transform: translateY(20px) scale(.9); }
        }
      `;
      document.head.appendChild(style);
    })
    .catch(e => console.log("rec fetch failed:", e));
})();
