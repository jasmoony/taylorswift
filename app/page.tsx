import { SongForm } from "./form/addsong";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen text-xl">
        <span>✨Manifest your surprise songs✨</span>
        <div className="flex flex-col justify-center items-center bg-cosmos-200 rounded-lg m-4 p-4">
          <SongForm />
        </div>
      </div>
    </>
  );
}
