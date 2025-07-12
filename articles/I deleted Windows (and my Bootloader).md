---
cat: ["Linux", "fail", "Windows"]
css: img { width: 700px }
who: lsroot
---
> ⚠️ This article was written when I had a different design. It still uses the old image style. If you're curious about what the design looked like: [Image 1](https://cloud.fiosproject.de/legacyblog1.png)  [Image 2](https://cloud.fiosproject.de/legacyblog2.png)  
<br>

**Microsoft Steals My Storage**
Or: Why 800 Gigabytes of My Drive Are Held Hostage by an OS I Don't Even Use

I have a Windows partition. It's 800GB. It just sits there. I also have a Linux partition — 100GB. And now it's full.

You might think I dual-boot. Technically, sure. But here's the twist: I haven't booted into Windows since the day I installed Linux. Not once. Not even by accident.
# Why Did I Dual-Boot?
Because I bought this laptop secondhand — off _Kleinanzeigen_, which is what Germany calls eBay for some reason. It came with Windows preinstalled. I figured, why not keep it? Maybe I'll need it someday. Maybe I'll test something on Windows.
# Windows Was a Disaster — From the First Boot
I didn't even wipe the disk at first. I went through the OOBE. This already took two Hours.

Opening the Start menu took two full seconds. Clicking "Shut Down"? Another seven seconds to even react. And then came the shutdown itself — _two more minutes_ of spinning wheels.

And yes, I still thought dual-booting was a good idea.

I thought 100GB is enough for Linux. But shrinking the Windows partition? That took longer than I thought.
# Shrinking the Windows Partition
It took 30 minutes just to get to the resize tool. Because Windows decided to defragment it (which I can understand) first — while simultaneously launching an update (which I can't understand) that ate the disk performance during the defragmentation.

Eventually it shrunk. I shut the system down. It didn't shut down. Instead, it displayed: `Preparing Windows`

No. I didn't want to prepare Windows. I wanted to leave Windows. But there it sat — for over an hour. Then it changed:  
`Working on updates 0%. Don't turn off your computer.`

Of course.

At 30%, it rebooted. I hijacked the restart and went into the boot menu fast enough to boot from a USB and start the Linux installer.

Linux booted. Partitioning was hard thanks to Windows' partitioning on the drive. But once Linux was in, it was fast. Even on an old spinning HDD. I used that 100GB heavily — daily work, projects, everything.

Then it filled up.
# Time to Kill Windows
So I made a bootable USB with Rescatux on it — because it comes with a bootloader repair tool I'd need. First step: erase Windows. Accidentally I deleted my swap partition too. But I upgraded my RAM before; The swap was more symbolic than practical.
This was my Partition Layout after Windows:

![](/files/partitions_new.png)

I had unallocated space where Windows used to be. Wanted to grow my root partition. GParted said no.

Why? The partitions have to be adjacent. Fine. I moved them around. Clicked “resize.” It failed.

Turns out `e2fsck` — the thing GParted uses — didn't support the `orphan_file` feature flag enabled on my ext4 filesystem. Because Rescatux is based on Debian 10. And Debian 10 is old. 

# Enter SystemRescueCD
I switched to SystemRescueCD. Based on Arch. Bonus: I had Arch installed, so I also had the necessary tools: `arch-chroot`, `pacman`

This time the partition grew. But the UUID changed. My bootloader couldn't find the root filesystem anymore.

I could've just edited the config to point to the new UUID. Instead, I reinstalled the bootloader (GRUB). Except it didn't detect Arch anymore.

So I regenerated my `fstab`. Regenerated my bootloader config. Still nothing.

Then I deleted the boot partition entirely. And recreated it.

Of course, now I was missing `vmlinuz-linux` and `initramfs.img`. No kernel, no boot. But reinstalling the `linux` package fixed that.

This time I went for `systemd-boot`. It's simple. And was installed with one command:
```bash
bootctl install
```
It worked. But it didn't auto-detect Arch. I had to write the boot entry myself. And it was only just three lines.

I rebooted. It almost worked.
# One Last Failure
The system couldn't mount the ESP. UUID mismatch — again. Easy fix: I updated `fstab` with the new UUID. Rebooted. It worked. Finally.

Now I have all the space. No Windows. Just Linux, doing what I tell it to do.



















-
