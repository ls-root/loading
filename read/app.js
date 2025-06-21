document.addEventListener("DOMContentLoaded", function () {
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
    function updateProgress() {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        const pct = scrollable > 0
            ? Math.round((window.scrollY / scrollable) * 100)
            : 0
        const bar = document.getElementById('progress')
        bar.textContent = pct + '%'
        bar.style.width = pct / 100 * 30 + '%'
        bar.style.transition = 'width 0.25s ease'
        bar.style.backgroundColor = "#9399b2"
    }

    window.addEventListener('scroll', updateProgress)
    updateProgress()

    document.addEventListener('keydown', e => {
        if (e.key === 'b') window.location.href = '/'
        else if (e.key === 'm') document.getElementById('help').classList.toggle('hidden')
        else if (e.key === 'j') {
            window.scrollBy({ top: 100, behavior: 'smooth' })
        } else if (e.key === 'k') {
            window.scrollBy({ top: -100, behavior: 'smooth' })
        }
        // after any smooth scroll we still want to refresh the bar
        // a small timeout catches the in-progress scroll movement
        setTimeout(updateProgress, 300)
    })
})
