"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/contacts", label: "Contactos", icon: "👥" },
  { href: "/campaigns", label: "Campañas", icon: "📧" },
];

export function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-gray-900 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-500 rounded-md flex items-center justify-center text-white text-xs font-bold">
            M
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-tight">MailCRM</p>
            <p className="text-gray-400 text-xs leading-tight">Control24</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map((item) => {
          const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-gray-700">
        <p className="text-xs text-gray-500">n8n integration</p>
        <p className="text-xs text-gray-600 mt-0.5 font-mono">/api/n8n/contacts</p>
        <p className="text-xs text-gray-600 font-mono">/api/n8n/mark-sent</p>
      </div>
    </aside>
  );
}
