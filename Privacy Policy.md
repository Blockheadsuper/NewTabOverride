# What user data does this extension use?
* It uses the URLs of tabs.
* It uses the user submitted URLs in the options sections.

# Why does this extension need this information and how is it used?
* The URLs of the tabs are used to check if a new tab was created. New tabs have a special URL (e.g. chrome://newtab/). So the extension looks for these special URLs and acts only if the tab URL is the same.

There are two different user input URL fields. 
* The first asks for the desired new tab URL. This information is used to replace the default new tab URL with a user specified one.
* The second asks for a URL to be overriden. This field is necessary because on some browsers, the extension does not catch the default new tab address (e.g. chrome://newtab/) before it is replaced by another URL. In some cases this is a company portal landing page. The extension uses the second piece of user input to check for instances where the default new tab address was not caught and still change the andress to the User's desired address.

# How is this data stored and transmitted?
None of this data is transmitted. The user input data is stored using the chrome.storage.sync functionality of the chrome API solely for convienience to the user. By storing the user inputs, the user will not have to reenter the same information every time the browser is restarted.

# Please note this warning from chrome about their storage API!
Local and sync storage areas should not store confidential user data because they are not encrypted. When working with sensitive data, consider using the session storage area to hold values in memory until the browser is shut down.

Please do not save confidential information in the extension option fields. That is not what they're for.
