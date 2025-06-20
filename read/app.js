document.addEventListener("DOMContentLoaded", function() {
    const hash = decodeURIComponent(window.location.hash)
    const re = new RegExp("\\b.+?\\.md\\b") // Get only file name without categories
    const match = re.exec(hash)
    const articleName = match ? match[0] : null

    if (!articleName) return

    window.location.hash = encodeURIComponent(articleName)
    document.title = articleName + " - Loading Blog"
    document.getElementById("title").textContent = articleName

    async function renderArticle() {
        const res = await fetch("/articles/" + encodeURIComponent(articleName))
        const text = await res.text()
        const lines = text.split("\n")

        // Extract frontmatter before slicing
        const frontmatterLines = lines.slice(1, 3).map(line => line.slice(4))
        const css = frontmatterLines[1].slice(1)

        const cssobj = document.createElement("style")
        cssobj.innerText = css
        document.body.appendChild(cssobj)

        const articlesContent = lines.slice(4).join("\n") // Remove frontmatter
        document.getElementById("content").innerHTML = marked.parse(articlesContent)
    }

    renderArticle()

    document.addEventListener("keydown", e => {
        if (e.key === "b") window.location.href = "/"
        else if (e.key === "m") document.getElementById("help").classList.toggle("hidden")
    })
})
