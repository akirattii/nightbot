/*
### Execute:
```
$ node example/loop_single_instance.js 
```

### Execute on debug mode:
```
$ NODE_DEBUG=nightbot node example/loop_single_instance.js 
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
  show: true,
  // webPreferences: {
  //   images: false,
  // }
};

const ite = function*() {
  for (let len = 2, i = 0; i < len; i++) {
    // Execute!
    yield nightbot.execute({
      program,
      selector,
      nightmareOptions,
      newInstance: false,
      keepInstance: true, // NOTE: recycles the same instance
    }, (err, elements) => {
      console.log(`[${i}] callback result ***************`);
      if (err) return console.log("err:", err);
      console.log(`[${i}] elements[0].querySelector('b').innerHTML:`, elements[0].querySelector("b").innerHTML);
      ite.next();
    });
  }
  // finish!
  nightbot.end((err) => {
    console.log("finished!");
  });
}();
ite.next(); // fire!