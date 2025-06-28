document.addEventListener("DOMContentLoaded", () => {

  const mobileMarker = document.getElementById("mobileMarker");
  if (mobileMarker && window.getComputedStyle(mobileMarker).display === "block") {
    // I think that Mobile users are not Bots
    fetch("humanlanded.php")
      .then(res => {
        if (res.ok) window.location = "/"
      })
  }


  document.addEventListener("keydown", e => {
    if (e.key === "m") {
      const help = document.getElementById("help")
      if (help) help.classList.toggle("hidden")
    }

    if (e.key === "f") {
      window.location.hash = "step2"
    }
  })
})
document.addEventListener("keydown", e => {
  if (e.key === "h" && window.location.hash === "#step2") {
    fetch("humanlanded.php")
      .then(res => {
        if (res.ok) window.location = "/"
      })
      .catch(err => console.error("Fetch error:", err))
  }
})

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#step2") {
    document.getElementById("step1").style.display = "none"
    document.getElementById("step2").style.display = "block"
  }
})
