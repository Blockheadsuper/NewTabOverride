// Saves options to chrome.storage
function save_options() {
    var replacementUrl = document.getElementById('url').value;
    var overridenUrl = document.getElementById('badUrl').value;
    chrome.storage.sync.set({
      newTabUrl: replacementUrl,
      badUrl: overridenUrl
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
      newTabUrl: "https://www.bing.com",
      badUrl: "https://tocgcc.sharepoint.us/sites/Company-Portal"
    }, function(items) {
      document.getElementById('url').value = items.newTabUrl;
      document.getElementById('badUrl').value = items.badUrl;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);