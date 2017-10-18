/*
### Execute:
```
$ node example/jquery_result.js 
```

### Execute on debug mode:
```
$ NODE_DEBUG=nightbot node example/jquery_result.js 
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

// Execute!
nightbot.execute({
  program,
  selector,
  result: "jquery", // if set "jquery", returns a result as jquery object!
}, (err, jqResult) => {
  console.log("callback result ***************");
  console.log("err:", err);
  console.log("jqResult.length:", jqResult.length);
  console.log("jqResult.eq(0).html():", jqResult.eq(0).html());
});