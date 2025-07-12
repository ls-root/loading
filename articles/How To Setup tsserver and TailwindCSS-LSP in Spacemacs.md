---
cat: ["How To"]
css: img { width: 500px }
who: lsroot
---

> This post references my last blog post, *An Excellent Thing: Spacemacs*. You can read it by pressing `n`.

In the last post, I mentioned that I really like Spacemacs but don’t use it for my main development because it lacks good IntelliSense out of the box, and I didn’t want to deal with setting up LSPs. However, today I tried it – and surprisingly, it was easy. So I want to share it with the world in a new category called *How To*. In this post, I’ll show you how to get IntelliSense working for TailwindCSS and JavaScript/TypeScript.

Some of you may ask: *Why do you need TailwindCSS if you said you’re a backend developer and not a frontend developer?* That’s true, but sometimes I need a small UI – I can’t just tell clients “call the API.” For these quick frontends, I use TailwindCSS.

---

# TailwindCSS LSP

Spacemacs uses **configuration layers**, which you can think of as plugins. To get LSP support for TailwindCSS:

### 1. Add the `lsp` layer

Open Spacemacs with `SPC f e d` to edit your configuration file. Search for:

```lisp
dotspacemacs-configuration-layers
'(python
```

Use `SPC s s` to search. In the list of layers (e.g. `python`, `emacs-lisp`), add `lsp` and restart Spacemacs. If there are no errors, it installed successfully.

### 2. Configure lsp-mode to use the Tailwind CSS Language Server

Still in your configuration file, search for:

```lisp
dotspacemacs/user-config
```

In that section, add:

```lisp
(with-eval-after-load 'lsp-mode
  (add-to-list 'lsp-language-id-configuration
               '(html-mode . "html"))
  (add-to-list 'lsp-language-id-configuration
               '(web-mode . "html"))
  (lsp-register-client
   (make-lsp-client
    :new-connection (lsp-stdio-connection
                     '("tailwindcss-language-server" "--stdio"))
    :major-modes '(html-mode web-mode)
    :server-id 'tailwindcss-ls)))
```

This tells lsp-mode to use the Tailwind CSS Language Server for HTML and web-mode files.

### 3. Install the Tailwind CSS Language Server

You need `npm` for this. Run:

```bash
sudo npm install -g @tailwindcss/language-server
```

### 4. Start the LSP

Make sure you have a `tailwind.config.js` file in your project and that you’re editing an HTML file. Then start the server with:

```
M-x lsp
```

---

# JavaScript/TypeScript (tsserver)

This is much simpler.

### 1. Install TypeScript globally

You need `npm` installed. Run:

```bash
sudo npm install -g typescript
```

### 2. Add the tide backend to your JavaScript layer

Open your configuration file with `SPC f e d` and search for:

```lisp
dotspacemacs-configuration-layers
'(python
```

You should find a line with `javascript`. Replace it with:

```lisp
(javascript :variables javascript-backend 'tide)
```

Restart Spacemacs to apply the changes – and that’s it.

