"use client";

import React, { useState } from "react";
import { ChevronDown, Globe, Xmark } from "@gravity-ui/icons";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    Button
} from "@heroui/react";
import toast from "react-hot-toast";
import { createJob } from "@/lib/action/jobs";
import { useRouter } from "next/navigation"; // 1. Use useRouter instead of redirect

export default function PostJobForm({ company }) {
    const router = useRouter(); // Initialize router

    console.log("PostJobForm receive company's information", company);

    const [formData, setFormData] = useState({
        jobTitle: "",
        jobCategory: "Technology",
        jobType: "",
        minSalary: "",
        maxSalary: "",
        currency: "USD",
        location: "",
        isRemote: false,
        deadline: "",
        responsibilities: "",
        requirements: "",
        benefits: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fallbacks to handle both MongoDB `_id` and formatted `id`
    const companyId = company?._id || company?.id;
    const companyName = company?.name || company?.companyName || "";
    const companyLogo = company?.logo || company?.companyLogo || "";

    const isLimitReached = company?.activeJobs >= company?.jobLimit;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // 2. Build job object with fallback values
        const jobData = {
            ...formData,
            companyId: companyId,
            companyName: companyName,
            companyLogo: companyLogo,
            status: "active",
            createdAt: new Date().toISOString(),
        };

        try {
            const res = await createJob(jobData);

            if (res?.insertedId) {
                toast.success("Congratulations! Job Posted Successfully!");
                router.push('/dashboard/recruiter/jobs'); // 3. Programmatic client navigation
            } else {
                toast.error("Ahh! Job Post Failed! Try Again Later.");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Failed to post job:", error);
            toast.error("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F0F10] text-[#E4E4E7] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl bg-[#18181B] border border-[#27272A] rounded-xl shadow-lg overflow-hidden p-8 shadow-blue-600 mb-4">

                {/* Header */}
                <div className="flex justify-between items-start border-b border-[#27272A] pb-6 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Post a New Job</h1>
                        <p className="text-sm text-[#A1A1AA] mt-1">
                            Provide the details below to publish your opening on HireLoop.
                        </p>
                    </div>
                    <button
                        type="button"
                        aria-label="Close"
                        className="text-[#A1A1AA] hover:text-white transition-colors duration-150">
                        <Xmark className="w-5 h-5" />
                    </button>
                </div>

                {/* Company Active Plan Status Check banner */}
                <div className="mb-8 p-4 bg-[#202024] rounded-lg border border-[#2F2F33] flex justify-between items-center text-sm">
                    <div>
                        <span className="text-[#A1A1AA]">Recruiter Company: </span>
                        <span className="font-semibold text-white">{companyName}</span>
                        {company?.plan && (
                            <span className="ml-2 text-xs bg-[#2E2E33] px-2.5 py-0.5 rounded-full text-zinc-300">
                                {company.plan} Plan
                            </span>
                        )}
                    </div>
                    <div className="text-right">
                        <span className="text-[#A1A1AA]">Active Usage: </span>
                        <span className={`${isLimitReached ? "text-red-400 font-bold" : "text-emerald-400"}`}>
                            {company?.activeJobs || 0} / {company?.jobLimit || 0} jobs
                        </span>
                    </div>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1: Job Info */}
                    <Fieldset className="space-y-6">
                        <Fieldset.Legend className="text-lg font-medium text-white border-b border-[#27272A]/50 pb-2 w-full">
                            Job Information
                        </Fieldset.Legend>

                        <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Job Title */}
                            <TextField isRequired className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
                                <Label className="text-xs font-semibold text-[#A1A1AA] tracking-wider uppercase">Job Title</Label>
                                <Input
                                    aria-label="Job Title"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    placeholder="e.g. Senior Software Engineer"
                                    className="bg-[#202024] border border-[#2F2F33] text-white rounded-lg px-3.5 py-2.5 focus:border-[#4B5563] outline-none placeholder-[#52525B] transition duration-200"
                                />
                                <FieldError className="text-xs text-red-500 mt-1" />
                            </TextField>

                            {/* Job Category Select */}
                            <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
                                <span className="text-xs font-semibold text-[#A1A1AA] tracking-wider uppercase">Job Category</span>
                                <Select
                                    aria-label="Job Category"
                                    placeholder="Select a category"
                                    selectedKey={formData.jobCategory}
                                    onSelectionChange={(key) => handleSelectChange("jobCategory", key)}
                                    className="bg-[#202024] border border-[#2F2F33] text-white rounded-lg focus:border-[#4B5563]"
                                >
                                    <Select.Trigger className="w-full flex justify-between items-center px-3.5 py-2.5 text-left text-sm text-white">
                                        <Select.Value />
                                        <Select.Indicator>
                                            <ChevronDown className="w-4 h-4 text-[#A1A1AA]" />
                                        </Select.Indicator>
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#18181B] border border-[#27272A] rounded-lg shadow-xl p-1 text-white">
                                        <ListBox>
                                            <ListBox.Item id="Technology" textValue="Technology" className="p-2 hover:bg-[#27272A] rounded cursor-pointer text-sm">Technology</ListBox.Item>
                                            <ListBox.Item id="Design" textValue="Design" className="p-2 hover:bg-[#27272A] rounded cursor-pointer text-sm">Design</ListBox.Item>
                                            <ListBox.Item id="Marketing" textValue="Marketing" className="p-2 hover:bg-[#27272A] rounded cursor-pointer text-sm">Marketing</ListBox.Item>
                                            <ListBox.Item id="Sales" textValue="Sales" className="p-2 hover:bg-[#27272A] rounded cursor-pointer text-sm">Sales</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            {/* Job Type Select */}
                            <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
                                <span className="text-xs font-semibold text-[#A1A1AA] tracking-wider uppercase">Job Type</span>
                                <Select
                                    aria-label="Job Type"
                                    placeholder="Select job type"
                                    selectedKey={formData.jobType}
                                    onSelectionChange={(key) => handleSelectChange("jobType", key)}
                                    className="bg-[#202024] border border-[#2F2F33] text-white rounded-lg focus:border-[#4B5563]"
                                >
                                    <Select.Trigger className="w-full flex justify-between items-center px-3.5 py-2.5 text-left text-sm text-white">
                                        <Select.Value />
                                        <Select.Indicator>
                                            <ChevronDown className="w-4 h-4 text-[#A1A1AA]" />
                                        </Select.Indicator>
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#18181B] border border-[#27272A] rounded-lg shadow-xl p-1 text-white">
                                        <ListBox>
                                            <ListBox.Item id="Full-time" textValue="Full-time" className="p-2 hover:bg-[#27272A] rounded cursor-pointer text-sm">Full-time</ListBox.Item>
                                            <ListBox.Item id="Part-time" textValue="Part-time" className="p-2 hover:bg-[#27272A] rounded cursor-pointer text-sm">Part-time</ListBox.Item>
                                            <ListBox.Item id="Contract" textValue="Contract" className="p-2 hover:bg-[#27272A] rounded cursor-pointer text-sm">Contract</ListBox.Item>
                                            <ListBox.Item id="Internship" textValue="Internship" className="p-2 hover:bg-[#27272A] rounded cursor-pointer text-sm">Internship</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            {/* Deadline Picker */}
                            <TextField isRequired className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
                                <Label className="text-xs font-semibold text-[#A1A1AA] tracking-wider uppercase">Application Deadline</Label>
                                <Input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="bg-[#202024] border border-[#2F2F33] text-white rounded-lg px-3.5 py-2.5 focus:border-[#4B5563] outline-none transition duration-200 scheme-dark"
                                />
                                <FieldError className="text-xs text-red-500 mt-1" />
                            </TextField>

                            {/* Salary Group */}
                            <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-5">
                                <TextField className="flex flex-col gap-1.5">
                                    <Label className="text-xs font-semibold text-[#A1A1AA] tracking-wider uppercase">Min Salary</Label>
                                    <Input
                                        type="number"
                                        name="minSalary"
                                        value={formData.minSalary}
                                        onChange={handleChange}
                                        placeholder="e.g. 50000"
                                        className="bg-[#202024] border border-[#2F2F33] text-white rounded-lg px-3.5 py-2.5 focus:border-[#4B5563] outline-none placeholder-[#52525B] transition duration-200"
                                    />
                                </TextField>

                                <TextField className="flex flex-col gap-1.5">
                                    <Label className="text-xs font-semibold text-[#A1A1AA] tracking-wider uppercase">Max Salary</Label>
                                    <Input
                                        type="number"
                                        name="maxSalary"
                                        value={formData.maxSalary}
                                        onChange={handleChange}
                                        placeholder="e.g. 80000"
                                        className="bg-[#202024] border border-[#2F2F33] text-white rounded-lg px-3.5 py-2.5 focus:border-[#4B5563] outline-none placeholder-[#52525B] transition duration-200"
                                    />
                                </TextField>

                                <div className="flex flex-col gap-1.5">
                                    <span className="text-xs font-semibold text-[#A1A1AA] tracking-wider uppercase">Currency</span>
                                    <Select
                                        aria-label="Currency"
                                        selectedKey={formData.currency}
                                        onSelectionChange={(key) => handleSelectChange("currency", key)}
                                        className="bg-[#202024] border border-[#2F2F33] text-white rounded-lg focus:border-[#4B5563]"
                                    >
                                        <Select.Trigger className="w-full flex justify-between items-center px-3.5 py-2.5 text-left text-sm text-white">
                                            <Select.Value />
                                            <Select.Indicator>
                                                <ChevronDown className="w-4 h-4 text-[#A1A1AA]" />
                                            </Select.Indicator>
                                        </Select.Trigger>
                                        <Select.Popover className="bg-[#18181B] border border-[#27272A] rounded-lg shadow-xl p-1 text-white">
                                            <ListBox>
                                                <ListBox.Item id="USD" textValue="USD ( $ )" className="p-2 hover:bg-[#27272A] rounded cursor-pointer text-sm">USD ($)</ListBox.Item>
                                                <ListBox.Item id="EUR" textValue="EUR ( € )" className="p-2 hover:bg-[#27272A] rounded cursor-pointer text-sm">EUR (€)</ListBox.Item>
                                                <ListBox.Item id="GBP" textValue="GBP ( £ )" className="p-2 hover:bg-[#27272A] rounded cursor-pointer text-sm">GBP (£)</ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>
                            </div>

                            {/* Location / Remote Group */}
                            <div className="col-span-2 flex flex-col md:flex-row gap-5 items-end">
                                <TextField className="flex-1 flex flex-col gap-1.5 w-full" isDisabled={formData.isRemote}>
                                    <Label className="text-xs font-semibold text-[#A1A1AA] tracking-wider uppercase">Location</Label>
                                    <Input
                                        name="location"
                                        value={formData.isRemote ? "" : formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. San Francisco, CA"
                                        className="bg-[#202024] border border-[#2F2F33] text-white rounded-lg px-3.5 py-2.5 focus:border-[#4B5563] outline-none placeholder-[#52525B] transition duration-200 disabled:opacity-50"
                                    />
                                </TextField>

                                <label className="flex items-center gap-3 cursor-pointer select-none h-11.5">
                                    <input
                                        type="checkbox"
                                        name="isRemote"
                                        checked={formData.isRemote}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="relative w-11 h-6 bg-[#2F2F33] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFFFFF]"></div>
                                    <span className="text-sm font-medium text-[#E4E4E7] flex items-center gap-1.5">
                                        <Globe className="w-4 h-4 text-[#A1A1AA]" /> Fully Remote
                                    </span>
                                </label>
                            </div>
                        </Fieldset.Group>
                    </Fieldset>

                    {/* Section 2: Job Description details */}
                    <Fieldset className="space-y-6 pt-4">
                        <Fieldset.Legend className="text-lg font-medium text-white border-b border-[#27272A]/50 pb-2 w-full">
                            Job Description
                        </Fieldset.Legend>

                        <Fieldset.Group className="space-y-5">
                            {/* Responsibilities */}
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-xs font-semibold text-[#A1A1AA] tracking-wider uppercase">Responsibilities</Label>
                                <TextArea
                                    aria-label="Responsibilities"
                                    name="responsibilities"
                                    value={formData.responsibilities}
                                    onChange={handleChange}
                                    placeholder="List the day-to-day responsibilities..."
                                    rows={4}
                                    className="bg-[#202024] border border-[#2F2F33] text-white rounded-lg p-3.5 focus:border-[#4B5563] outline-none placeholder-[#52525B] transition duration-200 w-full resize-y min-h-25"
                                />
                            </div>

                            {/* Requirements */}
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-xs font-semibold text-[#A1A1AA] tracking-wider uppercase">Requirements</Label>
                                <TextArea
                                    aria-label="Requirements"
                                    name="requirements"
                                    value={formData.requirements}
                                    onChange={handleChange}
                                    placeholder="List the required skills, experience, and certifications..."
                                    rows={4}
                                    className="bg-[#202024] border border-[#2F2F33] text-white rounded-lg p-3.5 focus:border-[#4B5563] outline-none placeholder-[#52525B] transition duration-200 w-full resize-y min-h-25"
                                />
                            </div>

                            {/* Benefits */}
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-xs font-semibold text-[#A1A1AA] tracking-wider uppercase">Benefits (Optional)</Label>
                                <TextArea
                                    aria-label="Benefits"
                                    name="benefits"
                                    value={formData.benefits}
                                    onChange={handleChange}
                                    placeholder="Health insurance, PTO, equity options, etc..."
                                    rows={3}
                                    className="bg-[#202024] border border-[#2F2F33] text-white rounded-lg p-3.5 focus:border-[#4B5563] outline-none placeholder-[#52525B] transition duration-200 w-full resize-y min-h-20"
                                />
                            </div>
                        </Fieldset.Group>
                    </Fieldset>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-[#27272A] mt-8">
                        <Button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-2.5 rounded-lg border border-[#27272A] text-white font-medium text-sm hover:bg-[#202024] transition duration-150"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-sm transition duration-150 shadow-md disabled:opacity-50"
                        >
                            {isSubmitting ? "Posting..." : "Register Job"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}