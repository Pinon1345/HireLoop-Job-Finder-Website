import StatsCard from "./StatsCard";

const StatsSection = ({ stats }) => {
    return (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
                <StatsCard
                    key={item.title}
                    title={item.title}
                    value={item.value}
                    icon={item.icon}
                />
            ))}
        </section>
    );
};

export default StatsSection;