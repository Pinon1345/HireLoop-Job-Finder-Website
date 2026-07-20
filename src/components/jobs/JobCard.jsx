"use client";

import Link from "next/link";
import { Card, Avatar, Button, Chip } from "@heroui/react";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import { IoBriefcaseOutline } from "react-icons/io5";
import { BiDollarCircle } from "react-icons/bi";
import { TbArrowRightToArc } from "react-icons/tb";

export default function JobCard({ job }) {
    if (!job) return null;

    const jobId = typeof job._id === "object" ? job._id.$oid : job._id;

    const {
        jobTitle,
        companyName,
        companyLogo,
        location,
        jobType,
        isRemote,
        minSalary,
        maxSalary,
        currency,
        responsibilities,
    } = job;

    // Fallback to null if companyLogo is empty string or falsy
    const logoSrc = companyLogo && companyLogo.trim() !== "" ? companyLogo : null;

    const formattedMin = Number(minSalary).toLocaleString();
    const formattedMax = Number(maxSalary).toLocaleString();
    const salaryDisplay = `$${formattedMin}–$${formattedMax} ${currency}/hour`;

    const workTypeTag = isRemote ? "Remote" : jobType;

    return (
        <Card className="max-w-md bg-zinc-950 text-white border border-zinc-800/80 rounded-3xl p-5 shadow-xl hover:border-zinc-700 transition-colors">
            {/* Header: Company & Title */}
            <Card.Header className="flex flex-col items-start gap-3 p-0 pb-2">
                <div className="flex items-center gap-3">
                    <Avatar
                        src={logoSrc}
                        name={companyName}
                        alt={companyName}
                        className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-full object-contain p-1"
                    />
                    <span className="text-sm font-medium text-zinc-400">
                        {companyName}
                    </span>
                </div>

                <div>
                    <Card.Title className="text-2xl font-semibold tracking-tight text-white">
                        {jobTitle}
                    </Card.Title>
                    <Card.Description className="text-sm text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                        {responsibilities}
                    </Card.Description>
                </div>
            </Card.Header>

            {/* Content: Badges / Pills */}
            <Card.Content className="p-0 py-4">
                <div className="flex flex-wrap gap-2">
                    {/* Location */}
                    <Chip
                        className="bg-zinc-900 border border-zinc-800/80 text-zinc-200 px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5"
                        variant="flat"
                    >
                        <MdOutlineEditLocationAlt className="w-4 h-4 text-pink-400" />
                        <span>{location}</span>
                    </Chip>

                    {/* Job Type / Remote */}
                    <Chip
                        className="bg-zinc-900 border border-zinc-800/80 text-zinc-200 px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5"
                        variant="flat"
                    >
                        <IoBriefcaseOutline className="w-4 h-4 text-pink-400" />
                        <span>{workTypeTag}</span>
                    </Chip>

                    {/* Salary */}
                    <Chip
                        className="bg-zinc-900 border border-zinc-800/80 text-zinc-200 px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5"
                        variant="flat"
                    >
                        <BiDollarCircle className="w-4 h-4 text-pink-400" />
                        <span>{salaryDisplay}</span>
                    </Chip>
                </div>
            </Card.Content>

            {/* Footer: Apply Action */}
            <Card.Footer className="p-0 pt-2">
                <Link

                    href={`/jobs/${jobId}`}
                    variant="light"
                    className="text-white hover:text-pink-400 font-medium text-sm p-0 flex items-center gap-2 group transition-colors"
                >
                    Apply Now
                    <TbArrowRightToArc className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-pink-400" />
                </Link>
            </Card.Footer>
        </Card>
    );
}