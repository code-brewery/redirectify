/**
* @author Jepp3
*
**/


/**
* retrives form data from the html page
* @returns {Object}
**/
function retriveFormData() {
    var formData = {};
    formData.urlsToTriggerOn = document.getElementById('urlsToTriggerOn').value;
    formData.urlReplacePattern = document.getElementById('urlReplacePattern').value;
    formData.urlReplaceContent = document.getElementById('urlReplaceContent').value;
    return formData;
}

/**
* Will talk to the background page and tell the singletonInstance to
* infect the http trafic, based on the form data given by the user.
* @returns void
**/
function registerListners() {
    console.log("register");
    var otherWindows = chrome.extension.getBackgroundPage();
    var singletonInstance = otherWindows.infectorSingletonInstance;
    singletonInstance.infectHttpTrafic(retriveFormData());

}

/**
* Will talk to the background page and tell the singleton instance to stop
* infecting the trafic
* @returns void
**/
function unRegisterListner() {
    console.log("unregister");
    var otherWindows = chrome.extension.getBackgroundPage();
    var singletonInstance = otherWindows.infectorSingletonInstance;
    singletonInstance.stopInfectingTrafic();
}
/**
* Saves the form data to local storage . ( obs async )
*
**/
function saveTheFormData() {

  chrome.storage.sync.set(retriveFormData(), function() {

       // silently ignore this at the moment

  });

}

/**
* populate the form with data fetch from the local storage
*
**/
function populateFormWithFormData() {

  chrome.storage.sync.get(null, function(formData) {

      document.getElementById('urlsToTriggerOn').value = formData.urlsToTriggerOn || "";
      document.getElementById('urlReplacePattern').value = formData.urlReplacePattern || "";
      document.getElementById('urlReplaceContent').value = formData.urlReplaceContent || "";

  });

}
/**
* This methods sets the current state.
* if the infector is active, then "active" will be printed.
* if the infector is in-active then "in-active" will be printed.
**/
function setState() {
    // get the infector
    var otherWindows = chrome.extension.getBackgroundPage();
    var singletonInstance = otherWindows.infectorSingletonInstance;


    var stateInHumanReadableFormat = "The extension is disabled";
    // ask the infector the current state
    if(singletonInstance.isActive()) {
        stateInHumanReadableFormat = "The extension is enabled";
    }

    // set the state in the widget
    document.getElementById('stateIndicator').innerHTML = stateInHumanReadableFormat;
}

/**
* On page load
*
* Here we register events that will be triggered by the user.
* The methods here will be a "routing" to more heavier methods defined above.
*
**/
document.addEventListener('DOMContentLoaded', function() {

  populateFormWithFormData();
  setState();

  // when the user clicks on the submit button
  document.getElementById("submit-url-values").addEventListener("click", function() {

      registerListners.call(this);
      saveTheFormData.call(this);
      setState.call(this);
  }.bind(this));

  // when the user clicks on the disable button
  document.getElementById("disable").addEventListener("click", function() {

      unRegisterListner.call(this);
      setState.call(this);

  }.bind(this));


});
