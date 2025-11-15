import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareEnvelope, FaSquarePhone } from "react-icons/fa6";

interface MemberCardProps {
  image?: string;
  phoneNumber?: string;
  position?: string;
  memberID?: number;
  memberName?: string;
  isClickable?: boolean;
  linkedin?: string;
  skeleton?: boolean;
  mentor?: boolean;
  skeletonType?: "default" | "small";
  mail?: string;
}

const SkeletonLoader = ({
  skeletonType,
}: {
  skeletonType?: "default" | "small";
}) => (
  <span className="flex w-full animate-pulse flex-col items-stretch">
    <div className="flex w-full flex-col items-stretch">
      <div className="relative aspect-[2/3] w-full">
        <div className="block h-full w-full rounded bg-gray-200" />
      </div>
      {skeletonType === "default" && (
        <span
          className="items-left mt-2 flex w-full flex-col text-left"
          style={{ maxWidth: "100%" }}
        >
          <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
          <div className="mb-1 h-4 w-1/2 rounded bg-gray-200" />
          <div className="h-4 w-1/3 rounded bg-gray-200" />
        </span>
      )}
    </div>
  </span>
);

const MemberCard = ({
  image,
  phoneNumber,
  position,
  memberName,
  skeleton = false,
  skeletonType = "default",
  mentor = false,
  linkedin,
  mail,
}: MemberCardProps) => {
  if (skeleton) {
    return <SkeletonLoader skeletonType={skeletonType} />;
  }

  return (
    <span className="flex flex-col items-stretch" style={{ width: "100%" }}>
      <div className="flex w-full flex-col items-stretch">
        <div className="relative aspect-[2/3] w-full">
          <span className="group block h-full w-full relative">
            {image ? (
              <Image
                src={image}
                alt={memberName ?? "Member Image"}
                fill
                style={{
                  objectFit: "cover",
                  width: "100%",
                  filter: "brightness(0.8)",
                }}
                sizes="(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 200px"
                className="border-2 border-charcoal-light transition duration-300"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center border-2 border-charcoal-light bg-charcoal">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 48 48"
                  aria-label="Smiling Face"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition duration-300"
                  style={{ width: "60px", height: "60px" }}
                >
                  <circle
                    cx="17"
                    cy="20"
                    r="2.5"
                    fill="var(--color-cloud-white)"
                    className="transition duration-300"
                  />
                  <circle
                    cx="31"
                    cy="20"
                    r="2.5"
                    fill="var(--color-cloud-white)"
                    className="transition duration-300"
                  />
                  <path
                    d="M17 29c2 3 12 3 14 0"
                    stroke="var(--color-cloud-white)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    className="transition duration-300"
                  />
                </svg>
              </div>
            )}
            {mentor && (
              <div
                className={`absolute right-0 top-0 z-30 bg-pinkBlast px-4 py-1 text-moonlight transition duration-300 ${
                  !image ? "border-r-2 border-t-2 border-charcoal-light" : ""
                }`}
              >
                Mentor
              </div>
            )}
          </span>
        </div>
        {(memberName ?? phoneNumber ?? position ?? linkedin) && (
          <span
            className="items-left mt-2 flex w-full flex-col text-left"
            style={{ maxWidth: "100%" }}
          >
            {memberName && <p className="truncate">{memberName}</p>}
            {position && (
              <small className="truncate text-charcoal-light">{position}</small>
            )}
            <section className="flex flex-row items-center gap-2 text-charcoal-light text-sm mt-2">
              {mail && (
                <a
                  href={`mailto:${mail}`}
                  className="flex items-center gap-1 hover:text-berry-blast transition-colors"
                  aria-label="Send email"
                >
                  <FaSquareEnvelope className="text-xl" />
                </a>
              )}
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center gap-1 hover:text-berry-blast transition-colors"
                  aria-label="Call phone number"
                >
                  <FaSquarePhone className="text-xl" />
                </a>
              )}
              {linkedin && (
                <a
                  href={
                    linkedin.startsWith("http")
                      ? linkedin
                      : `https://${linkedin}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-berry-blast transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <FaLinkedin className="text-xl" />
                </a>
              )}
            </section>
          </span>
        )}
      </div>
    </span>
  );
};

export default MemberCard;
