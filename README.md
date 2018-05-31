# The future of CSS loading

CSS links (`<link rel="stylesheet" ...>`) in `<body>` should not block rendering of any markup above them.

This repo is a small test page to verify/check render-blocking.

No npm dependencies, just do `node index.js` and hit [localhost:8080](http://localhost:8080/).


## How?

[Read this blogpost](https://jakearchibald.com/2016/link-in-body/) from Jake Archibald or see small example below:

Simply place your style link tags in body.

```html
<head>
    <style>/* header styles */</style><!-- embedded/inlined critical styles - will not block rendering -->
</head>
<body>
  <header>...</header>
  <link rel="stylesheet" href="/main.css"><!-- link in body - will not block rendering for anything above-->
  <main>...</main>
</body>
```

e.g. in the example above `header` will render straight away then `main` will render as soon as main.css is loaded.

### The empty `<script>` tag 'polyfill'

Some browsers can be 'convinced' to follow the behaviour described above by deliberately blocking parsing (after a link tag in body) with an empty script tag which will allow rendering.

```html
  <link rel="stylesheet" href="/main.css"><script> </script>
  <main>...</main>
```

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

* ✅ supported
* ☑️ supported with empty script 'polyfill'
* ❌ not supported

| Browser              |    |
|----------------------|:--:|
| Chrome 69 (Canary)   | ✅ |
| Edge 17              | ✅ |
| Firefox 60           | ✅ |
| macOS Safari 11.1    | ☑️ |
| Chrome 67            | ❌ |
| iOS Safari 11.3      | ❌ |
