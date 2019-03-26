


btnPlay.addEventListener('click', function(e) {
  e.preventDefault()

  var mapSelected = document.querySelector('#mapList .map.selected > .name')

  var req = new XMLHttpRequest();
  req.onprogress = onProgress;
  req.onerror = onError;
  req.onload = onLoad;
  req.onloadend = onLoadEnd;
  req.open('POST', '/callMap', true);
  req.setRequestHeader("Content-type", "application/json");
  req.send(JSON.stringify({name: mapSelected.innerHTML}));
})

var btnCreate = document.getElementById('btnCreate')
btnCreate.addEventListener('click', (e) => {
  e.preventDefault()
  
    Runner = new Game(false)
    Runner.edit()
  console.log('in')
})

