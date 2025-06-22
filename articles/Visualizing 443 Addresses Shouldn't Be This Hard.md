---
cat: ["Not An Excellent Thing", "fail", "Linux"]
css: img { width: 500px }
who: lsroot
---
> ⚠️ This article was written when I had a different design. It still uses the old image style. If you're curious about what the design looked like: [Image 1](https://cloud.fiosproject.de/legacyblog1.png)  [Image 2](https://cloud.fiosproject.de/legacyblog2.png)  
<br>

In my last blog post, I introduced the new category: `An Excellent Thing`. And now, I’m already introducing the next one: `Not an Excellent Thing`. Maybe I’m taking this category concept way too seriously.
# Visualizing 443 Addresses on a Map
Someone asked me to visualize 443 addresses on a map. I figured it would be easy: get the coordinates, and show them on `OpenStreetMap`.  
Displaying the data was easy thanks to the Python library `folium`, which works with `Leaflet`, a JavaScript library for interactive maps.

Getting the coordinates, however, wasn’t as smooth. I used the `Nominatim` API, but the resulting markers were scattered across the globe.  
To solve this, I added a prefix with my city and village.  

That helped a bit — but I only got 13 results. So I moved on to scraping coordinates from Google Maps and importing them into `OpenStreetMap`.

![](/files/maps.png)
# Wayland vs. Automation: Why I Had to Switch Back to Windows (Only for two Hours)
Initially, I tried using the **Google Maps JavaScript API** to visualize the addresses, which worked fine. Then I discovered the **Google Maps Geocoding API**, which seemed like a better fit for turning addresses into coordinates.

According to the Web Interface, I could use the same API key from the JavaScript API. That sounded great—until I actually tried it. Every request to the Geocoding API returned a `401 Unauthorized`. I tried using the API key management interface to create a separate key specifically for the Geocoding API, but that option simply didn’t work—it failed silently.

So I decided to go back to scraping coordinates manually—yes, literally scraping them by automating mouse movements. That's when I ran head-first into another problem: **Wayland**.

On Wayland, simulating mouse actions is surprisingly difficult. I tried using `pyautogui` to get the mouse position, but it only returned values if my mouse was hovering _inside_ the VSCode window. Moving the mouse outside it? No data. I assumed the problem was with VSCode’s integrated terminal, so I ran the script from a standalone terminal emulator. Same result: it could only read the mouse position if the pointer was in VSCode.

Even worse, trying to simulate mouse movement or clicks caused strange behavior or outright crashes. I also tried using tools like `xdotool`, but Wayland doesn’t allow legacy X11 tools to control the pointer unless you're using an XWayland workaround—and even then, it’s inconsistent and unreliable.

At that point, I gave up and dragged my old **Windows PC** out of storage. As much as I dislike using it now, it handled the task much more reliably. Mouse control worked as expected, and I was finally able to automate interaction with Google Maps using `pyautogui`.
# The Umlaut Trap
On Windows, I automated the search bar, right-click, and coordinate copy process. But being in Germany, I ran into **Umlauts** (`ä`, `ö`, `ü`, `ß`). `pyautogui.write()` doesn’t handle them, so I translated them:

|Umlaut|Latin Alternative|
|---|---|
|ä|ae|
|ö|oe|
|ü|ue|
|ß|ss|

This worked better — until I realized I forgot about **capital umlauts** like `Ä`, `Ö`, and `Ü`.

Another issue: a street named `Bommershöferweg` didn’t work, even though the umlaut was handled. Google Maps expected a space: `Bommershöfer Weg`. I added a fix… then realized other addresses ended in `weg` too. So I had to stop, edit, and rerun the 22-minute scraping process. Again.
# gps-coordinates.org
After all the failed attempts—API errors, broken scrapers, mouse automation woes, and hours wasted re-running scripts—I finally stumbled upon a small site: [`gps-coordinates.org`](https://gps-coordinates.org). It looked like one of those simple utility sites you’d expect to break under pressure, but it turned out to be exactly what I needed.

At first glance, it was just a basic form where you enter an address and get GPS coordinates back. But it worked. Consistently. Every address I fed it came back with reasonably accurate latitude and longitude values, even ones that had previously failed with other methods.

Naturally, I assumed it was using something like OpenStreetMap or Google Maps on the backend. So I opened my browser’s dev tools, looked at the network tab—and that's when I saw the real twist:

**It was using Apple’s MapKit JS API**.

![](/files/gpscoordsinates.png)

Even more shocking: **the credentials were fully exposed on the client side**.

No authentication handshake, no obfuscation, nothing. The site simply embedded a live, unencrypted MapKit token in the frontend JavaScript, and every address lookup was sent through a publicly accessible request to Apple’s mapping service.

There were **no rate limits**.  
No OAuth.  
No billing warnings.  
Just raw, unrestricted geocoding—free to scrape and repeat.

Even when the token expired, the site silently fetched a **new valid MapKit token** and injected it on the next page load. It was almost too good to be true.

Now, I’ll admit: this raised some ethical questions. Was it okay to use a third-party website's exposed MapKit credentials? Probably not. But after dealing with API roadblocks and half-broken automation for days, it felt like a small miracle.

I didn’t abuse it—I just needed a tool that worked. And this worked.

















-
