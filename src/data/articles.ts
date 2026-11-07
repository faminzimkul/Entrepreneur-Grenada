export interface Article {
  id: string;
  category: 'BUILDING A BUSINESS' | 'BUSINESS NEWS' | 'START A SIDE HUSTLE' | 'FRANCHISES';
  navGroup: 'Build Your Business' | 'Start a Side Hustle' | 'Franchises' | 'Business News';
  title: string;
  subtitle?: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  placement: 'featured' | 'latest' | 'side' | 'archive';
  imageCrop?: { viewBox: string; aspectRatio: string; caption: string; };
  pullQuote: string;
  keyTakeaways: string[];
  body: string[];
  coverImage?: string;
  status?: 'draft' | 'published';
}

// Demo content removed. Articles will be added through the admin panel.
export const ARTICLES: Article[] = [];
