![alt tag](https://raw.github.com/code-brewery/redirectify/master/icon.png)

# Redirectify

Redirectify is a chrome plugin that redirects http trafic where you want it.

## Why?
Well, i wanted a easy way to redirect for api trafic during development. I wanted a easy way to swap from dev server to real server, without leaving chrome and with only one click.

#### for example
  I'm developing a webpage that uses an REST API to talk with the backend.

  The rest api request ulr's will always start with ```localhost:8585/rest/``` when talking to an mock server.

  But now, I as an developer want´s to test my new feature with a real backend. The solution is simple. We can tell Redirectify that all trafic currently running in chrome that contains ```localhost:8585/rest/``` can be redirected to another host/port/url.

  In this example we will redirect the requests to my live server running on ```localhost:1337/rest/```.

  The final configuration in the redirectify gui will be the following:

  ##### config
  
    Urls: to trigger on = localhost:8585/rest
    Replace the following = localhost:8585/rest
    With = localhost:1337/rest

  ## How to install
  1. Download as an zip archive here at this github page
  2. Unzip to a good location

  3. Open a new tab in chrome, type ```chrome://extensions```

  4. Check on Developer mode

  5. Click on Load unpacked extension

  6. Upload the folder containing Redirectify.
