/*
### Execute:
```
$ node example/simple.js 
```

### Execute on debug mode:
```
$ NODE_DEBUG=nightbot node example/simple.js 
```
*/
const nightbot = require("../lib");

/**
 * program for nightmareJS:
 * @see https://github.com/segmentio/nightmare
 */
const program = [
  // Step to the target page:
  ["goto", "https://duckduckgo.com"],
  ["type", "#search_form_input_homepage", "github nightmare"],
  ["click", "#search_button_homepage"],
  ["wait", 2000],
];

// a selector of target you want to get:
const selector = "h2.result__title";

const nightmareOptions = {
  // show: true,
  // webPreferences: {
  //   images: false,
  // }
};

// Execute!
nightbot.execute({
  program,
  selector,
  nightmareOptions,
}, (err, elements) => {
  console.log("callback result ***************");
  if (err) return console.log("err:", err);
  console.log("elements[0].querySelector('b').innerHTML:", elements[0].querySelector("b").innerHTML);
});