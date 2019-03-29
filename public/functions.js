 
function getTime(nb) {
  nb = Number(nb)

  if(nb === 0) return '00:00:00'


  var msA = `${nb%1000}`

  // // 1000).toFixed(2)
  if(msA > 1000) msA = ((msA / 1000).toFixed(0)) //* 10
  else if(msA > 100) msA = ((msA / 1000).toFixed(2)) * 100

  msA = (Math.round(msA) > 100) ? '00' : Math.round(msA)

  var ms  = `${(msA < 10) ? '0' : ''}${msA}`
  var sec = `${(Math.floor(nb/1000%60) < 10) ? '0' : ''}${Math.floor(nb/1000%60)}`
  var min = `${(Math.floor(nb/1000/60) < 10) ? '0' : ''}${Math.floor(nb/1000/60)}`
  return min + ':' + sec + ':' + ms
}