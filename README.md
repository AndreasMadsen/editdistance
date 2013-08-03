#editdistance

> A much faster than the naïve Levenshtein distance algoritme.

> This is an modified version of the Berghel Roach Levenshtein algortime
> with the time complexity of `O(n + d^2)` (n longest string, d edit distance).
> This is much faster compared to the naïve approach there uses `O(n*m)` (n and m are string lengths)
CPU time.

## Installation

```sheel
npm install editdistance
```

## Documentation

```javascript
var editdistance = require('editdistance');

var compare = editdistance('book');
console.log(compare.distance('back')); // 2
console.log(compare.distance('bounce')); // 4
```

##License

This is "Derivative Works" of the [GWT](http://google-web-toolkit.googlecode.com/svn-history/r8890/trunk/dev/core/src/com/google/gwt/dev/util/editdistance/GeneralEditDistances.java)
project. But since GTW is licensed under "Apache License, version 2.0" a
none-copyleft license, I hereby relicense this "Derivative Works" under MIT.

**The software is license under "MIT"**

> Copyright (c) 2013 Andreas Madsen
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
