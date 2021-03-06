# Non-render-blocking CSS link in body

CSS links (`<link rel="stylesheet" ...>`) in `<body>` should not block rendering of any markup above them.

This is a small demo page to verify/check render-blocking: https://css-link-in-body-git-master.csabapalfi.now.sh/


## But why?

Today even if you inline critical CSS you need to async load your non-critical CSS somehow.

CSS links in body could address this if all browsers stop blocking render on these.

Another way to do this is via `rel=preload` but that has some drawbacks, too (needs polyfilling in most browsers, not granular enough).

## How?

[Read this blogpost](https://jakearchibald.com/2016/link-in-body/) from Jake Archibald or see small example below:

Simply place your style link tags in body.

```html
<head>
    <!-- embedded/inlined critical styles - will not block rendering -->
    <style>/* header styles */</style>
</head>
<body>
  <header>...</header>
  <!-- link in body - will not block rendering for anything above-->
  <link rel="stylesheet" href="/main.css">
  <main>...</main>
</body>
```

e.g. in the example above `header` will render straight away then `main` will render as soon as main.css is loaded.

## The empty `<script>` tag 'polyfill'

Some browsers can be 'convinced' to follow the behaviour described above by adding an empty `<script>` tag after the style link in your body:

```html
  <link rel="stylesheet" href="/main.css"><script> </script>
  <main>...</main>
```

* this will deliberately block parsing after that link tag
* forces the browser to wait for pending stylesheets
* prevents the browser from discovering other style links below therefore no render-blocking because of style links below

## Browser support

TODO: Keep this up-to-date and maybe even automate it better

Checked some manually for now:

✅ supported - ☑️ supported with empty script 'polyfill' - ❌ not supported

|                      |    |
|----------------------|:--:|
| Chrome 69            | ✅ |
| Edge 17              | ✅ |
| Firefox 60           | ✅ |
| macOS Safari 11.1    | ☑️ |
| iOS Safari 11.3      | ❌ |

## Read more

See [this thread on twitter](https://twitter.com/patmeenan/status/1002007588878340096) and [this blogpost](https://jakearchibald.com/2016/link-in-body/) from Jake Archibald.
