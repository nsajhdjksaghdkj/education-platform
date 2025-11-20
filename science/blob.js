/* --- TOP RECOMMENDATION BAR --- */
(function(){
  fetch("https://cdn.jsdelivr.net/gh/nsajhdjksaghdkj/education-platform/science/blob.json?a=" + Date.now())
    .then(r => r.json())
    .then(list => {

      let items = list.sort(() => 0.5 - Math.random()).slice(0, 4);

      // Bar oluştur
      let bar = document.createElement("div");
      bar.id = "topRecoBar";
      bar.innerHTML = `
        <div class="trb-left">Start a New Activity</div>

        <div class="trb-items">
          ${items.map(s => {
            let img = s.image
              ? (s.image.startsWith("http") ? s.image : "https://cdn.jsdelivr.net/gh/nsajhdjksaghdkj/education-platform/science/" + s.image)
              : "";
            return `
              <a href="${s.url}" target="_blank" class="trb-item">
                ${img ? `<img src="${img}" class="trb-thumb">` : ""}
                <span>${s.title}</span>
              </a>
            `;
          }).join("")}
        </div>

        <div class="trb-close" id="trbCloseBtn">✕</div>
      `;

      document.body.appendChild(bar);

      // Close action
      document.getElementById("trbCloseBtn").onclick = () => {
        bar.style.animation = "trbFadeOut .3s forwards";
        setTimeout(()=>bar.remove(), 250);
      };

      // CSS
      let style = document.createElement("style");
      style.innerHTML = `
        /* Top bar box */
        #topRecoBar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 999999;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 8px 18px;
          border-bottom: 1px solid #d7e9ff;
          font-family: "Segoe UI", sans-serif;
          animation: trbSlideDown .35s ease-out;
        }

        .trb-left {
          font-weight: 700;
          font-size: 14px;
          color: #0d2b5c;
          white-space: nowrap;
        }

        .trb-items {
          display: flex;
          align-items: center;
          gap: 14px;
          overflow-x: auto;
          flex: 1;
        }

        .trb-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #eef6ff;
          border: 1px solid #d7e9ff;
          padding: 6px 10px;
          border-radius: 10px;
          text-decoration: none;
          color: #000;
          font-weight: 600;
          font-size: 13px;
          white-space: nowrap;
          transition: .17s ease;
        }

        .trb-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.12);
        }

        .trb-thumb {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          object-fit: cover;
        }

        .trb-close {
          cursor: pointer;
          font-size: 18px;
          color: #333;
          padding: 4px 10px;
          transition: .15s;
        }

        .trb-close:hover {
          color: red;
        }

        /* Animations */
        @keyframes trbSlideDown {
          from { opacity:0; transform: translateY(-20px); }
          to   { opacity:1; transform: translateY(0); }
        }

        @keyframes trbFadeOut {
          to { opacity:0; transform: translateY(-20px); }
        }
      `;
      document.head.appendChild(style);

    })
    .catch(e => console.log("Top bar fetch failed:", e));
})();
