---
cat: ["Linux", "An Excellent Thing"]
css: img { width: 250px }
who: lsroot
---
> ⚠️ This article was written when I had a different design. It still uses the old image style. If you're curious about what the design looked like: [Image 1](https://cloud.fiosproject.de/legacyblog1.png)  [Image 2](https://cloud.fiosproject.de/legacyblog2.png)  
<br>

Welcome to the First Blog Post Under the Category `An Excellent Thing`
In this category, I want to showcase some of the tools and projects I've been working with. It's been a long time since my last post—sorry about that!

Today, I want to talk about the browser extension **Vimium**. It's available for all major browsers:

| Browser | Link                                                                                                           |
| ------- | -------------------------------------------------------------------------------------------------------------- |
| Chrome  | [Vimium on Chrome Web Store](https://chromewebstore.google.com/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb) |
| Firefox | [Vimium on Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/vimium-ff/)                         |
| Safari  | I'm really not an Apple guy. Hopefully, you can find it in your extension store—or just use Firefox.           |
## What Does `Vimium` Do?
You might be wondering why this post is also in the `Linux` category. Let me explain.

`vi` (and its variants like `vim` and `neovim`) is a text editor that relies heavily on keyboard shortcuts. You can get really fast with it. For example, in `vim`, you use `h`, `j`, `k`, and `l` to navigate because those keys are located on the home row—no need to stretch your fingers. It’s all about **speed** and **productivity** (because using the mouse is slow).

Now imagine you're a developer using `vim`. While programming, you might wonder: _"How can I add two numbers in Python?"_ So you open your browser and search for it—but then you need to move your hand off the keyboard to click a search result. That’s a speed bump.

Here’s where **Vimium** comes in.

When you have the `Vimium` extension installed and press `f`, Vimium assigns a label (usually two letters) to every clickable element on the page. You just type the letters corresponding to the link or button you want to click—**no mouse needed**.

![A screenshot of `vimium` showing a website with two buttons, each marked with a small letter box](/files/vimium.png "A screenshot of `vimium` showing a website with two buttons, each marked with a small letter box")

_A screenshot of `vimium` showing a website with two buttons, each marked with a small letter box_
You can also watch Vimium in action here: [Demo Video](https://cloud.fiosproject.de/Vimium.mp4) (Everything shown was done using only the keyboard!)
## What Other Features Does `Vimium` Have?
Just like `vim`, it uses `j` and `k` to scroll down and up. You can customize which characters it uses for hint markers—by default, it uses: `sadfjklewcmpgh`. Why not the whole alphabet? Because all these characters are on the home row or close to it, making them faster to type.
You can even set custom CSS for the hint boxes (called HintMarkers) to make them more visible or to match your browser theme.

With `b` and `o`, you can open a command box to quickly access bookmarks, history, or URLs. The two commands behave slightly differently:
- Pressing `b` lets you search your bookmarks.
- Pressing `o` allows you to open a URL, bookmark, or history entry
You can also navigate the page efficiently:
- Use `gg` to scroll to the top of the page.
- Use `G` to scroll to the bottom
- Press `r` to reload the current page.
- To copy the current URL type `yy`.
- To jump to the next input field, press `gi`.
Managing tabs is simple too:
- Press `x` to close the current tab
- If you closed a tab by mistake, press `X` to **restore** it.
And there’s a whole lot more! I recommend checking out the full cheat sheet on the Vimium website: [https://vimium.github.io/](https://vimium.github.io/)
## Vimium vs. Vimium C: What's the Difference?
If you searched your extension store, you’ve probably also seen an extension called **`Vimium C`**.  
**What’s the difference?**  
While both `Vimium` and `Vimium C` aim to bring Vim-style keyboard navigation to your browser, there are some notable differences between the two.


| Feature                   | Vimium                            | Vimium C                                                             |
| ------------------------- | --------------------------------- | -------------------------------------------------------------------- |
| **Link Hinting Accuracy** | Occasionally misses some elements | More reliable; better at detecting clickable elements                |
| **Command Repetition**    | Limited                           | Supports command repetition (e.g., `5t` to open 5 tabs)              |
| **Visual Mode**           | Basic                             | Enhanced visual mode with caret and line modes                       |
| **Custom Key Mappings**   | Basic support                     | Advanced support with per-site customization                         |
| **Search bar**            | Functional                        | Enhanced Searchbar with history, bookmarks, and tab search           |
| **Performance**           | Slightly higher overhead          | Optimized for performance with lower overhead                        |
| **Frame Navigation**      | Limited                           | Improved frame navigation capabilities                               |
| **Global Shortcuts**      | Limited                           | Supports global shortcuts that work even when the page isn't focused |

So basically, `Vimium` is like `vi`, and `Vimium C` is the advanced version—like `vim` or `neovim`.






‏‏‎ ‎
