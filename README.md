# useRefWithForwarding()

![npm version](https://badgen.net/npm/v/use-ref-with-forwarding?icon=npm&label)
![GitHub checks](https://badgen.net/github/checks/teamrevin/use-ref-with-forwarding/publish?icon=github&label=GitHub)

`useRefWithForwarding()` is a simple React hook that can be used to combine multiple refs into one ref.

## Installation

Use your favourite manager to install the [package](https://www.npmjs.com/package/use-ref-with-forwarding):

```sh
yarn add use-ref-with-forwarding
```

```sh
npm install use-ref-with-forwarding --save
```

## Example

```ts
import React, { Ref, useEffect } from "react";
import { useRefWithForwarding } from "use-ref-with-forwarding";

export function Example({
    outerRef1,
    outerRef2,
}: {
    outerRef1: Ref<HTMLElement>;
    outerRef2: Ref<HTMLElement>;
}) {
    const innerRef = useRefWithForwarding<HTMLElement | null>(null, [
        outerRef1,
        outerRef2,
    ]);

    useEffect(() => {
        console.log(innerRef.current);
    });

    return <div ref={innerRef} />;
}
```

## Reference

The hook is a generic with the following generic parameter:

-   `Value`: The value type of the reference.

The hook function accepts the following function parameters:

-   `initialValue: Value`: The value used to initialize the reference.
-   `refs: (((value: Value) => void) | { readonly current: Value; } | { current: Value; } | null | undefined)[]`: A list of references to which a reference update is passed.

It returns a reference object of the following type: `{ (node: Value): void; current: Value; }`

## License

This library is licensed under the MIT license.

## Contributing

We welcome contributions to the `use-ref-with-forwarding` library. To contribute, simply open a [pull request](https://github.com/teamrevin/use-ref-with-forwarding/pulls) with your changes.
