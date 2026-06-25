export function SkeletonLine({ className = '' }) {
  return <div className={`shimmer ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-5">
        <SkeletonLine className="w-11 h-11 rounded-xl" />
        <SkeletonLine className="w-14 h-6 rounded-full" />
      </div>
      <SkeletonLine className="h-7 w-24 mb-2 rounded-lg" />
      <SkeletonLine className="h-4 w-32 rounded-lg" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="p-4 space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonLine key={i} className={`h-12 rounded-xl ${i % 2 === 0 ? 'w-full' : 'w-11/12'}`} />
      ))}
    </div>
  );
}

export default function Skeleton({ type = 'card', rows }) {
  if (type === 'table') return <SkeletonTable rows={rows} />;
  return <SkeletonCard />;
}
