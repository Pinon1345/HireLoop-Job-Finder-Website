"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TextField, InputGroup, Select, ListBox } from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";

export default function JobFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Read current URL search parameters
    const searchQuery = searchParams.get("q") || "";
    const selectedCategory = searchParams.get("category") || "All";
    const selectedType = searchParams.get("type") || "All";
    const selectedRemote = searchParams.get("remote") || "All";

    const categories = ["All", "Engineering", "Marketing", "Design", "Product", "Sales", "Technology", "Finance"];
    const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Internship"];
    const workTypes = ["All", "Remote", "On-site"];

    // Updates the Next.js search parameters cleanly
    const updateQueryParam = (key, val) => {
        const params = new URLSearchParams(searchParams.toString());

        // val is directly the key/string from HeroUI Select
        if (val && val !== "All" && val !== "") {
            params.set(key, val);
        } else {
            params.delete(key);
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="bg-zinc-950 border border-zinc-800/80 p-5 rounded-3xl mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between shadow-xl">
            {/* Search Input */}
            <div className="flex-1 min-w-[280px]">
                <TextField className="w-full">
                    <InputGroup className="bg-zinc-900 border border-zinc-800 rounded-2xl px-3 py-2 text-white focus-within:border-zinc-700">
                        <InputGroup.Prefix className="text-pink-400 mr-2 flex items-center">
                            <FiSearch className="w-5 h-5" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                            type="text"
                            placeholder="Search by job title, company, or keyword..."
                            value={searchQuery}
                            onChange={(e) => updateQueryParam("q", e.target.value)}
                            className="bg-transparent text-white placeholder-zinc-500 outline-none text-sm w-full"
                        />
                    </InputGroup>
                </TextField>
            </div>

            {/* Select Filters Group */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Category Select */}
                <Select
                    className="w-full"
                    value={selectedCategory}
                    onChange={(val) => updateQueryParam("category", val)}
                >
                    <Select.Trigger className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs px-4 py-2.5 rounded-2xl flex items-center justify-between w-full hover:border-zinc-700">
                        <div className="flex items-center gap-2">
                            <BiFilterAlt className="text-pink-400 w-4 h-4" />
                            <Select.Value placeholder="Category" />
                        </div>
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-zinc-950 border border-zinc-800 rounded-2xl p-1 shadow-2xl">
                        <ListBox className="text-sm text-zinc-300">
                            {categories.map((cat) => (
                                <ListBox.Item
                                    key={cat}
                                    id={cat}
                                    textValue={cat}
                                    className="hover:bg-zinc-900 px-3 py-1.5 rounded-xl cursor-pointer text-xs"
                                >
                                    {cat}
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>

                {/* Job Type Select */}
                <Select
                    className="w-full"
                    value={selectedType}
                    onChange={(val) => updateQueryParam("type", val)}
                >
                    <Select.Trigger className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs px-4 py-2.5 rounded-2xl flex items-center justify-between w-full hover:border-zinc-700">
                        <Select.Value placeholder="Job Type" />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-zinc-950 border border-zinc-800 rounded-2xl p-1 shadow-2xl">
                        <ListBox className="text-sm text-zinc-300">
                            {jobTypes.map((type) => (
                                <ListBox.Item
                                    key={type}
                                    id={type}
                                    textValue={type}
                                    className="hover:bg-zinc-900 px-3 py-1.5 rounded-xl cursor-pointer text-xs"
                                >
                                    {type}
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>

                {/* Remote Filter */}
                <Select
                    className="w-full"
                    value={selectedRemote}
                    onChange={(val) => updateQueryParam("remote", val)}
                >
                    <Select.Trigger className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs px-4 py-2.5 rounded-2xl flex items-center justify-between w-full hover:border-zinc-700">
                        <Select.Value placeholder="Work Location" />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-zinc-950 border border-zinc-800 rounded-2xl p-1 shadow-2xl">
                        <ListBox className="text-sm text-zinc-300">
                            {workTypes.map((work) => (
                                <ListBox.Item
                                    key={work}
                                    id={work}
                                    textValue={work}
                                    className="hover:bg-zinc-900 px-3 py-1.5 rounded-xl cursor-pointer text-xs"
                                >
                                    {work}
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>
        </div>
    );
}