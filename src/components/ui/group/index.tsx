import clsx from "clsx";
import type { IGroupProps, IGroupTextProps } from "./group.types";

function Group(props: IGroupProps) {
  return (
    <div {...props} className={clsx(["group-wrapper flex", props.className])}>
      {props.children}
    </div>
  );
}

function GroupText(props: IGroupTextProps) {
  return (
    <div
      {...props}
      className={clsx([
        "py-2 px-3 bg-slate-100 border shadow-sm border-slate-300/60 text-slate-600",
        "[.group-wrapper_&]:rounded-none [.group-wrapper_&]:[&:not(:first-child)]:border-l-transparent [.group-wrapper_&]:first:rounded-l [.group-wrapper_&]:last:rounded-r",
        props.className,
      ])}
    >
      {props.children}
    </div>
  );
}

Group.Text = GroupText;

export default Group;
