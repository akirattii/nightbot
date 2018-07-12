/*
### Execute:
```
$ node example/simple_asyncawait.js 
```

### Execute on debug mode:
```
$ NODE_DEBUG=nightbot node example/simple_asyncawait.js 
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
  const elements = await nightbot.execute({
    program,
    selector,
  });
  console.log("async/await result ***************");
  console.log("elements[0].querySelector('b').innerHTML:", elements[0].querySelector("b").innerHTML);
}

run().catch((err) => {
  console.log("result error:", err);
});