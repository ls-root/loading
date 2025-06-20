---
cat: ["Linux", "fail", "Windows"]
css: img { width: 700px }
---
> ⚠️ This article was written when I had a different design. It still uses the old image style. If you're curious about what the design looked like: [Image 1](https://cloud.fiosproject.de/legacyblog1.png)  [Image 2](https://cloud.fiosproject.de/legacyblog2.png)  
<br>

##### Microsoft Steals My Storage
Or: Why 800 Gigabytes of My Drive Are Held Hostage by an OS I Don’t Even Use

I have a Windows partition. It’s 800GB. It just sits there. I also have a Linux partition — 100GB. And now it’s full.

You might think I dual-boot. Technically, sure. But here’s the twist: I haven’t booted into Windows since the day I installed Linux. Not once. Not even by accident. The only reason Windows still exists on this machine is because I let it.
# Why Did I Dual-Boot?
Because I bought this laptop secondhand — off _Kleinanzeigen_, which is what Germany calls eBay for some reason. It came with Windows preinstalled. I figured, why not keep it? Maybe I’ll need it someday. Maybe I’ll test something. Maybe I’ll regret it.
# Windows Was a Disaster — From the First Boot
I didn’t even wipe the disk at first. I went through the out-of-box experience. Huge mistake. Two hours of my life gone before I even reached the desktop.

Opening the Start menu took two full seconds. Clicking "Shut Down"? Another seven to even react. And then came the shutdown itself — _two more minutes_ of spinning wheels and empty promises.

And yes, I still thought dual-booting was a good idea.

I carved out 100GB for Linux. Just enough, I thought. But shrinking the Windows partition? That was another disaster.
# Shrinking Hell
It took 30 minutes just to get to the resize tool. Because Windows decided to defragment first — while simultaneously launching an update that ate the disk performance _during_ the defrag.

Eventually it shrunk. I shut the system down. It didn’t shut down. Instead, it displayed: `Preparing Windows`

No. I wasn’t preparing Windows. I was leaving Windows. But there it sat — for over an hour. Then it changed:  
`Working on updates 0%. Don't turn off your computer.`

Of course.

At 30%, it rebooted. I hijacked the restart and went into the boot menu fast enough to boot from a USB and start the Linux installer.

Linux booted in seconds. Installation? Fast — once I got past the mess Windows left behind. Partitioning was a nightmare thanks to Windows’ grip on the drive. But once Linux was in, it was fast. Responsive. Even on an old spinning HDD, it felt like I’d just stepped into the future. I used that 100GB heavily — daily work, experiments, projects, everything.

Then it filled up.
# Time to Kill Windows
So I made a bootable USB with Rescatux on it — because it comes with a bootloader repair tool I’d need. First step: erase Windows. Accidentally I deleted my swap partition too. No big deal. I upgraded my RAM; swap was more symbolic than practical.
This was my Partition Layout after Windows:
![[partitions.png]]
I had unallocated space where Windows used to be. Wanted to grow my root partition. GParted said no.

Why? Because Linux tools are often smarter than they need to be. The partitions have to be adjacent. Fine. I moved them around. Clicked “resize.” It failed.

Turns out `e2fsck` — the thing GParted uses — didn’t support the `orphan_file` feature flag enabled on my ext4 filesystem. Because Rescatux is based on Debian 10. And Debian 10 is old. Not cute-old. Rusty, broken-old.
# Enter SystemRescueCD
I Switched to SystemRescueCD. Based on Arch. Now we’re talking. Bonus: I had Arch installed, so all the tools made sense. `arch-chroot`, `pacman`, familiar territory.

This time the partition grew. But the UUID changed. And guess what? My bootloader couldn’t find the root filesystem anymore. Of course.

I could’ve just edited the config to point to the new UUID. Instead, I reinstalled the bootloader. Logical, right? Except it didn’t detect Arch anymore.

So I regenerated my `fstab`. Regenerated my bootloader config. Still nothing.

Fine. Burn it down. Deleted the boot partition entirely. Recreated it.

Of course, now I was missing `vmlinuz-linux` and `initramfs.img`. No kernel, no boot. But reinstalling the `linux` package fixed that.

This time I went for `systemd-boot`. It’s simple. Elegant. One command:
```bash
bootctl install
```
It worked. But it didn’t auto-detect Arch. I had to write the boot entry myself — though that was easy enough. Just three lines: reference `vmlinuz-linux` and `initramfs.img`, and it was done. Clean. Minimal.

I rebooted. It almost worked.
# One Last Failure
The system couldn't mount the ESP. UUID mismatch — again. Easy fix: updated `fstab` with the new UUID. Rebooted. It worked. Finally.

Now I have all the space. No Windows. No second-guessing. Just Linux, doing what I tell it to do.



















-
