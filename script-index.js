// script for the toggle, only with css came problems with p-tag
document.ready = function(){
  alert('Document is ready');
	document.querySelector('.read-more-state').addEventListener('click', function () {
 		document.querySelectorAll('.read-more-target').forEach(el => { el.classList.toggle('show');});
	});
    document.querySelectorAll('.pdf-trigger').forEach(trigger => {
      alert('PDF-Trigger found: ' + trigger.id);
    trigger.addEventListener('click', () => {
      const pageId = trigger.id; // z. B. "page-3"
      const pageNumber = parseInt(pageId.replace('page-', ''), 10);

      document.getElementById('pdf-overlay').classList.remove('pdf-hidden');

      pdfjsLib.getDocument(url).promise.then(pdf => {
        pdf.getPage(pageNumber).then(page => {
          const scale = 0.3;
          const viewport = page.getViewport({ scale });

          const canvas = document.getElementById('pdf-canvas');
          const context = canvas.getContext('2d');
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

  const url = 'zeugnisse/zeugnisse.pdf';

  function expandPDF() {
    document.getElementById('pdf-overlay').classList.toggle('fullscreen');
  }
