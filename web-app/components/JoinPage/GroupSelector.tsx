interface GroupSelectorProps {
    groups: string[];
    selectedGroups: string[];
    handleGroupToggle: (group: string) => void;
}

const GroupSelector = ({
    groups,
    selectedGroups,
    handleGroupToggle,
}: GroupSelectorProps) => {
    return (
        <section className="px-4 md:px-8 flex flex-col md:flex-row gap-4 w-full lg:w-2/3 mb-12 md:mb-0">
            <span>Sort by: </span>
            {groups.sort((a, b) => a.localeCompare(b)).map((group) => (
                <label
                    key={group}
                    className={`flex bg-charcoal items-center cursor-pointer whitespace-nowrap group hover:text-cloud-white transition-all duration-100 ${selectedGroups.includes(group)
                            ? "text-cloud-white"
                            : "text-charcoal-light"
                        }`}
                    onClick={() => {
                        handleGroupToggle(group);
                    }}
                >
                    <span
                        className={`w-4 h-4 mr-2 flex items-center group-hover:border-cloud-white justify-center border-1 border-charcoal-light
                                                    ${selectedGroups.includes(group)
                                ? "bg-cloud-white border-cloud-white text-cloud-white"
                                : "bg-transparent"
                            }`}
                    />
                    {group.replace("_", " ")}
                </label>
            ))}
        </section>
    );
};

export default GroupSelector;
