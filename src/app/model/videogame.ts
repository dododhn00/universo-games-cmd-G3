export interface Videogame {

  _id: string,
  title: string,
  category: string,
  releaseDate: string,
  genre: string,
  softwareHouse: string,
  publisher: string,
  numberOfPlayers: number,
  languages: {
    voice: string[],
    text: string[],
  }
  coverImage: string,
};


