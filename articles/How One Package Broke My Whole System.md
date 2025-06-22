---
cat: ["Linux", "fail"]
css: img { width: 500px }
who: lsroot
---
> ⚠️ This article was written when I had a different design. It still uses the old image style. If you're curious about what the design looked like: [Image 1](https://cloud.fiosproject.de/legacyblog1.png)  [Image 2](https://cloud.fiosproject.de/legacyblog2.png)  
<br>

Back when I first started using Linux, I installed Ubuntu. I was really careful with the installation because I thought that if Linux got corrupted, Windows would also be affected. When setting up a dual-boot system, I ran the installer on a different computer, installed Ubuntu onto a USB hard drive, and then booted from that drive.

![](/files/dualboot.png)
## How Linux “Broke” My Windows
After I installed Linux, I started setting it up. Here's what I did:
- Changed my wallpaper
- Connected my Bluetooth headphones
- Installed VSCode
- Installed Node.js
- Explored the pre-installed apps
The next day, I forgot that I had Linux installed and booted into Windows. The first thing I did was try to connect my Bluetooth headphones, but it didn’t work. So I ended up using a wired connection instead. Also, the LAN port on the motherboard wouldn’t connect — only a LAN-to-USB adapter worked.

The next day, I booted into Linux again, and everything worked fine.
## How I destroyed My Linux Setup 
I think it was around four days into using Linux when I wanted to install an application (I don’t remember the name anymore). It was in the AppImage format, and the guide I was following said I needed to install a dependency called `libfuse2`. I installed it using `apt` and said "yes" to everything.

After installing the dependency, I wanted to run the AppImage file. I opened the file manager to launch it, but instead of running the app, I got a folder analysis view. Now I know that this usually appears when the file manager has been removed.

After that, I rebooted the system, but I couldn’t log in anymore. So I gave up on Linux and went back to using Windows.
## What Actually Happened
Now I know a lot more about Linux and use it as my daily driver. Back then, when I had these issues, I didn’t search online for solutions.
### Bluetooth Issues
When you connect a Bluetooth device, Windows stores the **MAC address** of the device and generates a **link key**, which is saved by both Windows and the Bluetooth device. In some cases—especially with certain headphones—the device may also store the MAC address of the PC it paired with.

![](/files/bluethooth.png)

When you switch to Ubuntu, your PC may use a different Bluetooth MAC address, and a new link key is generated. However, your headphones may still be expecting to connect to a device with the original MAC address and link key, so the pairing fails.
### No File Manager and Login Failure
You might know the YouTuber **Linus Tech Tips**, who also tried using Linux and ran into issues when installing the `steam` package. The `steam` package had conflicts with some other packages, including ones responsible for the desktop environment.

When a package conflict occurs, the package manager asks whether to remove the conflicting packages. If you don’t read the output carefully and just say “yes” (like I did), things can go wrong.

In my case, Ubuntu already had `fuse3` installed. I tried to install an older version (`fuse2`), which conflicted with `fuse3`. The package manager asked if I wanted to remove `fuse3` — **and all packages that depended on it**. Unfortunately, many components of the GNOME desktop environment depend on `fuse3`.

![](/files/libfuse.png)

As a result, I lost the file manager (since it's part of GNOME), and I couldn’t log in anymore because the system tried to load a desktop environment that I had unknowingly uninstalled.
## What Have I Learned
Always read every **yes or no** prompt carefully.
If something breaks, **look it up** — don’t give up.
