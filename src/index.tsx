import { useMemo, useRef } from "react";

// hook to forward a ref to multiple refs
export function useRefWithForwarding<Value>(
    initialValue: Value,
    refs: (
        | ((value: Value) => void)
        | {
              readonly current: Value;
          }
        | {
              current: Value;
          }
    )[]
): {
    (node: Value): void;
    current: Value;
} {
    // inner reference needed to initialize the current value on the setter function
    const innerRef = useRef<Value>(initialValue);

    // generate the setter function
    return useMemo(
        () => {
            // the actual forwarding setter function
            function setRef(node: Value) {
                // update inner reference and value on the setter function
                setRef.current = innerRef.current = node;

                // forward the value to all other refs
                for (const ref of refs) {
                    if (typeof ref === "function") {
                        ref(node);
                    } else if (ref) {
                        (
                            ref as {
                                current: Value;
                            }
                        ).current = node;
                    }
                }
            }

            // initialize the current value on the setter function
            setRef.current = innerRef.current;

            // return the setter function
            return setRef;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        refs
    );
}
