// script for the toggle, only with css came problems with p-tag
document.ready = function(){
	document.querySelector('.read-more-state').addEventListener('click', function () {
 		document.querySelectorAll('.read-more-target').forEach(el => { el.classList.toggle('show');});
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
// makes it possible to download the credientials after downloading the cv
//function zeugnisseDownload() {	document.getElementById('second-link').style.display = 'block';}


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




