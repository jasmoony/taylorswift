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

const albums = [
  {
    title: "Taylor Swift",
    colour: "#A5C9A5",
    src: "/debut.jpeg",
    alt: "debut",
  },
  {
    title: "Fearless",
    colour: "#EFC180",
    src: "/fearless-tv.png",
    alt: "fearless",
  },
  {
    title: "Midnights",
    colour: "#242E47",
    src: "/midnights.jpeg",
    alt: "midnights",
  },
  {
    title: "Speak Now",
    colour: "#C7A8CB",
    src: "/speaknow-tv.png",
    alt: "speak now",
  },
  {
    title: "Red",
    colour: "#7A2E39",
    src: "/red-tv.png",
    alt: "red",
  },
  {
    title: "1989",
    colour: "#B5E5F8",
    src: "/1989-tv.png",
    alt: "1989",
  },
  {
    title: "reputation",
    colour: "#746F70",
    src: "/reputation.png",
    alt: "reputation",
  },
  {
    title: "Lover",
    colour: "#F7B0CC",
    src: "/lover.jpeg",
    alt: "lover",
  },
  {
    title: "folklore",
    colour: "#CDC9C1",
    src: "/folklore.jpeg",
    alt: "folklore",
  },
  {
    title: "evermore",
    colour: "#C5AC90",
    src: "/evermore.png",
    alt: "evermore",
  },
  {
    title: "The Tortured Poets Department",
    colour: "#EDECE8",
    src: "/ttpd.jpeg",
    alt: "ttpd",
  },
  {
    title: "other",
    colour: "#EF6153",
    src: "/default.jpeg",
    alt: "default",
  },
];

export async function GET(request: Request) {
  const fontData = await fetch(
    new URL("../../../public/pistilliroman.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const requestUrl = new URL(request.url);
  const baseURL = `${requestUrl.protocol}//${requestUrl.host}`;
  const searchParams = requestUrl.searchParams;

  const location = searchParams.get("location");
  const date = searchParams.get("date");
  const surpriseSongs = searchParams.get("songs");

  if (!location || !date || !surpriseSongs) {
    return new Response("Missing required parameters", { status: 400 });
  }

  const surpriseSongsArray = surpriseSongs.split(",");

  let playedAlbumsArray = surpriseSongsArray.map((surpriseSong) => {
    return songs.find(
      (song) => song.songTitle.toLowerCase() === surpriseSong.trim().toLowerCase()
    )?.albumTitle ?? "other";
  });

  console.log(playedAlbumsArray);

  let uniqueAlbumsArray = playedAlbumsArray.filter(function (
    value,
    index,
    array
  ) {
    return array.indexOf(value) === index;
  });

  console.log(uniqueAlbumsArray);

  const uniqueAlbums = uniqueAlbumsArray.map((playedAlbum) => {
    const album = albums.find((a) => a.title === playedAlbum);
    return {
      src: baseURL + (album?.src ?? "/default.jpeg"),
      colour: album?.colour ?? "#EF6153",
    };
  });

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 40,
          color: "#1a2744",
          background: "radial-gradient(circle at 50% 40%, #EF6153, #FFBDDF)",
          width: "640px",
          height: "960px",
          padding: "40px",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "pistilliroman",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 36 }}>Taylor Swift Eras Tour</div>
          <div style={{ fontSize: 30 }}>
            {location}, {date}
          </div>
        </div>

        {/* Album covers */}
        <div
          style={{
            display: "flex",
            position: "relative",
            width: "500px",
            height: "400px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {uniqueAlbums.length === 1 ? (
            <img
              src={uniqueAlbums[0].src}
              width={300}
              height={300}
              alt="album cover"
              style={{
                borderRadius: "8px",
                transform: "rotate(-3deg)",
              }}
            />
          ) : uniqueAlbums.length === 2 ? (
            <>
              <img
                src={uniqueAlbums[0].src}
                width={250}
                height={250}
                alt="album cover"
                style={{
                  borderRadius: "8px",
                  position: "absolute",
                  left: "40px",
                  transform: "rotate(-12deg)",
                }}
              />
              <img
                src={uniqueAlbums[1].src}
                width={250}
                height={250}
                alt="album cover"
                style={{
                  borderRadius: "8px",
                  position: "absolute",
                  right: "40px",
                  transform: "rotate(12deg)",
                }}
              />
            </>
          ) : uniqueAlbums.length === 3 ? (
            <>
              <img
                src={uniqueAlbums[0].src}
                width={220}
                height={220}
                alt="album cover"
                style={{
                  borderRadius: "8px",
                  position: "absolute",
                  left: "30px",
                  top: "40px",
                  transform: "rotate(-12deg)",
                }}
              />
              <img
                src={uniqueAlbums[1].src}
                width={220}
                height={220}
                alt="album cover"
                style={{
                  borderRadius: "8px",
                  position: "absolute",
                  right: "30px",
                  top: "40px",
                  transform: "rotate(12deg)",
                }}
              />
              <img
                src={uniqueAlbums[2].src}
                width={200}
                height={200}
                alt="album cover"
                style={{
                  borderRadius: "8px",
                  position: "absolute",
                  bottom: "20px",
                  transform: "rotate(-4deg)",
                }}
              />
            </>
          ) : (
            <>
              <img
                src={uniqueAlbums[0].src}
                width={200}
                height={200}
                alt="album cover"
                style={{
                  borderRadius: "8px",
                  position: "absolute",
                  left: "60px",
                  top: "20px",
                  transform: "rotate(-15deg)",
                }}
              />
              <img
                src={uniqueAlbums[1].src}
                width={200}
                height={200}
                alt="album cover"
                style={{
                  borderRadius: "8px",
                  position: "absolute",
                  right: "60px",
                  top: "20px",
                  transform: "rotate(12deg)",
                }}
              />
              <img
                src={uniqueAlbums[2].src}
                width={190}
                height={190}
                alt="album cover"
                style={{
                  borderRadius: "8px",
                  position: "absolute",
                  left: "140px",
                  top: "80px",
                  transform: "rotate(3deg)",
                }}
              />
              {uniqueAlbums[3] && (
                <img
                  src={uniqueAlbums[3].src}
                  width={180}
                  height={180}
                  alt="album cover"
                  style={{
                    borderRadius: "8px",
                    position: "absolute",
                    left: "40px",
                    bottom: "30px",
                    transform: "rotate(-8deg)",
                  }}
                />
              )}
              {uniqueAlbums[4] && (
                <img
                  src={uniqueAlbums[4].src}
                  width={180}
                  height={180}
                  alt="album cover"
                  style={{
                    borderRadius: "8px",
                    position: "absolute",
                    right: "40px",
                    bottom: "30px",
                    transform: "rotate(10deg)",
                  }}
                />
              )}
            </>
          )}
        </div>

        {/* Song list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {surpriseSongsArray.map((surpriseSong, i) => (
            <div
              key={i}
              style={{
                fontSize: 30,
                fontWeight: "bold",
                padding: "2px",
              }}
            >
              {surpriseSong.trim()}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 640,
      height: 960,
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
