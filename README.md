# Combox

Combox is a Web worker sandbox implementation based on Comlink.

## Notice

_This is an experimental project!!_

## Demo

- https://syumai.github.io/combox/example/

## Usage

```js
<script type="module">
  import { Combox } from "https://unpkg.com/@syumai/combox/dist/index.js";
  const combox = new Combox();
  (async () => {
    const code = `(() => {
      const a = 1;
      const b = 2;
      return a + b;
    })()
    `;
    // calculated in Web worker sandbox.
    console.log(await combox.evaluate(code)); // 3
  })();
  ...
```

## License

MIT

## Author

syumai

## Related projects

- https://github.com/syumai/sandboxed-eval
- https://github.com/GoogleChromeLabs/comlink