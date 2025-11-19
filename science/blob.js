/* daha dur yeni basliyoruz */
(function(){
  fetch("https://cdn.jsdelivr.net/gh/nsajhdjksaghdkj/education-platform/science/blob.json?a=" + Date.now())
    .then(r => r.json())
    .then(list => {
      let randoms = list.sort(() => 0.5 - Math.random()).slice(0, 2);
      let box = document.createElement("div");
      box.style = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999999;
        background: rgb(0 0 0);
        color: #fff;
        border-radius: 14px;
        padding: 14px 18px 10px 18px;
        font-family: 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 25px rgba(0,0,0,0.3);
        max-width: 280px;
        animation: blobFadeIn 0.5s ease-out;
      `;

      let html = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <b style="color:#fff;">Recommended Sites</b>
          <button id="blobCloseBtn" style="
            background:none;border:none;color:#fff;cursor:pointer;
            font-size:18px;line-height:14px;padding:0;margin:0;
          " title="Close">&times;</button>
        </div>
        <div>
          ${randoms.map(s => {
            let imgSrc = s.image ? 
              (s.image.startsWith("http") ? s.image : "https://cdn.jsdelivr.net/gh/nsajhdjksaghdkj/education-platform/science/" + s.image) 
              : "";
            return `
              <a href="${s.url}" target="_blank" style="
                display:flex;align-items:center;gap:8px;
                color:rgb(0 0 0);
                text-decoration:none;
                margin:6px 0;
                background:rgb(255 238 29);
                padding:6px 8px;
                border-radius:8px;
                transition:all .2s ease;
              " onmouseover="this.style.background='rgba(255,255,255)'" onmouseout="this.style.background='rgba(255,238,29)'">
                ${imgSrc ? `<img src="${imgSrc}" class="blob-thumb">` : ''}
                <span> ${s.title}</span>
              </a>
            `;
          }).join("")}
        </div>
      `;

      box.innerHTML = html;
      document.body.appendChild(box);

      document.getElementById("blobCloseBtn").onclick = () => {
        box.style.animation = "blobFadeOut 0.3s forwards";
        setTimeout(()=>box.remove(), 300);
      };

      setTimeout(() => {
        if (document.body.contains(box)) {
          box.style.animation = "blobFadeOut 0.5s forwards";
          setTimeout(()=>box.remove(), 500);
        }
      }, 150000);

      let style = document.createElement("style");
      style.innerHTML = `
        @keyframes blobFadeIn {
          from {opacity:0; transform:translateY(30px);}
          to {opacity:1; transform:translateY(0);}
        }
        @keyframes blobFadeOut {
          from {opacity:1; transform:translateY(0);}
          to {opacity:0; transform:translateY(30px);}
        }
        .blob-thumb {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          object-fit: cover;
          transition: transform .25s ease;
        }
        a:hover .blob-thumb {
          transform: scale(1.15);
        }
      `;
      document.head.appendChild(style);
    })
    .catch(e=>console.log("blob fetch failed:", e));
})();
