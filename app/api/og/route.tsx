import { ImageResponse } from "next/og";
import { songs } from "@/app/songs";

type Album = {
  title: string;
  colour: string;
  src: string;
  alt: string;
};

const baseURL = "http://localhost:3000";

let albums = [
  {
    title: "Taylor Swift",
    colour: "#a5c9a5",
    src: "/debut.jpeg",
    alt: "debut",
  },
  {
    title: "Fearless (Taylor's Version)",
    colour: "#efc180",
    src: "/fearless.jpeg",
    alt: "fearless",
  },
  {
    title: "Midnights",
    colour: "#242e47",
    src: "/midnights.jpeg",
    alt: "midnights",
  },
  {
    title: "Speak Now (Taylor's Version)",
    colour: "#c7a8cb",
    src: "/speaknow.jpeg",
    alt: "speak now",
  },
  {
    title: "Red (Taylor's Version)",
    colour: "#7a2e39",
    src: "/red.jpeg",
    alt: "red",
  },
  {
    title: "1989 (Taylor's Version)",
    colour: "#b5e5f8",
    src: "/1989.jpeg",
    alt: "1989",
  },
  {
    title: "Reputation",
    colour: "#746f70",
    src: "/reputation.jpeg",
    alt: "reputation",
  },
  {
    title: "Lover",
    colour: "#f7b0cc",
    src: "/lover.jpeg",
    alt: "lover",
  },
  {
    title: "folklore",
    colour: "#cdc9c1",
    src: "/folklore.jpeg",
    alt: "folklore",
  },
  {
    title: "evermore",
    colour: "#c5ac90",
    src: "/evermore.jpeg",
    alt: "evermore",
  },
  {
    title: "The Tortured Poets Department",
    colour: "#EDECE8",
    src: "/ttpd.jpeg",
    alt: "ttpd",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const location = searchParams.get("location") as string;
  const date = searchParams.get("date") as string;
  const songOne = searchParams.get("songone") as string;
  const songTwo = searchParams.get("songtwo") as string;

  console.log(songOne, songTwo);

  let albumOne = songs.find((song) => song.songTitle == songOne)?.albumTitle;
  console.log(albumOne);

  let albumTwo = songs.find((song) => song.songTitle == songTwo)?.albumTitle;
  console.log(albumTwo);

  let imageSourceOne = albums.find((album) => album.title == albumOne)?.src;
  let imageSourceTwo = albums.find((album) => album.title == albumTwo)?.src;

  console.log(imageSourceOne, imageSourceTwo);

  let imageOne = albumOne ? baseURL + imageSourceOne : baseURL + "/guitar.jpeg";
  let imageTwo = albumTwo ? baseURL + imageSourceTwo : baseURL + "/piano.jpeg";

  let altOne = "guitar";
  let altTwo = "piano";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 40,
          color: "black",
          background: "radial-gradient(circle, #EF6153, #FFBDDF)",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {location}
        {date}
        {songOne}
        {songTwo}
        <img src={imageOne} width={500} height={500} alt={altOne} />
        <img src={imageTwo} width={500} height={500} alt={altTwo} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
