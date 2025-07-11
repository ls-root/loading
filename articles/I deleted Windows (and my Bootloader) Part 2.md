---
cat: ["Linux", "fail"]
css: img { width: 700px }
who: lsroot
---

Okay, misleading title. I'm not deleting Windows here. That already happened - read the last post if you want the details. Just hit n on this site to go to the previous entry. Start there. It'll make more sense.

## Linux breaks (again)
I powered on my laptop. Usual boot sequence, usual silence. Then:
```css
[ FAILED ] Failed to mount /boot/efi
```
Systemd dropped me into an emergency shell. Great. I looked it up - suggestions ranged from “just press Enter” to “type exit and hope.” I tried both. Same error.

Then I noticed something weird: my second monitor was offset. One line higher than it should be. The bottom of the screen was missing. The internal display was fine, but the external was just... off. Not sure if that was related, but it didn't help.

So I booted into `SystemRescueCD` again and reinstalled my bootloader. It seemed like a straightforward fix. It wasn't. Rebooting gave me a black screen and a blinking cursor. No prompt. No message.

I figured I'd recreate the ESP. During setup I saw the partition was marked with the `msftdata` flag. I thought I got rid of that last time. I wiped it, recreated the ESP, and reinstalled the bootloader again.

This time I got:
```
No bootable device found
```
I tried GRUB instead. It detected the OS, finally. Turns out it needs both the kernel and initramfs in place to auto-generate entries. Makes sense. But rebooting still gave me the same error. Nothing changed.

I ran `efibootmgr` to manually add the boot entry. Still nothing. UEFI wasn't having it. I've seen this behavior before - especially on this laptop. It's an Acer. Back when I first installed Linux on it, I had to go to a local tech meetup (Chaosdorf) just to get through the install. That took three hours.
## Last Resort: archinstall
At this point, I gave up trying to fix it. I had backups. I decided to reinstall Arch. I did everything by the gudie - same process I've done this on other machines too. But it still it didn't boot.
I started wondering if the HDD was failing.
So I tried something I tought I'd never touch: archinstall.

If you're not familiar, it's an official script that walks you through the install interactively. I ran it. It failed.
Then I checked - it was an outdated version. I updated the Package, and ran archinstall again.
This time it worked.
I don't know what it does differently, but it got past whatever was blocking the manual install. System booted. OS loaded. Data restored.

I'm back in.























-