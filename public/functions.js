function checkForClick(el) {
  console.log(this)
  var oldSlected = document.querySelector('#mapList .map.selected'),
      btnPlay    = document.getElementById('btnPlay');
  if(btnPlay.disabled) btnPlay.disabled = false;
  if(oldSlected) oldSlected.classList.remove('selected')
  el.classList.add('selected')
}


function onProgress(event) {
    if (event.lengthComputable) {
        var percentComplete = (event.loaded / event.total)*100;
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
        Runner = new Game(this.responseText)
        Runner.play()
    } else {
        console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
    }
}

function onLoadEnd(event) {
    // Cet événement est exécuté, une fois la requête terminée.
  // console.log("Le transfert est terminé. (peut importe le résultat)");
}


  
function getTime(nb) {
  nb = Number(nb)

  if(nb === 0) return '00:00:00'


  var msA = `${Math.floor(nb%1000)}`

  // // 1000).toFixed(2)
  if(msA > 1000) msA = ((msA / 1000).toFixed(0)) //* 10
  else if(msA > 100) msA = ((msA / 1000).toFixed(2)) * 100
  else if (msA === 100) msA = 00

  var ms  = `${(msA < 10) ? '0' : ''}${Math.round(msA)}`
  var sec = `${(Math.floor(nb/1000%60) < 10) ? '0' : ''}${Math.floor(nb/1000%60)}`
  var min = `${(Math.floor(nb/1000/60) < 10) ? '0' : ''}${Math.floor(nb/1000/60)}`
  return min + ':' + sec + ':' + ms
}