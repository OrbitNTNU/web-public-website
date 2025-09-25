import Image from "next/image";

interface MemberCardProps {
  image?: string;
  phoneNumber?: string;
  activeStatus?: boolean;
  bio?: string;
  additionalInformation?: string;
  memberID?: number;
  memberName?: string;
  isClickable?: boolean;
  skeleton?: boolean;
  mentor?: boolean;
  skeletonType?: "default" | "small";
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
  bio,
  additionalInformation,
  memberName,
  skeleton = false,
  skeletonType = "default",
  mentor = false,
}: MemberCardProps) => {

  if (skeleton) {
    return <SkeletonLoader skeletonType={skeletonType} />;
  }

  return (
    <span
      className="flex flex-col items-stretch"
      style={{ width: "100%" }}
    >
      <div className="flex w-full flex-col items-stretch">
        <div className="relative aspect-[2/3] w-full">
          <span className="group block h-full w-full">
            {image ? (
              <Image
                src={image}
                alt={memberName ?? "Member Image"}
                fill
                style={{ objectFit: "cover", width: "100%" }}
                sizes="(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 200px"
                className="border-2 border-cloudWhite transition duration-300"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center border-2 border-cloudWhite transition duration-300"
              >
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
                    fill="--color-cloud-white"
                    className="transition duration-300"
                  />
                  <circle
                    cx="31"
                    cy="20"
                    r="2.5"
                    fill="--color-cloud-white"
                    className="transition duration-300"
                  />
                  <path
                    d="M17 29c2 3 12 3 14 0"
                    stroke="--color-cloud-white"
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
                className={`absolute right-0 top-0 z-30 rounded-bl-md bg-pinkBlast px-4 py-1 text-moonlight transition duration-300 ${
                  !image ? "border-r-2 border-t-2 border-cloudWhite" : ""
                }`}
              >
                Mentor
              </div>
            )}
            {additionalInformation && (
              <div className="absolute bottom-0 left-0 z-30 w-full bg-skyMint py-1 text-center text-moonlight">
                {additionalInformation}
              </div>
            )}
          </span>
        </div>
        {(memberName ?? bio ?? phoneNumber) && (
          <span
            className="items-left mt-2 flex w-full flex-col text-left"
            style={{ maxWidth: "100%" }}
          >
            {memberName && <h5 className="truncate">{memberName}</h5>}
            {bio && <span className="truncate text-sm text-muted">{bio}</span>}
            {phoneNumber && (
              <span className="truncate text-sm text-slate">{phoneNumber}</span>
            )}
          </span>
        )}
      </div>
    </span>
  );
};

export default MemberCard;
