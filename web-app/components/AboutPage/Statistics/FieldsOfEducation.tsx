import { FieldsOfEducationStatistics } from "./Statistics";

const STUDY_COLORS: string[] = [
  "var(--color-selfiesat-blue)",
  "var(--color-framsat-blue)",
  "var(--color-selfiesat-light-blue)",
  "var(--color-selfiesat-dark-blue)",
  "var(--color-selfiesat-green)",
  "var(--color-selfiesat-yellow)",
  "var(--color-framsat-red)",
  "var(--color-framsat-pink)",
];

// Helper to build conic-gradient string for pie chart using CSS variables
const buildPieGradient = (entries: { label: string; count: number }[]) => {
  const total = entries.reduce((sum, e) => sum + e.count, 0);
  let current = 0;
  const stops: string[] = [];
  entries.forEach((entry, idx) => {
    const colorVar = STUDY_COLORS[idx % STUDY_COLORS.length];
    const start = (current / total) * 360;
    current += entry.count;
    const end = (current / total) * 360;
    stops.push(`${colorVar} ${start}deg ${end}deg`);
  });
  return `conic-gradient(${stops.join(", ")})`;
};

const HollowPieChart = ({
  entries,
}: {
  entries: { label: string; count: number }[];
}) => (
  <div className="relative h-80 w-80">
    {/* Pie chart */}
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: buildPieGradient(entries),
      }}
    />
    {/* Hollow center */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-64 w-64 rounded-full bg-charcoal" />
    </div>
  </div>
);

const Legend = ({
  entries,
}: {
  entries: { label: string; count: number }[];
}) => (
  <div className="flex flex-wrap gap-4 md:flex-col justify-center md:gap-2">
    {entries.map((entry, idx) => (
      <div key={entry.label} className="flex items-center gap-2">
        <span
          className="inline-block h-4 w-4 rounded"
          style={{ backgroundColor: STUDY_COLORS[idx % STUDY_COLORS.length] }}
        />
        <small className="text-charcoal-light">{entry.label}</small>
      </div>
    ))}
  </div>
);

interface FieldsOfEducationProps {
  data: FieldsOfEducationStatistics | null;
}

const FieldsOfEducation = ({ data }: FieldsOfEducationProps) => {
  if (!data) return <div>No data available.</div>;

  const facultyEntries = Object.entries(data.facultyCounts)
    .filter(([_, count]) => count > 0)
    .map(([label, count]) => ({ label, count }));
  const campusEntries = data.campusCounts.map((c) => ({
    label: c.campus,
    count: c.count,
  }));

  // Calculate majority field and percentage
  const totalFaculty = facultyEntries.reduce((sum, e) => sum + e.count, 0);
  const majorityFaculty =
    facultyEntries.length > 0
      ? facultyEntries.reduce(
          (max, e) => (e.count > (max?.count ?? -Infinity) ? e : max),
          facultyEntries[0],
        )
      : undefined;
  const majorityFacultyPercent =
    majorityFaculty && totalFaculty > 0
      ? ((majorityFaculty.count / totalFaculty) * 100).toFixed(1)
      : "0.0";

  // Calculate majority campus and percentage
  const totalCampus = campusEntries.reduce((sum, e) => sum + e.count, 0);
  const majorityCampus =
    campusEntries.length > 0
      ? campusEntries.reduce(
          (max, e) => (e.count > (max?.count ?? -Infinity) ? e : max),
          campusEntries[0],
        )
      : undefined;
  const majorityCampusPercent =
    majorityCampus && totalCampus > 0
      ? ((majorityCampus.count / totalCampus) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="mx-auto w-full">
      <div className="flex w-full flex-col items-center 2xl:flex-row gap-8 md:gap-12">
        <span className="flex-1 ">
          <h3 className="font-black mb-2 text-cloud-white">
            Our fields of education
          </h3>
          {majorityFaculty && majorityCampus ? (
            <p className="text-charcoal-light md:max-w-2/3 xl:max-w-full">
              A majority of our members study within the field of{" "}
              <strong className="text-cloud-white">
                {majorityFaculty.label}
              </strong>
              , with a solid{" "}
              <strong className="text-cloud-white">
                {majorityFacultyPercent}%
              </strong>{" "}
              representation. Furthermore, the campus with the highest
              concentration of members is{" "}
              <strong className="text-cloud-white">
                {majorityCampus.label}
              </strong>
              , accounting for{" "}
              <strong className="text-cloud-white">
                {majorityCampusPercent}%
              </strong>{" "}
              of our total membership. <br />
              <br />
            </p>
          ) : (
            <>No statistics available.</>
          )}
        </span>
        <section className="flex w-full flex-col items-center gap-8 md:gap-12 md:w-auto md:flex-row 2xl:items-center">
          <HollowPieChart entries={facultyEntries} />
          <Legend entries={facultyEntries} />
        </section>
      </div>
    </div>
  );
};

export default FieldsOfEducation;
