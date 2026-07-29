export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div
      role="alert"
      className={`fixed right-4 top-4 z-[100] border px-3 py-2 text-[11px] font-bold text-win-white shadow-md ${
        toast.type === "error"
          ? "border-red-900 bg-win-red"
          : "border-green-900 bg-green-700"
      }`}
    >
      {toast.message}
    </div>
  );
}
