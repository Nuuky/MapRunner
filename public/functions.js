 
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