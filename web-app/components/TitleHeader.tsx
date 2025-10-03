import type { ReactNode } from "react";

interface TitleHeaderProps {
  title?: ReactNode;
  titleText?: string;
  description?: string;
  poppinsTitleFont?: boolean;
}

const TitleHeader = ({ title, titleText, description }: TitleHeaderProps) => {
  return (
    <div className="flex flex-row">
      <section className="w-full">
        <div className="my-2">
          {title ? (
            title
          ) : (
            <span className="text-2xl md:w-2/3 md:text-5xl lg:w-1/2">
              {titleText}
            </span>
          )}
        </div>
        {description && (
          <p className="flex w-full flex-col justify-center whitespace-pre-line text-left text-muted md:w-2/3 md:px-8 lg:w-1/2 ">
            {description}
          </p>
        )}
      </section>
    </div>
  );
};

export default TitleHeader;
