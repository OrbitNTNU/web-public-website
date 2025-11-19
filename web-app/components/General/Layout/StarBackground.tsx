"use client";
import { useEffect, useMemo, useState } from "react";

async function getMembers() {
  try {
    const res = await fetch("/api/members");
    if (!res.ok) throw new Error("Failed to fetch members");
    const json = await res.json();
    return json.totalMembers || 0;
  } catch (err) {
    console.error(err);
    return 0;
  }
}

export default function StarBackground() {
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    (async () => {
      const total = await getMembers();
      setMemberCount(total);
    })();
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: memberCount }).map((_, i) => {
      const size = Math.random() * 4 + 1;
      const topPercent = Math.random() * 100;
      const opacity = Math.max(1 - topPercent / 100, 0.6);

      return {
        id: i,
        size,
        top: `${topPercent}%`,
        left: `${Math.random() * 100}%`,
        opacity: opacity,
      };
    });
  }, [memberCount]);

  if (memberCount === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none max-w-screen h-full overflow-hidden">
      {stars.map(
        (star) =>
          star && (
            <div
              key={star.id}
              className="bg-cloud-white rounded-full absolute"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: star.top,
                left: star.left,
                opacity: star.opacity,
              }}
            />
          ),
      )}
    </div>
  );
}
