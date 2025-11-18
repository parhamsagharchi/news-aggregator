interface ErrorMessageProps {
  message: string;
}

/**
 * Reusable error message component
 * Follows DRY principle
 */
export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="col-span-12">
      <p className="text-red-500">{message}</p>
    </div>
  );
}

