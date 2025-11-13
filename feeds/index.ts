import { IFeed } from '../app/models/feed';
import { faker } from '@faker-js/faker';

const FEED_SIZE = 200;

export const getVideoSource = (() => {
  let videoIndex = 0;
  return (index: number) => {
    if (index % 10 === 2 || index % 10 === 5) {
      const videoSource = ((videoIndex % 30) + 1).toString();
      videoIndex++;
      return videoSource;
    }
    return undefined;
  };
})();

export const feeds: IFeed[] = Array.from({ length: FEED_SIZE }, (_, index) => {
  return {
    id: index.toString(),
    name: faker.word.noun({ length: { min: 3, max: 10 } }),
    content: {
      images: [
        `https://picsum.photos/1200/800?random=${index * 2 + 1}`,
        `https://picsum.photos/1200/800?random=${index * 2 + 2}`,
      ],
      video: getVideoSource(index),
    },
  };
});
