import { motion } from "framer-motion";

interface TeamsControlsProps {
  viewMode: "list" | "gallery" | "traditional";
  setViewMode: (mode: "list" | "gallery" | "traditional") => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const controls = [
  {
    key: "traditional",
    icon: "dashboard",
    label: "Traditional",
  },
  {
    key: "gallery",
    icon: "photo_library",
    label: "Gallery",
  },
  {
    key: "list",
    icon: "list",
    label: "List View",
  },
] as const;

const TeamsControls = ({
  viewMode,
  setViewMode,
  searchTerm,
  setSearchTerm,
}: TeamsControlsProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTerm !== "") {
      setViewMode("gallery");
    }
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleChangeViewMode = (mode: "list" | "gallery" | "traditional") => {
    setViewMode(mode);
    if (mode !== "gallery") {
      setSearchTerm("");
    }
  };

  return (
    <section className="hidden md:flex flex-col lg:flex-row items-center justify-between px-4 md:px-12">
      <div className="flex items-left w-auto flex-row space-x-8 h-12">
        {controls.map((control) => (
          <motion.button
            key={control.key}
            type="button"
            className={`cursor-pointer group gap-2 flex items-center hover:text-cloud-white transition-all bg-charcoal
                            ${viewMode === control.key ? "text-cloud-white" : "text-charcoal-light"}
                        `}
            onClick={() => handleChangeViewMode(control.key)}
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span
              className={`group-hover:text-cloud-white material-icons transition-colors
                                ${viewMode === control.key ? "text-cloud-white" : "text-charcoal-light"}
                            `}
            >
              {control.icon}
            </span>
            <small>{control.label}</small>
          </motion.button>
        ))}
      </div>
      {viewMode === "gallery" && (
        <div className="hidden md:flex justify-end flex-1 items-center w-full mt-20 lg:mt-0">
          <input
            type="text"
            placeholder="Search"
            className="border-b w-full lg:w-128 text-left text-xl pb-2 pr-4 bg-transparent text-cloud-white placeholder:text-charcoal-light focus:outline-none"
            onChange={handleSearch}
            value={searchTerm}
          />
          <span className="material-icons">search</span>
        </div>
      )}
    </section>
  );
};

export default TeamsControls;
