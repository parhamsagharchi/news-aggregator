import "@/assets/css/vendors/litepicker.css";
import { createRef, useEffect, useRef } from "react";
import { setValue, init, reInit } from "./litepicker";
import { Input } from "@/components/ui";
import type { LitepickerElement, LitepickerProps } from "./litepicker.types";

function Litepicker({
  options = {},
  value = "",
  onChange = () => {},
  getRef = () => {},
  ...computedProps
}: LitepickerProps) {
  const props = {
    options: options,
    value: value,
    onChange: onChange,
    getRef: getRef,
  };
  const initialRender = useRef(true);
  const litepickerRef = createRef<LitepickerElement>();
  const tempValue = useRef(props.value);

  // Extract size from computedProps to avoid type conflict
  const { size: htmlSize, ...restProps } = computedProps;
  const inputSize =
    htmlSize && typeof htmlSize === "string" ? htmlSize : undefined;

  useEffect(() => {
    if (litepickerRef.current) {
      props.getRef(litepickerRef.current);
    }

    if (initialRender.current) {
      setValue(props);
      if (litepickerRef.current !== null) {
        init(litepickerRef.current, props);
      }
      initialRender.current = false;
    } else {
      if (tempValue.current !== props.value && litepickerRef.current !== null) {
        reInit(litepickerRef.current, props);
      }
    }

    tempValue.current = props.value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  return (
    <Input
      ref={litepickerRef}
      type="text"
      value={props.value || ""}
      onChange={(e) => {
        if (props.onChange) {
          props.onChange(e);
        }
      }}
      size={inputSize}
      {...restProps}
    />
  );
}

export default Litepicker;
