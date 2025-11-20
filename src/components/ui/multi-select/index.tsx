import { Fragment, useMemo } from "react";
import { Listbox, Transition, Popover } from "@headlessui/react";
import { Check, ChevronDown, X } from "lucide-react";
import clsx from "clsx";
import type { IMultiSelectProps } from "./multi-select.types";

function MultiSelect(props: IMultiSelectProps) {
  const { size, children, className, value = [], onChange, disabled } = props;

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

  const selectedValues = Array.isArray(value) ? value : [];
  const selectedOptions = options.filter((opt) => selectedValues.includes(opt.value));
  
  // Limit displayed options to 1, show "+X more" for the rest
  // This prevents the input from expanding vertically
  const MAX_DISPLAYED = 1;
  const displayedOptions = selectedOptions.slice(0, MAX_DISPLAYED);
  const remainingCount = selectedOptions.length - MAX_DISPLAYED;

  const handleChange = (newValues: string[]) => {
    if (!onChange) return;

    onChange({
      target: { value: newValues },
    } as React.ChangeEvent<HTMLSelectElement> & { target: { value: string[] } });
  };

  const removeValue = (valueToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onChange) return;

    const newValues = selectedValues.filter((v) => v !== valueToRemove);
    onChange({
      target: { value: newValues },
    } as React.ChangeEvent<HTMLSelectElement> & { target: { value: string[] } });
  };

  const sizeClasses =
    size === "sm"
      ? "text-xs py-1.5 pl-3 pr-8 min-h-8"
      : size === "lg"
      ? "text-lg py-1.5 pl-4 pr-8 min-h-12"
      : "py-2.5 px-3 pr-8 min-h-10";

  return (
    <Listbox
      value={selectedValues}
      onChange={handleChange}
      multiple
      disabled={disabled}
    >
      {({ open, disabled: isDisabled }) => (
        <div className="relative w-full">
          <Listbox.Button
            className={clsx([
              "relative w-full cursor-pointer rounded-md",
              "bg-slate-50 border border-slate-300 shadow-sm",
              "hover:bg-white hover:border-slate-400",
              "focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-60",
              "transition duration-200 ease-in-out",
              "text-left text-sm",
              isDisabled && "bg-slate-100 cursor-not-allowed opacity-60",
              sizeClasses,
              className,
            ])}
          >
            <div className="flex items-center gap-1.5 min-h-[1.5rem] overflow-hidden pr-8">
              {selectedOptions.length === 0 ? (
                <span className="text-slate-400 text-sm">Select options...</span>
              ) : (
                <>
                  {displayedOptions.map((option) => (
                    <span
                      key={option.value}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium flex-shrink-0"
                    >
                      <span className="truncate max-w-[80px]">{option.label}</span>
                      {!isDisabled && (
                        <button
                          type="button"
                          onClick={(e) => removeValue(option.value, e)}
                          className="hover:bg-primary/20 rounded-full p-0.5 transition-colors flex-shrink-0"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </span>
                  ))}
                  {remainingCount > 0 && (
                    <Popover className="relative flex-shrink-0">
                      {() => (
                        <>
                          <Popover.Button
                            className={clsx(
                              "inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium",
                              "hover:bg-primary/20 transition-colors",
                              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                            }}
                          >
                            <span>+{remainingCount} more</span>
                          </Popover.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute z-[60] mt-2 left-0 w-64 max-w-sm transform">
                              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white p-3">
                                <div className="flex flex-col gap-2">
                                  <div className="text-xs font-semibold text-slate-700 mb-1">
                                    Selected ({selectedOptions.length}):
                                  </div>
                                  <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
                                    {selectedOptions.map((option) => (
                                      <span
                                        key={option.value}
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                                      >
                                        <span className="truncate max-w-[200px]">
                                          {option.label}
                                        </span>
                                        {!isDisabled && (
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              removeValue(option.value, e);
                                            }}
                                            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        )}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  )}
                </>
              )}
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown
                className={clsx(
                  "h-5 w-5 text-slate-400 transition-transform duration-200",
                  open && "transform rotate-180"
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
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <Listbox.Option
                    key={option.value}
                    className={({ active: isActive }) =>
                      clsx(
                        "relative cursor-pointer select-none py-2 pl-10 pr-4",
                        isActive ? "bg-primary/10 text-primary" : "text-slate-900"
                      )
                    }
                    value={option.value}
                  >
                    {() => (
                      <>
                        <span
                          className={clsx(
                            "block truncate",
                            isSelected ? "font-medium" : "font-normal"
                          )}
                        >
                          {option.label}
                        </span>
                        {isSelected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}

export default MultiSelect;

