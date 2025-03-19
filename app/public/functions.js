function getTime(nb) {
  nb = Number(nb)

  if (nb === 0) return '00:00:00'


  var msA = `${nb % 1000}`

  // // 1000).toFixed(2)
  if (msA > 1000) msA = ((msA / 1000).toFixed(0)) //* 10
  else if (msA > 100) msA = ((msA / 1000).toFixed(2)) * 100

  msA = (Math.round(msA) > 100) ? '00' : Math.round(msA)

  var ms = `${(msA < 10) ? '0' : ''}${msA}`
  var sec = `${(Math.floor(nb / 1000 % 60) < 10) ? '0' : ''}${Math.floor(nb / 1000 % 60)}`
  var min = `${(Math.floor(nb / 1000 / 60) < 10) ? '0' : ''}${Math.floor(nb / 1000 / 60)}`
  return min + ':' + sec + ':' + ms
}

function checkForClick(el) {
  var oldSlected = document.querySelector('#mapList .map.selected'),
    btnPlay = document.getElementById('btnPlay');
  if (btnPlay.disabled) btnPlay.disabled = false;
  if (oldSlected) oldSlected.classList.remove('selected')
  el.classList.add('selected')
}


function onProgress(event) {
  if (event.lengthComputable) {
    var loading = document.getElementById('loading'),
      ladingBar = document.getElementById('loadBarIn'),
      percentComplete = (event.loaded / event.total) * 100;
    loading.style.display = "block";
    ladingBar.style.width = percentComplete + "%"
    console.log("Téléchargement: %d%%", percentComplete);
  } else {
    // Impossible de calculer la progression puisque la taille totale est inconnue
  }
}

function onError(event) {
  console.error("Une erreur " + event.target.status + " s'est produite au cours de la réception du document.");
}

function onLoad(event) {
  // Ici, this.readyState égale XMLHttpRequest.DONE .
  if (this.status === 200) {
    // console.log("Réponse reçue: %s", this.responseText);
    var loadedMap = JSON.parse(this.responseText)
    Runner = new Game(loadedMap.name, loadedMap.time, loadedMap.data)
    Runner.play()
  } else {
    console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
  }
}

function onLoadEnd(event) {
  // Cet événement est exécuté, une fois la requête terminée.
  // console.log("Le transfert est terminé. (peut importe le résultat)");
  var loading = document.getElementById('loading');
  setTimeout(function () {
    loading.style.display = "none";
  }, 200)
}


btnPlay.addEventListener('click', function (e) {
  e.preventDefault()

  var mapSelected = document.querySelector('#mapList .map.selected > .name')

  var req = new XMLHttpRequest();
  req.onprogress = onProgress;
  req.onerror = onError;
  req.onload = onLoad;
  req.onloadend = onLoadEnd;
  req.open('POST', '/callMap', true);
  req.setRequestHeader("Content-type", "application/json");
  req.send(JSON.stringify({ name: mapSelected.innerHTML }));
})

var btnCreate = document.getElementById('btnCreate')
btnCreate.addEventListener('click', (e) => {
  e.preventDefault()

  Runner = new Game(false)
  Runner.edit()
  console.log('in')
})

function reloadMaps() {
  const mapsContainer = document.getElementById("maps")
  fetch("/getMaps", {
    method: "POST"
  })
    .then(res => res.json())
    .then(maps => {
      mapsContainer.innerHTML = ""
      for (map of maps) {
        const p = document.createElement("p")
        p.classList.add("map")
        p.onclick = e => checkForClick(p)

        p.innerHTML = `
        <span class="name">${map.name}</span>
        <span class="size">${map.cols}x${map.rows}</span>
        <span class="score">${map.time ? getTime(map.time) : "--"}</span>
      `
        mapsContainer.appendChild(p)
      }
    })
    .catch(err => { console.err(err) })
}