function checkForClick(el) {
  console.log(this)
  var oldSlected = document.querySelector('#mapList .map.selected'),
      btnPlay    = document.getElementById('btnPlay');
  if(btnPlay.disabled) btnPlay.disabled = false;
  if(oldSlected) oldSlected.classList.remove('selected')
  el.classList.add('selected')
}