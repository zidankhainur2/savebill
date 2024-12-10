export function Notification({ message, type }) {
  const typeClasses =
    type === "success"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <div className={`mt-4 p-4 rounded-md ${typeClasses}`}>
      <p>{message}</p>
    </div>
  );
}
