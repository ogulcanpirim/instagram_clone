import { IFeed } from '../models/feed';

export const DASHBOARD_PAGE_SIZE = 20;
export const DASHBOARD_MOCK_DATA: IFeed[] = Array.from(
  { length: DASHBOARD_PAGE_SIZE },
  (_, index) => {
    return {
      id: index.toString(),
      name: `Feed ${index + 1}`,
      content: {
        images: [],
        video: undefined,
      },
    };
  },
);
