import { Fragment, useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import clsx from "clsx";
import type { ISelectProps } from "./select.types";

function Select(props: ISelectProps) {
  const { size, children, className, value, onChange, disabled } = props;

  // Extract options from children
  const options = useMemo(() => {
    if (!children) return [];
    
    const childrenArray = Array.isArray(children) ? children : [children];
    return childrenArray
      .filter((child: any) => child && child.props)
      .map((child: any) => ({
        value: child.props.value,
        label: child.props.children || child.props.value,
      }));
  }, [children]);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange({
        target: { value: newValue },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  };


  return (
    <Listbox value={value || ""} onChange={handleChange} disabled={disabled}>
      {({ open, disabled: isDisabled }) => (
        <div className="relative w-full">
          <Listbox.Button
            className={clsx(
              "relative w-full cursor-pointer rounded-md",
              "bg-slate-50 border border-slate-300 shadow-sm",
              "hover:bg-white hover:border-slate-400",
              "focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-60",
              "transition duration-200 ease-in-out",
              "text-left text-sm",
              {
                "bg-slate-100 cursor-not-allowed opacity-60": isDisabled,
                "text-xs py-1.5 pl-3 pr-8 h-8": size === "sm",
                "text-lg py-1.5 pl-4 pr-8 h-12": size === "lg",
                "py-2.5 px-3 pr-8 h-10": size !== "sm" && size !== "lg",
              },
              className
            )}
          >
            <span className="block truncate text-slate-700">
              {selectedOption?.label || "Select..."}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown
                className={clsx(
                  "h-5 w-5 text-slate-400 transition-transform duration-200",
                  {
                    "transform rotate-180": open,
                  }
                )}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-pointer select-none py-2 pl-10 pr-4",
                      {
                        "bg-primary/10 text-primary": active,
                        "text-slate-900": !active,
                      }
                    )
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx(
                          "block truncate",
                          {
                            "font-medium": selected,
                            "font-normal": !selected,
                          }
                        )}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}

export default Select;
