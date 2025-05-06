import { TRIP_TYPES } from "@/lib/constants/constants";
import { Loader2, MapPin, X } from "lucide-react";
import { useState, useEffect } from "react";
import { IoAddCircle } from "react-icons/io5";

const LocationSearch = ({ register, unregister, setValue, dropOffs, setDropOffs, tripType }) => {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (tripType === TRIP_TYPES.oneWay) {
            register("dropCity",
                // { required: "Drop city is required" }
            );
        }
        else {
            unregister("dropCity");
        }
    }, [tripType, register, unregister]);

    // fetch suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 1) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
                );
                const data = await res.json();
                setSuggestions(data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(debounce);
    }, [query]);

    const handleAddCity = () => {
        if (query && !dropOffs.includes(query)) {
            setDropOffs(prev => [...prev, query]);
            setQuery("");
            setSuggestions([]);
        }
    };

    const handleRemoveCity = (cityToRemove) => {
        setDropOffs(prev => prev.filter(city => city !== cityToRemove));
    };

    return (
        <div className="w-full">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-1">
                <MapPin size={16} className="text-primary" />
                Drop Location
            </label>
            <div className="flex gap-2 items-stretch">
                <div className="relative w-full">
                    <div className="flex gap-2 px-4 py-2 rounded-lg border border-gray-300">
                        <input
                            type="text"
                            placeholder="Select Drop City"
                            className="w-full outline-none"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        {loading && (
                            <span className="px-2 py-1 text-gray-300 flex items-center justify-center h-full">
                                <Loader2 size={20} className="animate-spin" />
                            </span>
                        )}
                    </div>
                    {suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto mt-1">
                            {suggestions.map((place) => (
                                <li
                                    key={place.place_id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setQuery(place?.display_name);
                                        if (tripType === "One Way") {
                                            setValue("dropCity", place?.display_name);
                                        }
                                        setSuggestions([]);
                                    }}
                                >
                                    {place.display_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {tripType === "Round Trip" && (
                    <button
                        className="px-4 bg-blue-800 text-white rounded hover:bg-blue-950 hover:rounded-4xl transition-all ease-in-out duration-300"
                        onClick={(e) => {
                            e.preventDefault();
                            handleAddCity();
                        }}
                    >
                        <IoAddCircle size={20} />
                    </button>
                )}
            </div>

            {/* Show added cities for round trip */}
            {tripType === "Round Trip" && dropOffs.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {dropOffs.map((city, idx) => (
                        <span
                            key={idx}
                            className="flex items-center bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full"
                        >
                            {city}
                            <button
                                type="button"
                                className="ml-2 text-gray-500 hover:text-red-500"
                                onClick={() => handleRemoveCity(city)}
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationSearch;
