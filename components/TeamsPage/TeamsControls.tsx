interface TeamsControlsProps {
    viewMode: "grid" | "list" | "members";
    setViewMode: (mode: "grid" | "list" | "members") => void;
    setSearchTerm: (term: string) => void;
}

const TeamsControls = ({ viewMode, setViewMode, setSearchTerm }: TeamsControlsProps) => {
    return (
        <section className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex space-x-8">
                <span className="flex">
                    <button
                        type="button"
                        className={`cursor-pointer group gap-2 flex items-center hover:text-cloud-white ${viewMode === "members" ? "text-cloud-white" : "text-slate"}`}
                        onClick={() => setViewMode("members")}
                    >
                        <span className={`group-hover:text-cloud-white material-icons ${viewMode === "members" ? "text-cloud-white" : "text-slate"}`}>people</span>
                        <span>Members</span>
                    </button>
                </span>
                <button
                    type="button"
                    className={`cursor-pointer group gap-2 flex items-center hover:text-cloud-white ${viewMode === "grid" ? "text-cloud-white" : "text-slate"}`}
                    onClick={() => setViewMode("grid")}
                >
                    <span className={`group-hover:text-cloud-white material-icons ${viewMode === "grid" ? "text-cloud-white" : "text-slate"}`}>grid_view</span>
                    <span>Team grid</span>
                </button>
                <button
                    type="button"
                    className={`cursor-pointer group gap-2 flex items-center hover:text-cloud-white ${viewMode === "list" ? "text-cloud-white" : "text-slate"}`}
                    onClick={() => setViewMode("list")}
                >
                    <span className={`group-hover:text-cloud-white material-icons ${viewMode === "list" ? "text-cloud-white" : "text-slate"}`}>list</span>
                    <span>List View</span>
                </button>
            </div>
            <div className="flex justify-end flex-1">
                <input
                    type="text"
                    placeholder="Search"
                    className="border-b w-128 text-left text-xl pb-2 pr-4 bg-transparent text-cloud-white placeholder:text-slate focus:outline-none"
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
                <span className="material-icons">search</span>
            </div>
        </section>
    )
}

export default TeamsControls;