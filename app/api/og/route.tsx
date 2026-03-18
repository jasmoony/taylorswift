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

  // Build image layout configs — no undefined values, Satori can't handle them
  type ImageConfig = { src: string; width: number; height: number; style: Record<string, string> };
  const imageConfigs: ImageConfig[] = [];
  const n = uniqueAlbums.length;

  if (n === 1) {
    imageConfigs.push({
      src: uniqueAlbums[0].src, width: 300, height: 300,
      style: { borderRadius: "8px", transform: "rotate(-3deg)" },
    });
  } else if (n === 2) {
    imageConfigs.push({
      src: uniqueAlbums[0].src, width: 250, height: 250,
      style: { borderRadius: "8px", position: "absolute", left: "40px", transform: "rotate(-12deg)" },
    });
    imageConfigs.push({
      src: uniqueAlbums[1].src, width: 250, height: 250,
      style: { borderRadius: "8px", position: "absolute", right: "40px", transform: "rotate(12deg)" },
    });
  } else if (n === 3) {
    imageConfigs.push({
      src: uniqueAlbums[0].src, width: 220, height: 220,
      style: { borderRadius: "8px", position: "absolute", left: "30px", top: "40px", transform: "rotate(-12deg)" },
    });
    imageConfigs.push({
      src: uniqueAlbums[1].src, width: 220, height: 220,
      style: { borderRadius: "8px", position: "absolute", right: "30px", top: "40px", transform: "rotate(12deg)" },
    });
    imageConfigs.push({
      src: uniqueAlbums[2].src, width: 200, height: 200,
      style: { borderRadius: "8px", position: "absolute", bottom: "20px", transform: "rotate(-4deg)" },
    });
  } else if (n === 4) {
    // 2x2 grid-like layout
    imageConfigs.push({
      src: uniqueAlbums[0].src, width: 190, height: 190,
      style: { borderRadius: "8px", position: "absolute", left: "30px", top: "20px", transform: "rotate(-8deg)" },
    });
    imageConfigs.push({
      src: uniqueAlbums[1].src, width: 190, height: 190,
      style: { borderRadius: "8px", position: "absolute", right: "30px", top: "30px", transform: "rotate(10deg)" },
    });
    imageConfigs.push({
      src: uniqueAlbums[2].src, width: 190, height: 190,
      style: { borderRadius: "8px", position: "absolute", left: "50px", bottom: "20px", transform: "rotate(5deg)" },
    });
    imageConfigs.push({
      src: uniqueAlbums[3].src, width: 190, height: 190,
      style: { borderRadius: "8px", position: "absolute", right: "50px", bottom: "10px", transform: "rotate(-6deg)" },
    });
  } else {
    // 5+ albums — two on top, one center, two on bottom
    imageConfigs.push({
      src: uniqueAlbums[0].src, width: 170, height: 170,
      style: { borderRadius: "8px", position: "absolute", left: "30px", top: "10px", transform: "rotate(-10deg)" },
    });
    imageConfigs.push({
      src: uniqueAlbums[1].src, width: 170, height: 170,
      style: { borderRadius: "8px", position: "absolute", right: "30px", top: "10px", transform: "rotate(8deg)" },
    });
    imageConfigs.push({
      src: uniqueAlbums[2].src, width: 180, height: 180,
      style: { borderRadius: "8px", position: "absolute", left: "155px", top: "100px", transform: "rotate(3deg)" },
    });
    if (uniqueAlbums[3]) {
      imageConfigs.push({
        src: uniqueAlbums[3].src, width: 170, height: 170,
        style: { borderRadius: "8px", position: "absolute", left: "30px", bottom: "10px", transform: "rotate(6deg)" },
      });
    }
    if (uniqueAlbums[4]) {
      imageConfigs.push({
        src: uniqueAlbums[4].src, width: 170, height: 170,
        style: { borderRadius: "8px", position: "absolute", right: "30px", bottom: "10px", transform: "rotate(-5deg)" },
      });
    }
  }

  const songNames = surpriseSongsArray.map((s) => s.trim());

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", fontSize: 36 }}>Taylor Swift Eras Tour</div>
          <div style={{ display: "flex", fontSize: 30 }}>
            {location + ", " + date}
          </div>
        </div>

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
          {imageConfigs.map((img, i) => (
            <img
              key={i}
              src={img.src}
              width={img.width}
              height={img.height}
              alt="album cover"
              style={img.style}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {songNames.map((name, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                fontSize: 30,
                fontWeight: 700,
                padding: "2px",
              }}
            >
              {name}
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
