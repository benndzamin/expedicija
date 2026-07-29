export default function TextInput({ variant = "default", className = "", ...props }) {
  const cls = variant === "yellow" ? "win-input-yellow" : "win-input";
  return <input type="text" readOnly className={`${cls} ${className}`} {...props} />;
}
