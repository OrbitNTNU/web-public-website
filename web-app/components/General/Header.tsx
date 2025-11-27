interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <section className="my-24 px-4 md:px-12 bg-charcoal">
      <div className="w-full md:w-3/4">
        <span className="text-2xl text-cloud-white md:text-3xl">{title}</span>
        {subtitle && (
          <span className="block text-2xl text-charcoal-light sm:ml-2 sm:inline md:text-3xl">
            {subtitle}
          </span>
        )}
      </div>
    </section>
  );
};

export default Header;
