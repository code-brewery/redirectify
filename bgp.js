
/**
* Singleton object that has the posiblity to redirect http trafic
*
* note: some of the headers may not be passed on, check the documentationf or webRequest
* for further info.
**/
var infectorSingletonInstance = (function() {

  var _formData = '';

  /**
  * Private method that contains the logic for http listening
  *
  * @param {Object} details  contains information about the current request
  * @private
  **/
  function _webRequestListner(details) {
        console.log("internal invocation");
        // default url value to return should be the origin url
        var urlToReturn = details.url;

        // check if we need to change the url some how
        if(details.url.indexOf(_formData.urlsToTriggerOn) > -1) {

            // create a new string where we replace part of url
             urlToReturn = details.url.replace(_formData.urlReplacePattern, _formData.urlReplaceContent);

        }
        return {

            redirectUrl: urlToReturn

        };
  }
  // public methods
  return {
    /**
    * Start to listen on the http trafic
    *
    * it will unregister any existing listener
    **/
    infectHttpTrafic: function (formData) {
      // copy formData to private formData so we can access it in the webRequestListner
      _formData = formData;

      // make sure that we remove the old listner if possible
      if(_webRequestListner) {
        stopInfectingTrafic();
      }

      // add the listner with a named method, so that we can remove it later
      chrome.webRequest.onBeforeRequest.addListener(_webRequestListner, {
          urls: ["http://*/*"]
      }, ["blocking"]); // Block intercepted requests until this handler has finished

    },

    /**
    * Remove the http request listner
    **/
    stopInfectingTrafic: function () {
        // unregister the listner , private method as key
        chrome.webRequest.onBeforeRequest.removeListener(_webRequestListner);
    }
  };
})();
