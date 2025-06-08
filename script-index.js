// script for the toggle, only with css came problems with p-tag
const url = 'zeugnisse/zeugnisse.pdf';

document.addEventListener("DOMContentLoaded", function() {
	document.querySelector('.read-more-state').addEventListener('click', function () {
 		document.querySelectorAll('.read-more-target').forEach(el => { el.classList.toggle('show');});
	});
  globalThis.canvas = document.getElementById('pdf-canvas');
  globalThis.context = canvas.getContext('2d');


  document.querySelectorAll('.pdf-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const pageId = trigger.id; // z. B. "page-3"
      canvas.setAttribute("data-page",pageId); 
      alert(canvas.getAttribute("data-page");// Speichere die Seiten-ID im Canvas-Element
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
          page.render(renderContext);
        });
      });
    });
  });
});



function renderPDF(url) {
  pdfjsLib.getDocument(url).promise.then(pdf => {
    alert("rendern: "+canvas.getAttribute("data-page"));
    pdf.getPage(canvas.getAttribute("data-page")).then(page => {
      const containerWidth = canvas.clientWidth;
      const containerHeight = canvas.clientHeight;

      const unscaledViewport = page.getViewport({ scale: 1 });
      const scale = Math.min(
        containerWidth / unscaledViewport.width,
        containerHeight / unscaledViewport.height
      );

      const viewport = page.getViewport({ scale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      page.render(renderContext);
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
