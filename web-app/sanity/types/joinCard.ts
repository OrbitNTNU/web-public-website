// types/joinCard.ts

export interface JoinDiscipline {
  icon: string; // Material icon name
  color: string; // Tailwind color class
  title: string;
  desc: string;
}

export interface JoinBenefit {
  icon: string; // Material icon name
  color: string; // Tailwind color class
  title: string;
  desc: string;
}

export interface JoinCardType {
  _id: string;
  _key: string;
  _type: "joinCardRef";
  data: {
    title: string;
    intro: string;
    disciplines: JoinDiscipline[];
    benefits: JoinBenefit[];
    ctaText: string;
    ctaUrl: string;
  }
}
