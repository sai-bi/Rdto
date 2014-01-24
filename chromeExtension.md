##Basic Elements
1. manifest file
2. one or more HTML files
3. one or more JavaScript files(optional)
4. any other resource files(optional)

Manifest files

1. JSON formatted file: gives information about the extension, including name, version, description, icons, permissions, background, browser\_action, manifest\_version.

Architecture
 
1. background page: an invisible page that holds the main logic of the extension. A single long-running script to manage some task or state. If no html is required in background page, you can simply specify `"scripts" :["background.js"]` in the manifest file, otherwise, you can specify `"page":"background.html"`;

2. event pages: different from background pages, event pages are loaded only when they are needed 

3. UI pages: ordinary HTML pages that display the UI of extension, for example, popup.html.
4. content scripts: used to interact with web pages. Some JavaScript that executes in the context of a page that has been loaded into the browser. Content scripts can exchange messages with its parent extension.

##Content Scripts  
Some basic usage:

1. read details of web pages
2. change the layout of web page
3. match certain URLs
4. make cross-site XMLHttpRequests

Limitations:

1. cannot use chrome.*APIs, except for parts of `chrome.extension`
2. use variables or functions defined by their extension pages.
2. use variables or functions by web pages or by other content scripts

Manifest:

`
  "content_scripts": [
    {
      "matches": ["http://www.google.com/*"],
      "css": ["mystyles.css"],
      "js": ["jquery.js", "myscript.js"]
    }
  ]  
`

If you want to inject the code only sometimes, use the `permission` fieldto limit.

Programmatic injection:

1. insert code into a page programmatically is useful when your JS or CSS code shouldn't be injected into every single page that matches the pattern, for example, when you want a script to run when the user clicks on something. code: `chrome.tabs.executeScript()`


