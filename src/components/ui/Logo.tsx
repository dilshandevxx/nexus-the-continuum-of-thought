import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Outer Hexagon */}
        <path
          d="M50 5 L93.3 30 V70 L50 95 L6.7 70 V30 L50 5 Z"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinejoin="round"
          className="text-white"
        />
        
        {/* Inner Connections (N shape abstraction) */}
        <path
          d="M35 35 L35 65 L65 35 L65 65"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        />
        
        {/* Accent Dot */}
        <circle cx="50" cy="50" r="6" fill="currentColor" className="text-white" />
      </svg>
    </div>
  );
}
