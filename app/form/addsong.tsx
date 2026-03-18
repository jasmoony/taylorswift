"use client";

import { useState, useMemo } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
  Field,
} from "@headlessui/react";
import { tours } from "../tourdates";
import { Tour } from "../tourdates";

export function SongForm() {
  const [imageURL, setImageURL] = useState("");

  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [query, setQuery] = useState("");

  const filteredCity = useMemo(
    () =>
      query === ""
        ? tours
        : tours.filter((tour) =>
            tour.city.toLowerCase().includes(query.toLowerCase())
          ),
    [query]
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedTour) {
      if (!selectedTour.songs || selectedTour.songs.length === 0) {
        alert("No surprise songs available for this date yet!");
        return;
      }
      const newSearchParams = new URLSearchParams({
        location: selectedTour.city,
        date: selectedTour.date,
        songs: selectedTour.songs.join(","),
      });

      let imageURL = `/api/og/?${newSearchParams.toString()}`;
      setImageURL(imageURL);
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Field className="w-full relative">
          <Combobox
            value={selectedTour}
            onChange={(value) => {
              if (value) {
                setSelectedTour(value);
              }
            }}
            onClose={() => setQuery("")}
          >
            <div className="relative">
              <ComboboxInput
                aria-label="location"
                displayValue={(tour: Tour | null) =>
                  tour ? `${tour.city} ${tour.date}` : ""
                }
                onChange={(event) => setQuery(event.target.value)}
                className="w-full px-5 py-3 rounded-full bg-white shadow-md text-base placeholder:text-ebonyclay-950/40 focus:outline-none focus:ring-2 focus:ring-sunset-500/50"
                placeholder="Search by city..."
                type="text"
                id="location"
                name="location"
                required
              />
              <ComboboxButton className="absolute inset-y-0 right-0 px-4 text-xl">
                👇
              </ComboboxButton>
            </div>
            <ComboboxOptions
              anchor="bottom"
              className="bg-white rounded-xl shadow-lg w-[var(--input-width)] border border-cupid-100 empty:invisible mt-2 max-h-60 overflow-auto"
            >
              {filteredCity.map((tour) => (
                <ComboboxOption
                  key={`${tour.city} ${tour.date}`}
                  value={tour}
                  className="px-4 py-2 cursor-pointer data-[focus]:bg-cupid-100 transition-colors"
                >
                  {`${tour.city} — ${tour.date}`}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Combobox>
        </Field>

        <button
          type="submit"
          className="mt-5 px-8 py-3 bg-sunset-500 text-white rounded-full text-base font-medium shadow-md hover:bg-sunset-600 active:scale-95 transition-all"
        >
          Find Surprise Songs
        </button>
      </form>

      {imageURL && (
        <div className="mt-10">
          <img
            src={imageURL}
            className="rounded-2xl shadow-xl max-w-xs"
            alt="Surprise songs result"
          />
        </div>
      )}
    </div>
  );
}
