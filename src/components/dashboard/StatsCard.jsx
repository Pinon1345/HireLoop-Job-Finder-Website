import React from "react";

const StatsCard = ({ title, value, icon: Icon }) => {
    return (
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-5 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5">
            <div className="flex flex-col gap-5">

                {/* Icon */}
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                    {Icon && <Icon className="text-gray-300 text-lg" />}
                </div>

                {/* Text */}
                <div>
                    <p className="text-xs text-gray-400">
                        {title}
                    </p>

                    <h2 className="mt-1 text-3xl font-bold text-white">
                        {value}
                    </h2>
                </div>

            </div>
        </div>
    );
};

export default StatsCard;