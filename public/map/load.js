
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


btnPlay.addEventListener('click', function(e) {
  e.preventDefault()

  var mapSelected = document.querySelector('#mapList .map.selected > .name')

  const req = new XMLHttpRequest();
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

