import { Team } from "@/app/team/page";
import { Dispatch, SetStateAction } from "react";

interface SearchFiltersProps {
    teamsData: Team[];
    filters: string[];
    openDropdowns: boolean[];
    setOpenDropdowns: (openDropdowns: boolean[]) => void;
    selectedFilters: { [key: string]: string[] };
    setSelectedFilters: Dispatch<SetStateAction<{ [key: string]: string[] }>>;
}

const SearchFilters = ({
    teamsData,
    filters,
    openDropdowns,
    setOpenDropdowns,
    selectedFilters,
    setSelectedFilters
}: SearchFiltersProps) => {
    return (
        <section className="grid grid-cols-1 xl:grid-cols-5 gap-32 my-20">
            {filters.map((filter, idx) => {
                const options = filter === "Team"
                    ? teamsData.map(team => team.teamName)
                    : filter === "Group"
                        ? Array.from(new Set(teamsData.map(team => team.group.split("_").join(" "))))
                        : Array.from(new Set(teamsData.flatMap(team => team.members.map(member => member.privilege))));

                return (
                    <div key={filter} className="relative">
                        <button
                            type="button"
                            className="border-b w-full text-left text-base bg-transparent text-cloud-white placeholder:text-cloud-white cursor-pointer flex items-center justify-between"
                            onClick={() => setOpenDropdowns(openDropdowns.map((open, i) => i === idx ? !open : open))}
                        >
                            <span>{filter}</span>
                            <section className="flex flex-row gap-2">
                                <span className="material-icons pointer-events-none flex items-center self-center">
                                    {openDropdowns[idx] ? "arrow_drop_up" : "arrow_drop_down"}
                                </span>
                            </section>
                        </button>
                        <div
                            className="mt-2 w-48 flex flex-col transition-all duration-300 z-10 overflow-hidden"
                            style={{ maxHeight: openDropdowns[idx] ? `${options.length * 2.5}rem` : "0", transition: "max-height 0.7s ease-in-out" }}
                        >
                            {options.sort((a, b) => a.localeCompare(b)).map((option, optionIdx) => (
                                <label
                                    key={option}
                                    className={`flex items-center cursor-pointer whitespace-nowrap group hover:text-cloud-white transition-all duration-100 ${selectedFilters[filter]?.includes(option)
                                        ? "text-cloud-white"
                                        : "text-slate"
                                        }`}
                                    style={{
                                        opacity: openDropdowns[idx] ? 1 : 0,
                                        transform: openDropdowns[idx] ? "translateY(0)" : "translateY(20px)",
                                        transition: `opacity 0.1s ease ${optionIdx * 20}ms, transform 0.4s ease ${optionIdx * 20}ms, max-height 0.1s ease`,
                                    }}
                                    onClick={() => {
                                        setSelectedFilters((prev) => {
                                            const prevOptions = prev[filter] || [];
                                            const isChecked = !prevOptions.includes(option);
                                            return {
                                                ...prev,
                                                [filter]: isChecked
                                                    ? [...prevOptions, option]
                                                    : prevOptions.filter(opt => opt !== option)
                                            };
                                        });
                                    }}
                                >
                                    <span
                                        className={`w-4 h-4 mr-2 flex items-center group-hover:border-cloud-white justify-center border-1 border-slate
                                                    ${selectedFilters[filter]?.includes(option)
                                                ? "bg-cloud-white border-cloud-white text-cloud-white"
                                                : "bg-transparent"
                                            }`}
                                        onKeyDown={e => {
                                            if (e.key === " " || e.key === "Enter") {
                                                setSelectedFilters(prev => {
                                                    const prevOptions = prev[filter] || [];
                                                    const isChecked = !prevOptions.includes(option);
                                                    return {
                                                        ...prev,
                                                        [filter]: isChecked
                                                            ? [...prevOptions, option]
                                                            : prevOptions.filter(opt => opt !== option)
                                                    };
                                                });
                                            }
                                        }}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                         {options.length > 0 && (
                            <ul
                                className="list-disc transition-all duration-700 flex flex-col"
                                style={{
                                    opacity: openDropdowns[idx] ? 0 : 1,
                                    height: openDropdowns[idx]
                                        ? `0`
                                        : "1.5rem",
                                    transition: !openDropdowns[idx]
                                        ? "opacity 0.3s ease 0.6s, height 0.1s ease 0.6s"
                                        : "opacity 0.3s ease, height 0.1s ease",
                                }}
                            >
                                {options.filter((_, idx2) => selectedFilters[filter]?.includes(options[idx2])).map((option) => (
                                    <li key={option} className="flex items-left text-slate text-sm" >
                                        &bull; {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            })}
            <span/>
                <button
                    type="button"
                    className="text-slate hover:text-cloud-white transition-colors duration-150 flex w-full justify-end items-start gap-2"
                    onClick={() => {
                        setSelectedFilters({});
                        setOpenDropdowns(new Array(filters.length).fill(false));
                    }}
                    style={{
                        opacity: Object.entries(selectedFilters).filter((entry) => entry[1].length > 0).length === 0 ? 0 : 1,
                        pointerEvents: Object.entries(selectedFilters).filter((entry) => entry[1].length > 0).length === 0 ? "none" : "auto",
                        transition: "opacity 0.3s ease",
                    }}
                >
                    <span className="material-icons">clear</span>
                    Clear all filters
                </button>
        </section>
    )
}

export default SearchFilters;