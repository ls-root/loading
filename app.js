document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0
  let catIndex = 0
  let articles = []
  let categories = []

  async function renderArticles(only) {
    const res = await fetch("articles.json")
    const articlesData = await res.json()
    const container = document.getElementById("articles-container")
    container.innerHTML = "" // Clear old articles before rendering new ones

    const allCats = new Set()

    // Render articles
    for (const name of articlesData) {
      // Create article element
      const article = document.createElement("p")
      article.setAttribute("tabindex", "-1")

      // Get content
      const res = await fetch("articles/" + name)
      const articlesContent = await res.text()
      let lines = articlesContent.split("\n")
      let frontmatter = lines
        .slice(1, 3)
        .map(line => line.slice(4))
        .join("\n")
        .split("\n")

      const articleCategories = JSON.parse(frontmatter[0])
      const css = frontmatter[1].slice(2, -1)

      article.innerText = name + " " + JSON.stringify(articleCategories)
      articleCategories.forEach(cat => allCats.add(cat))

      // only render if no filter or if the article has the category that is in only
      if (!only || articleCategories.includes(only)) {
        container.appendChild(article)
      }
    }

    articles = Array.from(container.querySelectorAll("p"))
    currentIndex = 0
    updateSelection()

    renderCategories(Array.from(allCats))
  }

  //--------------
  // Art Selection
  //--------------
  function updateSelection() {
    articles.forEach((el, i) => {
      el.classList.toggle("selected", i === currentIndex)
      el.setAttribute("tabindex", i === currentIndex ? "0" : "-1")
    })
    articles[currentIndex]?.scrollIntoView({ block: "nearest", behavior: "smooth" })
  }

  function moveSelection(direction) {
    const maxIndex = articles.length - 1
    if (direction === "down" && currentIndex < maxIndex) currentIndex++
    if (direction === "up" && currentIndex > 0) currentIndex--
    updateSelection()
  }

  async function renderCategories(catList) {
    //--------------
    // Cat Selection
    //--------------

    const container = document.getElementById("categories")
    container.innerHTML = ""

    catList.forEach(cat => {
      const span = document.createElement("span")
      span.setAttribute("is-", "badge")
      span.setAttribute("cap-", "square")
      span.textContent = cat
      container.appendChild(span)
    })

    categories = Array.from(container.querySelectorAll("span"))
    catIndex = 0
    updateCatSelection()
  }

  function updateCatSelection() {
    categories.forEach((el, i) => {
      el.classList.toggle("selected", i === catIndex)
      el.setAttribute("tabindex", i === catIndex ? "0" : "-1")
    })
    categories[catIndex]?.scrollIntoView({ inline: "nearest", behavior: "smooth" })
  }

  function getSelectedCategory() {
    return categories[catIndex]?.textContent
  }

  function moveCategory(direction) {
    const maxIndex = categories.length - 1
    if (direction === "right" && catIndex < maxIndex) catIndex++
    if (direction === "left" && catIndex > 0) catIndex--
    updateCatSelection()
  }

  // Register keydown listener only once to avoid repeated listeners
  document.addEventListener("keydown", e => {
    if (e.key === "j" || e.key === "ArrowDown") moveSelection("down")
    else if (e.key === "k" || e.key === "ArrowUp") moveSelection("up")
    else if (e.key === "l" || e.key === "ArrowRight") moveCategory("right")
    else if (e.key === "h" || e.key === "ArrowLeft") moveCategory("left")
    else if (e.key === "o") {
      const container = document.getElementById("articles-container")
      container.innerHTML = "" // Clear articles before re-rendering
      renderArticles(getSelectedCategory())
      document.getElementById("enter").setAttribute("cap-", "square")
      document.getElementById("esc").style.visibility = "visible"
    }
    else if (e.key === "Escape") {
      const container = document.getElementById("articles-container")
      container.innerHTML = "" // Clear articles before re-rendering
      renderArticles()

      document.getElementById("enter").setAttribute("cap-", "square round")
      document.getElementById("esc").style.visibility = "hidden"
    }
  })

  renderArticles()
})
