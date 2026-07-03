import { type ButtonHTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";

// ── Button ──────────────────────────────────────────────────────
interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
}
const btnVariant = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
  secondary: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300",
  ghost: "hover:bg-gray-100 text-gray-600",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};
const btnSize = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm" };

export function Button({ variant = "primary", size = "md", className = "", ...props }: BtnProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-1.5 font-medium rounded-lg transition-colors disabled:opacity-50 ${btnVariant[variant]} ${btnSize[size]} ${className}`}
    />
  );
}

// ── Badge ──────────────────────────────────────────────────────
const badgeColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  unsubscribed: "bg-yellow-100 text-yellow-800",
  bounced: "bg-red-100 text-red-800",
  draft: "bg-gray-100 text-gray-700",
  scheduled: "bg-blue-100 text-blue-800",
  sending: "bg-indigo-100 text-indigo-800",
  sent: "bg-green-100 text-green-800",
  open: "bg-indigo-100 text-indigo-800",
  click: "bg-orange-100 text-orange-800",
  whatsapp: "bg-green-100 text-green-800",
  instagram: "bg-pink-100 text-pink-800",
  link: "bg-blue-100 text-blue-800",
  image: "bg-gray-100 text-gray-700",
};

export function Badge({ value }: { value: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${badgeColors[value] ?? "bg-gray-100 text-gray-700"}`}>
      {value}
    </span>
  );
}

// ── Card ──────────────────────────────────────────────────────
export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>{children}</div>;
}

// ── Input ──────────────────────────────────────────────────────
interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export function Input({ label, error, className = "", ...props }: FieldProps) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <input
        {...props}
        className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${className}`}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export function Textarea({ label, error, className = "", ...props }: TextareaProps) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <textarea
        rows={4}
        {...props}
        className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${className}`}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}
export function Select({ label, options, error, ...props }: SelectProps) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <select
        {...props}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ── StatCard ──────────────────────────────────────────────────
export function StatCard({ label, value, sub, color = "indigo" }: { label: string; value: string | number; sub?: string; color?: string }) {
  const colors: Record<string, string> = {
    indigo: "text-indigo-600",
    green: "text-green-600",
    orange: "text-orange-600",
    blue: "text-blue-600",
  };
  return (
    <Card className="p-5">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${colors[color] ?? "text-gray-900"}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </Card>
  );
}

// ── Empty state ───────────────────────────────────────────────
export function Empty({ message }: { message: string }) {
  return (
    <div className="text-center py-16 text-gray-400">
      <p className="text-base font-medium">{message}</p>
    </div>
  );
}
