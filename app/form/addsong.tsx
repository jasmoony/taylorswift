"use client";

import { useState } from "react";

const initialState = {
  message: "",
};

export function SongForm() {
  const [imageURL, setImageURL] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const locationInput = form.get("location") as string;
    const dateInput = form.get("date") as string;
    const songOneInput = form.get("songone") as string;
    const songTwoInput = form.get("songtwo") as string;

    const newSearchParams = new URLSearchParams({
      location: locationInput,
      date: dateInput,
      songone: songOneInput,
      songtwo: songTwoInput,
    });

    let imageURL = `/api/og/?${newSearchParams.toString()}`;
    console.log(imageURL);
    setImageURL(imageURL);
  }

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label></label>
        <input
          className="p-2 mb-2 rounded-lg"
          type="text"
          id="location"
          name="location"
          placeholder="amsterdam"
          required
        />
        <input
          className="p-2 mb-2 rounded-lg"
          type="date"
          id="date"
          name="date"
          required
        />
        <input
          className="p-2 mb-2 rounded-lg"
          type="text"
          id="songone"
          name="songone"
          placeholder="first song"
          required
        />
        <input
          className="p-2 mb-2 rounded-lg"
          type="text"
          id="songtwo"
          name="songtwo"
          placeholder="second song"
          required
        />
        <button type="submit" className="bg-sunset-500 rounded-lg">
          Submit
        </button>
      </form>

      <img src={imageURL} />
    </>
  );
}
