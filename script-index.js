// script for the toggle, only with css came problems with p-tag
const url = 'zeugnisse/zeugnisse.pdf';
let renderTask= null;
document.addEventListener("DOMContentLoaded", function() {
	document.querySelector('.read-more-state').addEventListener('click', function () {
 		document.querySelectorAll('.read-more-target').forEach(el => { el.classList.toggle('show');});
	});
  globalThis.canvas = document.getElementById('pdf-canvas');
  globalThis.context = canvas.getContext('2d');


  document.querySelectorAll('.pdf-trigger').forEach(trigger => {
    trigger.addEventListener('mouseover', () => {
      const pageId = trigger.id; // z. B. "page-3"
      canvas.setAttribute("data-page",pageId); 
      const pageNumber = parseInt(pageId.replace('page-', ''), 10);
      document.getElementById('pdf-overlay').classList.remove('pdf-hidden');

      pdfjsLib.getDocument(url).promise.then(pdf => {
        pdf.getPage(pageNumber).then(page => {
          const scale = 0.3;
          const viewport = page.getViewport({ scale });
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          if (renderTask) {
            renderTask.cancel(); // Abbrechen des vorherigen Renderings
          }
          renderTask=page.render(renderContext);
        });
      });
    });
  });
  
document.addEventListener('click', (event) => {
  const overlay = document.getElementById('pdf-overlay');

// Wenn Overlay sichtbar ist
  if (!overlay.classList.contains('pdf-hidden')) {
    // Prüfen, ob der Klick außerhalb des Overlays war
    if (!overlay.contains(event.target)) {
      overlay.classList.add('pdf-hidden');
      overlay.classList.remove('fullscreen');
    }
  }
});

});

function renderPDF(url) {
  pdfjsLib.getDocument(url).promise.then(pdf => {
    console.log("canvas:", canvas);
    const pageNumber = canvas.getAttribute("data-page").replace('page-', '');
    if (!pageNumber) {
      console.error("Kein gültiger Seitenname gefunden.");
      return;
    }
    console.log(pageNumber);
    pdf.getPage(pageNumber).then(page => {
      const scale = 2.0; // Höhere Auflösung für Vollbild
      const viewport = page.getViewport({ scale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      if (renderTask) {
        renderTask.cancel(); // Vorheriges Rendering abbrechen
      }

      renderTask = page.render(renderContext);
    });
  });
}


// Preload images for the hover effects
/*  const preloadImages = [
    'bild1.jpg',
    'bild2.jpg',
    'bild3.jpg'
  ];
  const folder="zeugnisse/";
  preloadImages.forEach(name => {
    const img = new Image();
    img.src = folder+name;
  });
*/

function startDownload() {
  const link = document.createElement('a');
  link.href = 'zeugnisse/cv.pdf';
  link.download = 'cv-katinka.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Zeige zweiten Link nach kurzem Delay
  setTimeout(() => {
    document.getElementById('second-link').style.display = 'block';
  }, 500);
}

  function expandPDF() {
    document.getElementById('pdf-overlay').classList.toggle('fullscreen');
    renderPDF(url);
  }

window.addEventListener('load', () => {
  const begruessung = document.getElementById('begruessung');
  const introcanvas = document.getElementById('introcanvas');
  const ctx = introcanvas.getContext('2d');

  introcanvas.width = window.innerWidth;
  introcanvas.height = window.innerHeight;

  setTimeout(() => {
    const rect = begruessung.getBoundingClientRect();
    const particles = [];

    // Screenshot vom Text
    html2canvas(begruessung).then(screenshot => {
      const imgData = screenshot.getContext('2d').getImageData(0, 0, screenshot.width, screenshot.height);

      for (let y = 0; y < imgData.height; y += 4) {
        for (let x = 0; x < imgData.width; x += 4) {
          const i = (y * imgData.width + x) * 4;
          const r = imgData.data[i];
          const g = imgData.data[i + 1];
          const b = imgData.data[i + 2];
          const a = imgData.data[i + 3];

          if (a > 0) {
            particles.push({
              x: rect.left -150+ x,
              y: rect.top -40+ y,
              vx: (Math.random() - 0.5) * 3,
              vy: (Math.random() - 0.5) * 3,
      
              alpha: 1,
              color: `rgba(${r},${g},${b},`
            });
          }
        }
      }

      begruessung.remove();
  
window.parent.postMessage('intro-finished', '*');

      function animate() {
        ctx.clearRect(0, 0, introcanvas.width, introcanvas.height);
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.005;
          if (p.alpha > 0) {
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.fillRect(p.x, p.y, 2, 2);
          }
        });
        requestAnimationFrame(animate);
      }

      animate();
    });
  }, 2000);
});
setTimeout(() => {
  removeDiv();
}, 5000);

function removeDiv() {
  const div = document.getElementById('introcanvas');
  if (div) {
    div.remove();
  }

  const mainContent = document.getElementById('mainContent');
  mainContent.style.visibility = "visible";
  mainContent.style.opacity = 0;
  mainContent.style.transition = "opacity 1.5s ease-in-out";

  // Timeout, um sicherzustellen, dass die Transition greift
  setTimeout(() => {
   mainContent.style.opacity = "1";
  }, 500); 
}

