## Nightbot

A Simple Helper Library for [Nightmare](https://github.com/segmentio/nightmare).

## Install

```
npm install --save nightbot
```

## Usage

```
const nightbot = require("nightbot");
```

## Examples

Get result as `jsdom`:
```
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
```
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

More examples? Please check here: `example/`.