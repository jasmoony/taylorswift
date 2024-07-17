"use client";

import { useState } from "react";
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

  const filteredCity =
    query === ""
      ? tours
      : tours.filter((tour) => {
          return tour.city.toLowerCase().includes(query.toLowerCase());
        });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedTour) {
      const newSearchParams = new URLSearchParams({
        location: selectedTour.city,
        date: selectedTour.date,
        songs: selectedTour.songs,
      });

      let imageURL = `/api/og/?${newSearchParams.toString()}`;
      console.log(imageURL);
      setImageURL(imageURL);
    }
  }

  return (
    <>
      <form
        className="flex flex-col relative"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="flex flex-col relative">
          <div className="flex flex-row">
            <Field>
              <Combobox
                value={selectedTour}
                onChange={(value) => {
                  console.log("value:", value);
                  if (value) {
                    setSelectedTour(value);
                  }
                }}
                onClose={() => setQuery("")}
              >
                <div>
                  <ComboboxInput
                    aria-label="location"
                    displayValue={(tour: Tour | null) => {
                      if (tour) {
                        return tour.city + " " + tour.date;
                      } else {
                        return "";
                      }
                    }}
                    onChange={(event) => setQuery(event.target.value)}
                    className="p-2 mb-2 rounded-lg"
                    placeholder="enter city"
                    type="text"
                    id="location"
                    name="location"
                    required
                  />
                  <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                    👇
                  </ComboboxButton>
                </div>
                <ComboboxOptions
                  anchor="bottom"
                  className=" bg-cosmos-200 w-[var(--input-width)] border empty:invisible"
                >
                  {filteredCity.map((tour) => (
                    <ComboboxOption
                      key={`${tour.city} ${tour.date}`}
                      value={tour}
                      className="data-[focus]:bg-sunset-500"
                    >
                      {`${tour.city} ${tour.date}`}
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </Combobox>
            </Field>
          </div>
        </div>
        <button type="submit" className="bg-sunset-500 rounded-lg m-4 w-15">
          Submit
        </button>
      </form>
      <img src={imageURL} />
    </>
  );
}
