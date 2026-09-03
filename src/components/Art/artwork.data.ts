import foliageCafe from "../../assets/images/art/foliage-cafe-framed.webp";
import foodPaintings from "../../assets/images/art/food-paintings.webp";
import landRover from "../../assets/images/art/land-rover-framed.webp";
import type { Artwork } from "./artwork.types";

export const artworks: Artwork[] = [
  {
    title: "Happy Together",
    medium: "Oil on canvas paper",
    description:
      "Two matching studies: salmon maki on a plate, and pak choi in supermarket packaging. They are just happy to be with each other.",
    image: foodPaintings,
    alt: "Two framed food paintings: salmon maki on a plate and pak choi",
    width: 1448,
    height: 1086,
  },
  {
    title: "Rovering",
    medium: "Oil on canvas",
    description:
      "A portrait of our Defender 100. The reference photo was taken on a weekend trip in South Wales. The painting evokes memories of chilly morning coffees and laughs with friends around a campfire. ",
    image: landRover,
    alt: "A framed painting of a dark green Land Rover in a Welsh mountain landscape",
    width: 1448,
    height: 1086,
  },
  {
    title: "Foliage",
    medium: "Oil on canvas",
    description:
      "A study of Foliage Cafe storefront in Clifton Village, Bristol. Foliage has been the venue of some pivotal coffees in my life.",
    image: foliageCafe,
    alt: "A framed painting of the Foliage Cafe storefront",
    width: 1448,
    height: 1086,
  },
];
