// script for the toggle, only with css came problems with p-tag
document.querySelector('.read-more-state').addEventListener('click', function () {
 document.querySelectorAll('.read-more-target').forEach(el => { el.classList.toggle('show');
 });
});

// Preload images for the hover effects
  const preloadImages = [
    'bild1.jpg',
    'bild2.jpg',
    'bild3.jpg'
  ];
  const folder="zeugnisse/";
  preloadImages.forEach(name => {
    const img = new Image();
    img.src = folder+name;
  });

// makes it possible to download the credientials after downloading the cv
function zeugnisseDownload() {
	document.getElementById('second-link').style.display = 'block';
}
