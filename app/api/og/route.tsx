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
    title: "reputation",
    colour: "#746f70",
    src: "/reputation.png",
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

  const { searchParams } = new URL(request.url);

  const location = searchParams.get("location") as string;
  const date = searchParams.get("date") as string;
  const surpriseSongs = searchParams.get("songs") as string;
  console.log({ surpriseSongs });

  const surpriseSongsArray = surpriseSongs.split(",");

  let playedAlbumsArray = surpriseSongsArray.map((surpriseSong) => {
    return songs.find(
      (song) => song.songTitle.toLowerCase() == surpriseSong.toLowerCase()
    )?.albumTitle;
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

  let imageSourcesArray = uniqueAlbumsArray.map((playedAlbum) => {
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
            fontSize: 40,
            color: "black",
            background: "radial-gradient(circle, #EF6153, #FFBDDF)",
            width: "640px",
            height: "960px",
            padding: "4px",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "pistilliroman",
          }}
        >
          {" "}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                justifyContent: "center",
                padding: "2px",
              }}
            >
              The Eras Tour
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "2px",
                justifyContent: "center",
              }}
            >
              {" "}
              <div
                style={{
                  paddingRight: "2px",
                }}
              >
                {location}
              </div>
              <div> 🫶 </div>
              <div
                style={{
                  paddingLeft: "2px",
                }}
              >
                {date}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: "4x",
            }}
          >
            {/* check if there are images found */}
            {imageSourcesArray.length == 1 ? (
              <img
                src={imageSourcesArray[0]}
                width={450}
                height={450}
                alt="album cover"
                style={{
                  padding: "8px",
                }}
              />
            ) : imageSourcesArray.length == 2 ? (
              <>
                <img
                  src={imageSourcesArray[0]}
                  width={300}
                  height={300}
                  alt="album cover"
                  style={{
                    padding: "8px",
                  }}
                />
                <img
                  src={imageSourcesArray[1]}
                  width={300}
                  height={300}
                  alt="album cover"
                  style={{
                    padding: "8px",
                  }}
                />
              </>
            ) : imageSourcesArray.length == 3 ? (
              <>
                <img
                  src={imageSourcesArray[0]}
                  width={300}
                  height={300}
                  alt="album cover"
                  style={{
                    marginLeft: "-10px",
                    transform: "rotate(-10deg)",
                  }}
                />
                <img
                  src={imageSourcesArray[1]}
                  width={300}
                  height={300}
                  alt="album cover"
                  style={{
                    marginRight: "10px",
                    transform: "rotate(10deg)",
                  }}
                />
                <img
                  src={imageSourcesArray[2]}
                  width={300}
                  height={300}
                  alt="album cover"
                  style={{
                    marginLeft: "150px",
                    marginTop: "200px",
                    position: "absolute",
                  }}
                />
              </>
            ) : imageSourcesArray.length == 4 ? (
              <>
                <img
                  src={imageSourcesArray[0]}
                  width={300}
                  height={300}
                  alt="album cover"
                  style={{
                    marginLeft: "100px",
                    marginTop: "100px",
                    transform: "rotate(-10deg)",
                  }}
                />
                <img
                  src={imageSourcesArray[1]}
                  width={300}
                  height={300}
                  alt="album cover"
                  style={{
                    marginRight: "10px",
                    transform: "rotate(10deg)",
                  }}
                />
                <img
                  src={imageSourcesArray[2]}
                  width={300}
                  height={300}
                  alt="album cover"
                  style={{
                    marginLeft: "-10px",
                    transform: "rotate(-10deg)",
                    marginTop: "200px",
                  }}
                />
                <img
                  src={imageSourcesArray[3]}
                  width={300}
                  height={300}
                  alt="album cover"
                  style={{
                    marginRight: "10px",
                    transform: "rotate(10deg)",
                    marginTop: "200px",
                  }}
                />
              </>
            ) : imageSourcesArray.length == 5 ? (
              <>
                <img
                  src={imageSourcesArray[0]}
                  width={100}
                  height={100}
                  alt="album cover"
                  style={{
                    padding: "8px",
                  }}
                />
                <img
                  src={imageSourcesArray[1]}
                  width={100}
                  height={100}
                  alt="album cover"
                  style={{
                    padding: "8px",
                  }}
                />
                <img
                  src={imageSourcesArray[2]}
                  width={100}
                  height={100}
                  alt="album cover"
                  style={{
                    padding: "8px",
                  }}
                />
                <img
                  src={imageSourcesArray[3]}
                  width={100}
                  height={100}
                  alt="album cover"
                  style={{
                    padding: "8px",
                  }}
                />
                <img
                  src={imageSourcesArray[4]}
                  width={100}
                  height={100}
                  alt="album cover"
                  style={{
                    padding: "8px",
                  }}
                />
              </>
            ) : imageSourcesArray.length >= 6 ? (
              <>
                <img
                  src={imageSourcesArray[0]}
                  width={100}
                  height={100}
                  alt="album cover"
                  style={{
                    padding: "8px",
                  }}
                />
                <img
                  src={imageSourcesArray[1]}
                  width={100}
                  height={100}
                  alt="album cover"
                  style={{
                    padding: "8px",
                  }}
                />
                <img
                  src={imageSourcesArray[2]}
                  width={100}
                  height={100}
                  alt="album cover"
                  style={{
                    padding: "8px",
                  }}
                />
                <img
                  src={imageSourcesArray[3]}
                  width={100}
                  height={100}
                  alt="album cover"
                  style={{
                    padding: "8px",
                  }}
                />
                <img
                  src={imageSourcesArray[4]}
                  width={100}
                  height={100}
                  alt="album cover"
                  style={{
                    padding: "8px",
                  }}
                />
                <img
                  src={imageSourcesArray[5]}
                  width={100}
                  height={100}
                  alt="album cover"
                  style={{
                    padding: "8px",
                  }}
                />
              </>
            ) : imageSourcesArray.length == 0 ? (
              /* default when there are no images */
              <img
                src={"http://localhost:3000/default"}
                width={450}
                height={450}
                alt="taylor swift eras tour"
                style={{
                  padding: "8px",
                }}
              />
            ) : null}
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {surpriseSongsArray?.map((surpriseSong, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      padding: "4px",
                      justifyContent: "center",
                    }}
                  >
                    {surpriseSong}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
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
