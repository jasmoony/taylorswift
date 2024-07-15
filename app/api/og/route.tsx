import { ImageResponse } from "next/og";
import { songs } from "@/app/songs";
import { tours } from "@/app/tourdates";

export const runtime = "edge";

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
    title: "Fearless",
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
    title: "Speak Now",
    colour: "#c7a8cb",
    src: "/speaknow.jpeg",
    alt: "speak now",
  },
  {
    title: "Red",
    colour: "#7a2e39",
    src: "/red.jpeg",
    alt: "red",
  },
  {
    title: "1989",
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
  const fontData = await fetch(
    new URL("../../../public/pistilliroman.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const { searchParams } = new URL(request.url);

  const location = searchParams.get("location") as string;
  const date = searchParams.get("date") as string;
  const surpriseSongs = searchParams.get("songs");
  console.log({ surpriseSongs });

  const surpriseSongsArray = surpriseSongs?.split(",");
  console.log(surpriseSongsArray);

  let playedAlbumsArray = surpriseSongsArray?.map((surpriseSong) => {
    return songs.find(
      (song) => song.songTitle.toLowerCase() == surpriseSong.toLowerCase()
    )?.albumTitle;
  });

  console.log(playedAlbumsArray);

  let imageSourcesArray = playedAlbumsArray?.map((playedAlbum) => {
    return baseURL + albums.find((album) => album.title == playedAlbum)?.src;
  });

  console.log(imageSourcesArray);

  return new ImageResponse(
    (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 20,
            color: "black",
            background: "radial-gradient(circle, #EF6153, #FFBDDF)",
            width: "100%",
            height: "100%",
            padding: "50px 200px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "pistilliroman",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
              <div>{date}</div>
              <div>{location}</div>
              <div>{surpriseSongs}</div>
            </div>
          </div>
          {imageSourcesArray ? (
            <img
              src={imageSourcesArray[0]}
              width={100}
              height={100}
              alt="album cover"
            />
          ) : (
            <img
              src={"http://localhost:3000/default"}
              width={250}
              height={250}
              alt="taylor swift eras tour"
            />
          )}
        </div>
      </>
    ),
    {
      width: 320,
      height: 480,
      fonts: [
        {
          name: "pistilliroman",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
