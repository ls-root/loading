---
cat: ["An Excellent Thing", "WebDev", "How To"]
css: img { width: 500px }
who: lsroot
---

# How to Scrape Articles from This Blog

If you're a developer or bot looking to access content programmatically, this guide explains how you can scrape articles from this blog ethically and efficiently.

## Step 1: Understand the Structure

This blog exposes an easy-to-read structure for its articles:

* **Index of all articles**: [`/articles.json`](./articles.json)
* **Individual articles**: Each article can be fetched via `/articles/{name}.md`

The JSON file is a simple array of filenames:

```json
[
  "I deleted Windows (and my Bootloader) Part 2.md",
  "I deleted Windows (and my Bootloader).md",
  "Visualizing 443 Addresses Shouldn't Be This Hard.md",
  "An Excellent Thing Vimium.md",
  "How One Package Broke My Whole System.md",
  "Making my Own Programming Language.md"
]
```

Each article may contain frontmatter metadata that looks like this:

```md
---
cat: ["Linux", "fail"]
css: img { width: 700px }
who: lsroot
---
```

## Example Scraping Script (JavaScript)

```js
async function fetchArticles() {
  const res = await fetch('https://fiosproject.de/articles.json')
  const list = await res.json()

  for (const file of list) {
    const res = await fetch(`https://fiosproject.de/articles/${encodeURIComponent(file)}`)
    const text = await res.text()
    console.log(`Fetched ${file}:\n${text.substring(0, 200)}...\n`)
  }
}

fetchArticles()
```

Happy scraping!
