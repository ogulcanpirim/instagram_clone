export interface IFeedContent {
  images: string[];
  video?: string;
}

export interface IFeed {
  id: string;
  name: string;
  content: IFeedContent;
}

export interface IFeedResponse {
  data: IFeed[];
  success: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}
