[![Build Status](https://travis-ci.org/justojsp/justo-plugin-bootlint.svg?branch=master)](https://travis-ci.org/justojsp/justo-plugin-bootlint)

Simple task for the `bootlint` command.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install justo-plugin-bootlint
```

Dependencies:

```
npm install -g bootlint
```

## Use

```
const bootlint = require("justo-plugin-bootlint");
```

To run `bootlint`, the task must be called as follows:

```
bootlint(opts, src : ...string) : number
bootlint(opts, config : object) : number
```

Configuration object:

- `src` (string[]). Files to check.
- `disable` (string or string[]). Disable the [linter IDs](https://github.com/twbs/bootlint/wiki).
- `output` (boolean). Display the `bootlint` output: `true`, yep; `false`, nope. Default: `true`.

The task returns `0` if all the lint checks have passed; otherwise, `!0`.

Examples:

```
bootlint("Check Bootstrap", {
  src: ["app/index.html", "app/about.html)"],
  disable: "W002"
});
```
