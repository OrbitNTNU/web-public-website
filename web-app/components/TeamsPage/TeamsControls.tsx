import { motion } from "framer-motion";

interface TeamsControlsProps {
  viewMode: "grid" | "list" | "members" | "gallery" | "traditional";
  setViewMode: (
    mode: "grid" | "list" | "members" | "gallery" | "traditional",
  ) => void;
  setSearchTerm: (term: string) => void;
}

const controls = [
  {
    key: "traditional",
    icon: "dashboard",
    label: "Traditional",
    hideOnSmallScreens: false,
  },
  {
    key: "members",
    icon: "people",
    label: "Members",
    hideOnSmallScreens: false,
  },
  {
    key: "grid",
    icon: "grid_view",
    label: "Teams",
    hideOnSmallScreens: false,
  },
  {
    key: "gallery",
    icon: "photo_library",
    label: "Gallery",
    hideOnSmallScreens: true,
  },
  {
    key: "list",
    icon: "list",
    label: "List View",
    hideOnSmallScreens: true,
  },
] as const;

const TeamsControls = ({
  viewMode,
  setViewMode,
  setSearchTerm,
}: TeamsControlsProps) => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-4 md:px-12">
      <div className="items-left w-auto flex flex-row space-x-8">
        {controls.map((control) => (
          <motion.button
            key={control.key}
            type="button"
            className={`cursor-pointer group gap-2 flex items-center hover:text-cloud-white transition-all
                            ${viewMode === control.key ? "text-cloud-white" : "text-charcoal-light"}
                            ${control.hideOnSmallScreens ? "hidden md:flex" : "flex"}
                        `}
            onClick={() => setViewMode(control.key)}
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
      <div className="hidden md:flex justify-end flex-1 items-center w-full mt-20 lg:mt-0">
        <input
          type="text"
          placeholder="Search"
          className="border-b w-full lg:w-128 text-left text-xl pb-2 pr-4 bg-transparent text-cloud-white placeholder:text-charcoal-light focus:outline-none"
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        <span className="material-icons">search</span>
      </div>
    </section>
  );
};

export default TeamsControls;
