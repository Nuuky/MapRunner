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