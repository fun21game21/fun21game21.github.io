let isDragging = false;
let startX;
let scrollLeft;

document.querySelector('.card-container').addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - e.target.offsetLeft;
  scrollLeft = e.target.scrollLeft;
});

document.querySelector('.card-container').addEventListener('mouseleave', () => {
  isDragging = false;
});

document.querySelector('.card-container').addEventListener('mouseup', () => {
  isDragging = false;
});

document.querySelector('.card-container').addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - e.target.offsetLeft;
  const walk = x - startX;
  e.target.scrollLeft = scrollLeft - walk;
});
