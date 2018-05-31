# The future of CSS loading

CSS links (`<link rel="stylesheet" ...>`) in `<body>` should not block rendering of any markup above them.

This repo is a small test page to verify/check render-blocking.

No npm dependencies, just do `node index.js` and hit [localhost:8080](http://localhost:8080/).


## Why is this cool?

Today even if you inline critical CSS you need to async load your non-critical CSS somehow.

CSS links in body could address this if browsers stop blocking render on these.

Another way to do this is via `rel=preload` but that has some drawbacks, too (needs polyfilling in most browsers, doesn't give granular enough control).

## How did I find this?

I [saw this tweet](https://mobile.twitter.com/patmeenan/status/1001527245163368448) from Pat Meenan about shipping it Chrome 69 (Canary as of 29 May 2018).

Then [found this blogpost](https://jakearchibald.com/2016/link-in-body/) from Jake Archibald from 2016.

## Browser support

TODO:

* [ ] add a script that loads this page in various browsers via SauceLabs or BrowserStack
* [ ] grab a video or somehow do an automated check

Checked some manually for now:

* Firefox 60 ✅
* Chrome 69 (Canary) ✅
* Edge 17 ✅
* Chrome 66 ❌
* macOS Safari 11.1 ❌
* macOS Safari Technology Preview 57 ❌
* iOS Safari 11.3 ❌