
/**
* Singleton object that has the posiblity to redirect http trafic
*
* note: some of the headers may not be passed on, check the documentationf or webRequest
* for further info.
**/
var infectorSingletonInstance = (function() {

  var _formData = '';

  var _lastRequestId = -1;

  // tells us that the infector is listening or not
  var _active = false;

  /**
  * Private method that contains the logic for http listening
  *
  * @param {Object} details  contains information about the current request
  * @private
  **/
  function _webRequestListner(request) {
        console.log(request)
        if(request.requestId !== _lastRequestId && (request.url.indexOf(_formData.urlsToTriggerOn)) > -1 ){
            _lastRequestId = request.requestId;
            return {
                redirectUrl : request.url.replace(_formData.urlReplacePattern, _formData.urlReplaceContent)
            };
        }
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
        this.stopInfectingTrafic();


      // add the listner with a named method, so that we can remove it later
      chrome.webRequest.onBeforeRequest.addListener(_webRequestListner, {
          urls: ["http://*/*"]
      }, ["blocking"]); // Block intercepted requests until this handler has finished

      _active = true;
    },

    /**
    * Remove the http request listner
    **/
    stopInfectingTrafic: function () {
        // unregister the listner , private method as key
        chrome.webRequest.onBeforeRequest.removeListener(_webRequestListner);

        _active = false;
    },

    isActive:function() {
        return _active;
    }
  };
})();
