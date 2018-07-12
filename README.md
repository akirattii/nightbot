## Nightbot

A simple web scraping library using [Nightmare](https://github.com/segmentio/nightmare) which is one of the greatest headless browsing module.

## Install

```
npm install --save nightbot
```

## Usage

```javascript
const nightbot = require("nightbot");
```

## Examples

Get result as `jsdom`:
```javascript
const nightbot = require("nightbot");

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
}, (err, elements) => {
  // you got the target as jsdom elements:
  console.log("elements[0].querySelector('b').innerHTML:", elements[0].querySelector("b").innerHTML);
});

```

Get result as `jquery` object:
```javascript
...

nightbot.execute({
  program,
  selector,
  result: "jquery", // If set "jquery", returns a result as jquery object!
}, (err, jqResult) => {
  // you got the target as jquery object:
  console.log("jqResult.length:", jqResult.length);
  console.log("jqResult.eq(0).html():", jqResult.eq(0).html());
});
```

async/await also available:
```javascript
...

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
```

More examples? Please check here: `example/`.



## Authors

- **Akira Tanaka** - *Founder* - [akirattii@github](https://github.com/akirattii)

## LICENSE

This project is licensed under the MIT License - see the [LICENSE.txt](./LICENSE.txt) file for details


END