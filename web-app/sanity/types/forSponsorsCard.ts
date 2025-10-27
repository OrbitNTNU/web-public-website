// types/forSponsorsCard.ts

export interface SponsorCTA {
  text: string;
  url: string;
  color: string; 
  textColor: string; 
  hoverColor: string;
}

export interface ForSponsorsCardType {
  _id: string;
  _key: string;
  _type: "forSponsorsCardRef";
  data: {
      title: string;
      intro: string;
      ctaButtons: SponsorCTA[];
  }
}
