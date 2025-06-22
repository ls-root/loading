document.addEventListener("DOMContentLoaded", function () {
    const hash = decodeURIComponent(window.location.hash)
    const re = new RegExp("\\b.+?\\.md\\b")
    const match = re.exec(hash)
    const articleName = match ? match[0] : null

    if (!articleName || hash === "#null") {
        document.getElementById("error").classList.remove("hidden")
        document.getElementById("block").classList.add("hidden")
        let wait = 2
        const interval = setInterval(() => {
            document.getElementById("timer").textContent = wait
            wait--

            if (wait < 0) {
                window.location.href = "/"
            }
        }, 1000)
        return
    }

    window.location.hash = encodeURIComponent(articleName)
    document.title = articleName + " - Loading Blog"
    document.getElementById("title").textContent = articleName

    async function renderArticle() {
        const res = await fetch("/articles/" + encodeURIComponent(articleName))
        const text = await res.text()
        const lines = text.split("\n")

        // Extract frontmatter block
        let frontmatter = {}
        let inFrontmatter = false

        for (let line of lines) {
            if (line.trim() === '---') {
                if (!inFrontmatter) {
                    inFrontmatter = true
                    continue
                } else {
                    break
                }
            }

            if (inFrontmatter) {
                const [key, ...rest] = line.split(":")
                if (!key || !rest.length) continue
                const rawValue = rest.join(":").trim()

                if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
                    try {
                        frontmatter[key.trim()] = JSON.parse(rawValue)
                    } catch {
                        frontmatter[key.trim()] = rawValue
                    }
                } else {
                    frontmatter[key.trim()] = rawValue
                }
            }
        }

        if (frontmatter.who)
            document.getElementById("who").textContent = frontmatter.who

        if (frontmatter.css) {
            const cssobj = document.createElement("style")
            cssobj.innerText = frontmatter.css
            document.body.appendChild(cssobj)
        }

        const contentStart = lines.findIndex((line, i) => line.trim() === '---' && i > 0) + 1
        const articlesContent = lines.slice(contentStart).join("\n")
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

    const getNext = (arr, current) => {
        const idx = arr.indexOf(current)
        if (idx < 0 || idx >= arr.length - 1) return null
        return arr[idx + 1]
    }

    async function next() {
        const articles = await fetch("/articles.json")
        const res = await articles.json()
        window.location.href = "/read#" + getNext(res, articleName)
    }

    const getLast = arr => {
        if (arr.length === 0) return null
        return arr[arr.length - 1]
    }

    async function last() {
        const articles = await fetch("/articles.json")
        const res = await articles.json()
        window.location.href = "/read#" + getLast(res, articleName)
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'b') window.location.href = '/'
        else if (e.key === 'm') document.getElementById('help').classList.toggle('hidden')
        else if (e.key === 'j') {
            window.scrollBy({ top: 100, behavior: 'smooth' })
        } else if (e.key === 'k') {
            window.scrollBy({ top: -100, behavior: 'smooth' })
        } else if (e.key === 'n') next()
        else if (e.key === 'l') last()

        setTimeout(updateProgress, 300)
    })
})
