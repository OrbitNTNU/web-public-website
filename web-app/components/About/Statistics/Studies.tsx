import { useEffect, useState, useRef, useMemo } from "react";

interface StudyData {
  study: string;
  count: number;
}

const STUDY_COLORS: string[] = [
  "bg-selfiesat-blue",
  "bg-framsat-blue",
  "bg-selfiesat-light-blue",
  "bg-selfiesat-dark-blue",
  "bg-selfiesat-green",
  "bg-selfiesat-yellow",
  "bg-framsat-red",
  "bg-framsat-pink",
];

const PIXELS_PER_PERSON = 20;

const Studies = ({ data }: { data: Record<string, number> | null }) => {
  const [studies, setStudies] = useState<StudyData[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(false);

  // For drag scrolling
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    if (data) {
      setStudies(
        Object.entries(data)
          .map(([study, count]) => ({ study, count }))
          .filter(({ count }) => count > 0)
      );
    }
  }, [data]);

  // Detect when scrollable content overflows
  useEffect(() => {
    const checkScroll = () => {
      const el = scrollRef.current;
      if (el) {
        setShowArrow(el.scrollWidth > el.clientWidth && el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
      }
    };
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [studies]);

  // Summary data
  const filteredStudies = studies.filter((s) => s.study !== "Unknown");
  const mostCommon = filteredStudies.reduce(
    (acc, curr) => (curr.count > acc.count ? curr : acc),
    { study: "", count: 0 }
  );

  const summary = useMemo(() => {
    const totalStudies = filteredStudies.reduce((acc, curr) => acc + curr.count, 0);
    return {
      totalStudies,
      differentStudiesCount: filteredStudies.length,
      mostCommonStudy: mostCommon.study,
      mostCommonCount: mostCommon.count,
    };
  }, [filteredStudies, mostCommon]);

  const handleClick = (studyCode: string) => {
    window.open(`https://www.ntnu.no/studier/${studyCode}`, "_blank");
  };

  // --- DRAG SCROLL LOGIC ---
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.classList.add("cursor-grabbing");
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    scrollRef.current?.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    scrollRef.current?.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!isDragging.current || !el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.2; // scroll speed
    el.scrollLeft = scrollLeft.current - walk;
  };
  // --------------------------

  return (
    <div className="relative mx-auto flex w-full flex-col md:items-end">
      <h3 className="font-black mb-2">Our Fields of Study</h3>

      <p className="mb-8 max-w-3xl text-charcoal-light md:ml-auto md:text-right md:max-w-2/3">
        There are currently <strong className="text-cloud-white">{summary.totalStudies}</strong> registered with a field of study,
        spanning <strong className="text-cloud-white">{summary.differentStudiesCount}</strong> different studies.
        The most common field of study is{" "}
        <strong className="text-cloud-white">{summary.mostCommonStudy}</strong> with{" "}
        <strong className="text-cloud-white">{summary.mostCommonCount}</strong> members.
      </p>

      {/* Bar chart with scroll and drag */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex w-full flex-row items-end gap-4 overflow-x-auto pb-4 cursor-grab select-none"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
      >
        {studies.map((s, idx) => {
          const barHeight = Math.max(s.count * PIXELS_PER_PERSON, 2);
          return (
            <div
              key={s.study}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleClick(s.study.toLowerCase())}
            >
              <div
                className={`transition-all duration-200 ${STUDY_COLORS[idx % STUDY_COLORS.length]} rounded-lg`}
                style={{
                  height: `${barHeight}px`,
                  width: "40px",
                  minHeight: "2px",
                }}
                title={`${s.study}: ${s.count}`}
              />
              <span className="mt-2 truncate text-center text-xs">{s.study}</span>
              <span className="flex items-center gap-1 text-charcoal-light text-xs">
                <span className="material-icons" aria-label="person" style={{ fontSize: "1rem"}}>
                  person
                </span>
                {s.count}
              </span>
            </div>
          );
        })}

        {/* Scroll arrow */}
        {showArrow && (
          <div className="pointer-events-none absolute -bottom-4 right-2 hidden select-none items-center justify-center gap-2 md:flex">
            <span className="text-charcoal-light">Scroll</span>
            <span
              className="material-icons text-3xl text-charcoal-light"
              style={{ zIndex: 10 }}
              aria-label="Scroll right for more"
            >
              arrow_forward
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Studies;
