var newRL = "https://www.bing.com";
var badURL = "edge://newtab/"
var newtabsSet = new Set();

chrome.tabs.onCreated.addListener(async (tab) => {
  console.log('0 tabId: ', tab.id)
  console.log('0.1 newTabUrl: ', tab.url)
  try {
    const items = await chrome.storage.sync.get()
    newRL = items.newTabUrl;
    badURL = items.badUrl;

    console.log('1 newRL: ', newRL);
  } catch (e) {
    console.log('caught error: ', e);
  }
  console.log('2 pendingURL:', tab.pendingUrl)
  for (let i = 0;i<1;i++){
    console.log('attemp #',i+1)
    console.log('logic 0: ', (tab.pendingUrl == "edge://newtab/"))
    console.log('logic 1: ', (tab.pendingUrl == "chrome://newtab/"))
    console.log('logic 2: ', (tab.pendingUrl == badURL))
    console.log('badUrl: ', badURL)
    if(tab.pendingUrl == "edge://newtab/" || 
      tab.pendingUrl == "chrome://newtab/" ||
      tab.pendingUrl == badURL){  
      console.log('3');  
      chrome.tabs.update(tab.id, {url: newRL});
      console.log('4 pendingURL:', tab.pendingUrl);
      console.log('5 url:', tab.url);
      newtabsSet.add(tab.id)
      console.log('6 newtabsSet: ', newtabsSet)
    }
    else{
      break;
    }
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('check if good tabid: ', (newtabsSet.has(tabId)))
  if(newtabsSet.has(tabId)){
    console.log('onUpdate tabId: ', tabId);
    console.log('onUpdate changeInfo: ', changeInfo);
    console.log('onUpdate tab.url: ', tab.url);
    console.log('onUpdate tab.pendingUrl: ', tab.pendingUrl);
    console.log('onUpdate status check: ', ('status' in changeInfo));
    if('status' in changeInfo){
      console.log('onUpdate complete check: ', (changeInfo.status == 'complete'));
      if(changeInfo.status == 'complete'){
        if(tab.url == badURL){
          chrome.tabs.update(tab.id, {url: newRL});
          console.log('caught a failed attempt')
          newtabsSet.delete(tabId)
        }
      }
    }
  }
})
