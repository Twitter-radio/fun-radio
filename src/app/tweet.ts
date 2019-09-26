export class Tweet{
  author: string;
  text: string;
  isRead: boolean;
}
export const TweetsMocked: Tweet[] = [
  {
    author: "Reuters Top News",
    text: 'For Medicare, the public insurance program for elderly and disabled Americans, payouts for genetic tests jumped from $480 million in 2015 to 1 billion in 2018',
    isRead: false
  },
  {
    author: "Vanity Fair",
    text: '“While our business has never been stronger,” the now-former CEO claimed, “the scrutiny directed toward me has become a significant distraction”',
    isRead: false
  },
  {
    author: "CNN",
    text: 'Major League Soccer is reversing their ban of an anti-Nazi symbol. The decision follows fans protesting for weeks through walkouts and silent demonstrations during televised soccer games',
    isRead: false
  },
];
