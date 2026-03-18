import { SongForm } from "./form/addsong";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-16">
      <h1 className="font-title text-4xl md:text-5xl text-center mb-3">
        ✨ The Eras Tour ✨
      </h1>
      <p className="text-lg text-ebonyclay-950/70 text-center mb-10">
        Search your concert to see what surprise songs Blondie played
      </p>
      <SongForm />
    </div>
  );
}
