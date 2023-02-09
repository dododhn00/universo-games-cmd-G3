export interface Review{
  _id: string,
  title: string,
  publicationDate: string,
  content: string,
  score: number,
  reviewerName: string
  imageUrls: string[],
  reviewedGame: {
    id: string,
    name: string,
  },

}
