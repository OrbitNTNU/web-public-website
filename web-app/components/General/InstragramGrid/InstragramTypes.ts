
export interface InstagramProfile {
  username: string;
  biography: string;
  profilePictureUrl: string;
  website: string;
  followersCount: number;
  followsCount: number;
  posts: InstagramPost[];
}

export interface InstagramPost {
  id: string;
  timestamp: string;
  permalink: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  sizes: MediaSizes;
  caption: string;
  prunedCaption: string;
  hashtags: string[];
  mentions: string[];
  colorPalette: ColorPalette;
  children?: InstagramPostChild[];
  thumbnailUrl?: string;
}

export interface InstagramPostChild {
  id: string;
  mediaType: 'IMAGE' | 'VIDEO';
  mediaUrl: string;
  sizes: MediaSizes;
  colorPalette: ColorPalette;
  missingVideoThumbnail?: boolean;
  thumbnailUrl?: string;
}

export interface MediaSizes {
  small: MediaSize;
  medium: MediaSize;
  large: MediaSize;
  full: MediaSize;
}

export interface MediaSize {
  mediaUrl: string;
  height: number;
  width: number;
}

export interface ColorPalette {
  dominant: string;
  muted: string;
  mutedLight: string;
  mutedDark: string;
  vibrant: string;
  vibrantLight: string;
  vibrantDark: string;
}