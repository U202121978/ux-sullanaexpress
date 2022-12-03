function onSelectClick(evt) {
  let schedulesEl = evt.target.closest('.result').querySelector('.schedules');
  schedulesEl.classList.toggle('hide');
}

let butTypeBtns = document.querySelectorAll('.bus-type .btn')
Array.prototype.forEach.call(butTypeBtns, function(btn) {
  btn.addEventListener('click', onSelectClick);
});
