"use client";

import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
} from "@headlessui/react";
import { songs } from "../songs";
import type { Song } from "../songs";

export function SongForm() {
  const [imageURL, setImageURL] = useState("");

  // State for the first song combobox
  const [selectedSongOne, setSelectedSongOne] = useState("type song");
  const [queryOne, setQueryOne] = useState("");

  // State for the second song combobox
  const [selectedSongTwo, setSelectedSongTwo] = useState("type song");
  const [queryTwo, setQueryTwo] = useState("");

  const filteredSongsOne =
    queryOne === ""
      ? songs
      : songs.filter((song) => {
          return song.songTitle.toLowerCase().includes(queryOne.toLowerCase());
        });

  const filteredSongsTwo =
    queryTwo === ""
      ? songs
      : songs.filter((song) => {
          return song.songTitle.toLowerCase().includes(queryTwo.toLowerCase());
        });

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
      <form
        className="flex flex-col relative"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
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
        <div className="flex flex-col relative">
          <span>on guitar:</span>
          <div className="flex flex-row">
            <Field>
              <Combobox
                value={selectedSongOne}
                onChange={(value) => {
                  if (value) {
                    setSelectedSongOne(value);
                  }
                }}
                onClose={() => setQueryOne("")}
              >
                <ComboboxInput
                  aria-label="Song one"
                  displayValue={(song: Song) => song?.songTitle}
                  onChange={(event) => setQueryOne(event.target.value)}
                  className="p-2 mb-2 rounded-lg"
                  placeholder="type song"
                  type="text"
                  id="songone"
                  name="songone"
                  required
                />
                <ComboboxOptions
                  anchor="bottom"
                  className="w-[var(--input-width)] border empty:invisible"
                >
                  {filteredSongsOne.map((song) => (
                    <ComboboxOption
                      key={song.songTitle}
                      value={song}
                      className="data-[focus]:bg-sunset-500"
                    >
                      {song.songTitle}
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </Combobox>
            </Field>
          </div>
          <button className="text-sunset-500 text-5xl">+</button>
        </div>
        <div className="flex flex-col relative">
          <Field>
            <span>on piano:</span>
            <div className="flex flex-row">
              <Combobox
                value={selectedSongTwo}
                onChange={(value) => {
                  if (value) {
                    setSelectedSongTwo(value);
                  }
                }}
                onClose={() => setQueryTwo("")}
              >
                <ComboboxInput
                  aria-label="Song two"
                  displayValue={(song: Song) => song?.songTitle}
                  onChange={(event) => setQueryTwo(event.target.value)}
                  className="p-2 mb-2 rounded-lg"
                  placeholder="type song"
                  type="text"
                  id="songtwo"
                  name="songtwo"
                  required
                />
                <ComboboxOptions
                  anchor="bottom"
                  className=" w-[var(--input-width)] border empty:invisible"
                >
                  {filteredSongsTwo.map((song) => (
                    <ComboboxOption
                      key={song.songTitle}
                      value={song}
                      className="data-[focus]:bg-sunset-500"
                    >
                      {song.songTitle}
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </Combobox>
              <button className="text-sunset-500 text-5xl">+</button>
            </div>
          </Field>
        </div>
        <button type="submit" className="bg-sunset-500 rounded-lg">
          Submit
        </button>
      </form>

      <img src={imageURL} alt="Generated" />
    </>
  );
}
