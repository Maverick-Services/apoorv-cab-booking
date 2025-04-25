
import { useState, useEffect } from "react";
import { IoAddCircle } from "react-icons/io5";

const LocationSearch = ({ register, setValue, dropOffs, setDropOffs, tripType, pickupCity }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {

        if (tripType === "One Way")
            register("dropCity", { required: true })

    }, [tripType, register]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 1) {
                setSuggestions([]);
                return;
            }

            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
                );
                const data = await res.json();
                setSuggestions(data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        };

        const debounce = setTimeout(() => {
            fetchSuggestions();
        }, 200);

        return () => clearTimeout(debounce);
    }, [query]);

    return (
        <div className="w-full flex items-stretch gap-3">
            <div className="relative w-full max-w-md">
                <input
                    disabled={!pickupCity}
                    type="text"
                    placeholder="Search location..."
                    className="w-full px-4 py-2 border rounded"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto">
                        {suggestions.map((place) => (
                            <li
                                key={place.place_id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setQuery(place?.display_name);
                                    setValue("dropCity", place?.display_name);
                                    setSuggestions([]);
                                }}
                            >
                                {place.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {
                tripType === "Round Trip" &&
                <button className="px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={e => {
                        e.preventDefault();
                        if (query && !dropOffs.includes(query)) {
                            setDropOffs(prev => [...prev, query]);
                            setQuery("");
                            setSuggestions([]);
                        }
                    }}
                >
                    <IoAddCircle size={20} />
                </button>
            }
        </div>
    );
};

export default LocationSearch;
