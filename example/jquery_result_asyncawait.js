/*
### Execute:
```
$ node example/jquery_result_asyncawait.js 
```

### Execute on debug mode:
```
$ NODE_DEBUG=nightbot node example/jquery_result_asyncawait.js 
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

async function run() {
  console.log("async/await executing ...");
  // Execute!
  const jqResult = await nightbot.execute({
    program,
    selector,
    result: "jquery",
  });
  console.log("async/await result ***************");
  console.log("jqResult.length:", jqResult.length);
  console.log("jqResult.eq(0).html():", jqResult.eq(0).html());
}

run().catch((err) => {
  console.log("result error:", err);
});