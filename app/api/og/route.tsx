import { ImageResponse } from "next/og";

let albums = [
  {
    title: "taylor swift",
    colour: "#a5c9a5",
  },
  {
    title: "fearless",
    colour: "#efc180",
  },
  {
    title: "midnights",
    colour: "#242e47",
  },
  {
    title: "speaknow",
    colour: "#c7a8cb",
  },
  {
    title: "red",
    colour: "#7a2e39",
  },
  {
    title: "1989",
    colour: "#b5e5f8",
  },
  {
    title: "reputation",
    colour: "#746f70",
  },
  {
    title: "lover",
    colour: "#f7b0cc",
  },
  {
    title: "folklore",
    colour: "#cdc9c1",
  },
  {
    title: "evermore",
    colour: "#c5ac90",
  },
  {
    title: "ttpd",
    colour: "#EDECE8",
  },
];

export async function GET(request: Request) {
  // zod validatie toevoegen
  const { searchParams } = new URL(request.url);

  const location = searchParams.get("location") as string;
  const date = searchParams.get("date") as string;
  const songOnealbumTitle = searchParams.get("songone") as string;
  const songTwoalbumTitle = searchParams.get("songtwo") as string;

  let songOne = songs.find((song) => song.albumTitle == songOnealbumTitle);
  let songTwo = songs.find((song) => song.albumTitle == songTwoalbumTitle);

  let albumOne = songOne
    ? albums.find((album) => album.title == songOne.albumTitle)
    : null;
  let albumTwo = songTwo
    ? albums.find((album) => album.title == songTwo.albumTitle)
    : null;

  console.log(albumOne);
  console.log(albumTwo);

  let colourOne = albumOne ? albumOne.colour : "#EF6153";
  let colourTwo = albumTwo ? albumTwo.colour : "#FAD0CB";

  console.log(colourOne);
  console.log(colourTwo);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: "black",
          background: `radial-gradient(circle, ${colourOne}, ${colourTwo})`,
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
        {songOnealbumTitle}
        {songTwoalbumTitle}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
