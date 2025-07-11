---
cat: ["Linux", "An Excellent Thing"]
css: img { width: 500px }
who: lsroot
---

I would say that the three biggest code editors are `VSCode`, `JetBrains Editors`, and `Vim`/`Vim-Based`. Most beginners choose `VSCode`. Enterprises probably use a `JetBrains` editor. And all users with a ThinkPad, Arch Linux, and a Hyprland rice use `Vim` or a `Vim-Based` editor (maybe also others). But some would say one is missing: `emacs`. I will get to `emacs` later.

Fun Fact: Linus Torvalds uses a modified version of `MICROemacs`.

# Why I Use `VSCode`
I am a `VSCode` user because it was the editor recommended to me when I learned programming. I learned programming at six years old, so I needed something simple, and I stuck with `VSCode` until today. I also recommend `VSCode` because:
- Intellisense
- Extendable
- Customizable
- Keyboard Shortcuts
- Git Integration

I have a friend learning `Python` who was using `Python IDLE`. If you don't know `Python IDLE`, it's a very basic Python editor that comes preinstalled with `Python`. No Intellisense. No file browser. No integrated terminal. It felt like Word with syntax highlighting. When I showed him `VSCode`, he was stunned by the autocompletion.

# Trying `Vim` and `Lazy.nvim`

I mentioned before that I like the keyboard shortcuts in `VSCode`. Of course, there are some really nice ones like `ctrl`+`l`, but I was always jealous of `vim` users because they have a lot more shortcuts. So I tried `lazy.nvim`, a premade configuration that should feel like an `IDE`. It was great with shortcuts, BUT the Intellisense was really basic. And I use Intellisense a lot. In lazy.nvim it was just not as good as in `VSCode`, so I switched back to `VSCode` and learned more shortcuts there.

However, I always wanted things like insert mode navigation via J and K. I also use a browser extension called `Vimium` that makes the browser feel like Vim (I already made a [blog post](https://fiosproject.de/read/#An%20Excellent%20Thing%20Vimium.md) about it).

# Discovering `Spacemacs`

Another day, I again wanted to use my editor only with keyboard shortcuts. So I searched "CLI Code Editors." Most results showed the usual (`Nano`, `Vim`, `Micro`, `Helix`), but I wanted an out-of-the-box Intellisense experience like in `VSCode`. I dug deeper and found on a random website at place 22: `Spacemacs`.

It looked promising. Installation was straightforward: Install `emacs`, clone the `spacemacs` repo into the `emacs` config folder, and start `emacs`. On first start, it asked:

What is your preferred editing style?
Among the stars aboard the Evil flagship (vim)
On the planet Emacs in the Holy control tower (emacs)

Here is proof from the source code:

![source code of spacemacs showing the questions in the OOBE](/files/emacsorevil.png)

I chose hybrid (not an option by default but easy to change). Find the .spacemacs file in your home directory and change:

```diff
- dotspacemacs-editing-style 'emacs
+ dotspacemacs-editing-style 'hybrid
```

The unended quotation mark is not a typo. Restart `spacemacs` to apply the config.

I opened an `HTML` file, and it asked to install the `web` package for better `HTML` support. It was stunning: it had Intellisense features I had only seen in `VSCode`, like `!` for an HTML skeleton or `link:css` to link a `CSS` file. At first, these auto-suggestions needed `ctrl`+`j`, but you can change that in the config.

You can find my `.spacemacs` dotfile [here](/files/dotspacemacs). This config also features copy-paste from the system clipboard (requires `wl-clipboard` on Wayland), improved auto completions to feel like `VSCode`. Spacemacs also has integrated livereload for `HTML`. Unlike `VSCode`, where you need an extension, `spacemacs` has it out of the box, and better: it updates when you press a key without reloading the entire page.

In hybrid mode, you also have all the vim modes. The shortcuts are great. You press `SPC` (space) to start a command (like `:` in Vim). For example, to save the current file, type `SPC f s` (f for file, s for save). It shows everything with a description like in Helix.

![](/files/spacemacs.png)

I think it also has great language support. For example, I write my posts in Markdown, and when referencing code, it applies syntax highlighting, which is better than in `VSCode`.

`VSCode` with code in Markdown (no extensions):

![](/files/spacemacs2.png)

Spacemacs with code in Markdown (no extensions):

![](/files/spacemacs3.png)

You don't see syntax highlighting in this blog. Maybe I will add it.

# Useful Shortcuts in Spacemacs

Here are some shortcuts I learned:

### Shortcut Prefixes

`C-` = control
`M-` = alt
`SPC` = space

### Projects

Open a project (folder): `SPC f f`
Open file: `Enter`

### File Navigation

Go to file: `SPC f f`
Save file: `SPC f s`
Rename current file: `SPC f R` (also available in the dired buffer)
Accept auto completion: `C-j`
Search: `/` or `SPC s s`

Copy in visual mode: `y`
Paste: `p`

In file view (`SPC f f`):
Rename / Move: `R`
Copy: `C`

New line above cursor: `O`
New line below cursor: `SPC i j`
View buffers: `SPC b b`

### System

Open logs/messages: `C-h e`

# I Still Use `VSCode`

If I were a frontend developer, I think I would fully switch to `spacemacs`. But I am a `JavaScript` backend developer. When opening a `JavaScript` file in `spacemacs`, it underlines everything as a warning and doesn't have Intellisense. Maybe I will figure out how to extract the `JavaScript` LSP from `VSCode` and insert it into `spacemacs`. But for everything else that doesn't use `JavaScript` (like writing markdown files or scripts), I use `spaceemacs`. I also think hybrid mode is great for those coming from `Vim`.