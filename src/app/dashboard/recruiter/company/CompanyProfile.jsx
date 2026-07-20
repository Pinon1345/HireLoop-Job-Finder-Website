"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Added to refresh server-side state

// GravityUI Icons
import { Xmark, ChevronDown, Pin, ArrowUpToLine, ArrowRight, Pencil, Plus } from "@gravity-ui/icons";

// HeroUI Components
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    Select,
    ListBox,
    Button
} from "@heroui/react";
import Image from "next/image";
import { createCompany } from "@/lib/action/companies";
import toast from "react-hot-toast";

const CompanyProfile = ({ onClose, recruiter, recruiterCompany }) => {
    const router = useRouter();

    const emptyCompanyData = {
        companyName: "",
        industry: "Technology",
        websiteUrl: "",
        location: "",
        employeeRange: "1-10 employees",
        logoUrl: "",
        description: "",
        status: "Pending",
        recruiterId: recruiter?.id || recruiter?._id,
    };

    // 1. FIX: Initialize view state based on whether recruiterCompany exists
    const [view, setView] = useState(recruiterCompany ? "preview" : "card");

    // 2. FIX: Initialize formData with existing company data if available
    const [formData, setFormData] = useState(recruiterCompany || emptyCompanyData);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploadingLogo, setIsUploadingLogo] = useState(false);

    // Sync state if server component passes updated recruiterCompany
    // 1. Add state to track the incoming prop
    const [prevRecruiterCompany, setPrevRecruiterCompany] = useState(recruiterCompany);

    // 2. Sync state directly during render (No useEffect needed!)
    if (recruiterCompany !== prevRecruiterCompany) {
        setPrevRecruiterCompany(recruiterCompany);
        if (recruiterCompany) {
            setFormData(recruiterCompany);
            setView("preview");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploadingLogo(true);

        const imgbbApiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
        const uploadData = new FormData();
        uploadData.append("image", file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                method: "POST",
                body: uploadData,
            });
            const result = await response.json();
            if (result.success) {
                setFormData((prev) => ({ ...prev, logoUrl: result.data.url }));
            } else {
                console.error("ImgBB Upload Failed:", result.error?.message);
                toast.error("Failed to upload image.");
            }
        } catch (error) {
            console.error("Error connecting to ImgBB:", error);
            toast.error("An error occurred during image upload.");
        } finally {
            setIsUploadingLogo(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payLoad = await createCompany({
                ...formData,
                recruiterId: recruiter?.id || recruiter?._id // Ensure recruiterId is present
            });

            if (payLoad?.insertedId || payLoad?.acknowledged) {
                toast.success("Company Profile Saved Successfully!");
                setView("preview");
                router.refresh(); // 3. FIX: Instruct Next.js to re-fetch Server Component data on refresh
            } else {
                toast.error("Failed to save company profile.");
            }
        } catch (error) {
            console.error("Failed to save to database:", error);
            toast.error("An error occurred while saving.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancelClose = () => {
        if (onClose) {
            onClose();
        } else {
            setView(recruiterCompany ? "preview" : "card");
        }
    };

    // Card View
    if (view === "card") {
        return (
            <div className="flex justify-center items-center flex-col mt-12 pb-4">
                <button
                    onClick={() => setView("form")}
                    type="button"
                    className="group w-full max-w-250 bg-[#121212] border border-[#1F1F1F] rounded-xl p-8 text-left transition duration-200 hover:border-zinc-700 shadow-lg shadow-blue-600/30 flex justify-between items-center"
                >
                    <div>
                        <h3 className="text-2xl font-semibold text-zinc-100 tracking-tight">Set up your business profile</h3>
                        <p className="text-zinc-500 mt-1.5 text-base">Click to configure your workspace parameters and finalize company details.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white group-hover:bg-zinc-200 text-black font-semibold text-sm px-5 py-3 rounded-lg transition duration-150 shadow-md">
                        <span>Register Company</span>
                        <ArrowRight className="w-4 h-4 mt-1 transition-transform group-hover:translate-x-1" />
                    </div>
                </button>
            </div>
        );
    }

    // Preview View
    if (view === "preview") {
        return (
            <div className="flex justify-center items-center flex-col mt-8 pb-4 space-y-6">
                <div className="w-full max-w-250 bg-[#121212] border border-[#1F1F1F] rounded-xl p-8 font-sans shadow-lg shadow-blue-600 mb-2">
                    <div className="flex justify-between items-start w-full">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#1A1A1A] border border-[#272727] rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                                {formData.logoUrl ? (
                                    <Image src={formData.logoUrl} alt="Logo" width={64} height={64} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-zinc-600 font-bold text-xl">{formData.companyName?.charAt(0) || "C"}</span>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight">
                                        {formData.companyName || "My Company"}
                                    </h2>
                                    <span className="bg-[#FFA500]/10 text-[#FFA500] border border-[#FFA500]/20 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide">
                                        {formData.status || "Pending"}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-500 mt-1">
                                    {formData.websiteUrl ? `https://${formData.websiteUrl.replace(/^https?:\/\//, '')}` : "no-website.com"}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setView("form")}
                            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 text-sm font-medium transition py-1.5 px-3 rounded-md hover:bg-[#1A1A1A]"
                        >
                            <Pencil className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                        <div className="bg-[#1A1A1A] border border-[#272727] rounded-lg p-4">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Industry Category</span>
                            <span className="text-base font-medium text-zinc-200">{formData.industry}</span>
                        </div>
                        <div className="bg-[#1A1A1A] border border-[#272727] rounded-lg p-4">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Location</span>
                            <span className="text-base font-medium text-zinc-200">{formData.location || "Not Provided"}</span>
                        </div>
                        <div className="bg-[#1A1A1A] border border-[#272727] rounded-lg p-4">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Company Scale</span>
                            <span className="text-base font-medium text-zinc-200">{formData.employeeRange}</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">About Our Vision & Culture</span>
                        <div className="bg-[#1A1A1A] border border-[#272727] rounded-lg p-4 min-h-22.5">
                            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                {formData.description || "No description provided."}
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => {
                        setFormData(emptyCompanyData);
                        setView("form");
                    }}
                    type="button"
                    className="w-full max-w-250 bg-[#121212] border-2 border-dashed border-[#1F1F1F] hover:border-zinc-700 rounded-xl p-6 flex items-center justify-center transition group duration-150 shadow-md mb-10"
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-[#1A1A1A] group-hover:bg-zinc-800 flex items-center justify-center transition border border-[#272727]">
                            <Plus className="w-6 h-6 text-zinc-400 group-hover:text-zinc-200" />
                        </div>
                        <span className="text-xs font-semibold text-zinc-500 group-hover:text-zinc-300 tracking-wide mt-1">
                            Register Another Company
                        </span>
                    </div>
                </button>
            </div>
        );
    }

    // Form View
    return (
        <div className="flex justify-center items-center flex-col mt-8 pb-4">
            <div className="w-full max-w-250 bg-[#121212] border border-[#1F1F1F] rounded-xl overflow-hidden font-sans mt-4 shadow-lg shadow-blue-600 mb-10">
                <div className="flex justify-between items-start px-6 pt-6 pb-5 border-b border-[#1F1F1F]">
                    <div>
                        <h2 className="text-3xl pt-2 font-semibold text-zinc-100 tracking-tight">Register New Company</h2>
                        <p className="text-lg pb-2 text-zinc-500 mt-1">Enter your business details to start hiring on HireLoop.</p>
                    </div>
                    <button onClick={handleCancelClose} type="button" className="text-zinc-500 hover:text-zinc-200 transition-colors p-1">
                        <Xmark className="w-5 h-5" />
                    </button>
                </div>

                <Form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <Fieldset className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-[#A1A1AA]">Company Name</Label>
                            <TextField>
                                <Input
                                    aria-label="Company Name"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="e.g. Acme Corp"
                                    className="w-full bg-[#1A1A1A] border border-[#272727] text-zinc-200 text-sm rounded-lg px-3.5 py-2.5 focus:border-zinc-500 outline-none placeholder-zinc-600 transition"
                                    required
                                />
                            </TextField>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-[#A1A1AA]">Industry / Category</Label>
                            <Select
                                aria-label="Industry/Category"
                                selectedKey={formData.industry}
                                onSelectionChange={(val) => handleSelectChange("industry", val)}
                                className="bg-[#1A1A1A] border border-[#272727] text-zinc-200 text-sm rounded-lg focus:border-zinc-500 outline-none transition"
                            >
                                <Select.Trigger className="w-full flex justify-between items-center px-3.5 py-2.5 text-left text-sm text-zinc-300">
                                    <Select.Value />
                                    <Select.Indicator>
                                        <ChevronDown className="w-4 h-4 text-zinc-500" />
                                    </Select.Indicator>
                                </Select.Trigger>
                                <Select.Popover className="bg-[#1A1A1A] border border-[#272727] rounded-lg p-1 text-zinc-300 shadow-xl">
                                    <ListBox>
                                        <ListBox.Item id="Technology" textValue="Technology" className="p-2 hover:bg-[#272727] rounded cursor-pointer text-sm">Technology</ListBox.Item>
                                        <ListBox.Item id="Design" textValue="Design" className="p-2 hover:bg-[#272727] rounded cursor-pointer text-sm">Design</ListBox.Item>
                                        <ListBox.Item id="Finance" textValue="Finance" className="p-2 hover:bg-[#272727] rounded cursor-pointer text-sm">Finance</ListBox.Item>
                                        <ListBox.Item id="Marketing" textValue="Marketing" className="p-2 hover:bg-[#272727] rounded cursor-pointer text-sm">Marketing</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-[#A1A1AA]">Website URL</Label>
                            <div className="flex rounded-lg overflow-hidden border border-[#272727] focus-within:border-zinc-500 transition">
                                <span className="bg-[#222] text-zinc-500 text-xs px-3 flex items-center justify-center select-none border-r border-[#272727]">https://</span>
                                <TextField className="flex-1">
                                    <Input
                                        aria-label="Website URL"
                                        name="websiteUrl"
                                        value={formData.websiteUrl}
                                        onChange={handleChange}
                                        placeholder="www.company.com"
                                        className="w-full bg-[#1A1A1A] text-zinc-200 text-sm px-3 py-2.5 outline-none placeholder-zinc-600"
                                        required
                                    />
                                </TextField>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-[#A1A1AA]">Location</Label>
                            <div className="relative flex items-center bg-[#1A1A1A] border border-[#272727] rounded-lg focus-within:border-zinc-500 transition px-3">
                                <Pin className="w-4 h-4 text-zinc-500 mr-2" />
                                <TextField className="w-full">
                                    <Input
                                        aria-label="Location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="City, Country"
                                        className="w-full bg-transparent text-zinc-200 text-sm py-2.5 outline-none placeholder-zinc-600"
                                        required
                                    />
                                </TextField>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-[#A1A1AA]">Employee Count Range</Label>
                            <Select
                                aria-label="Employee Count Range"
                                selectedKey={formData.employeeRange}
                                onSelectionChange={(val) => handleSelectChange("employeeRange", val)}
                                className="bg-[#1A1A1A] border border-[#272727] text-zinc-200 text-sm rounded-lg focus:border-zinc-500 outline-none transition"
                            >
                                <Select.Trigger className="w-full flex justify-between items-center px-3.5 py-2.5 text-left text-sm text-zinc-300">
                                    <Select.Value />
                                    <Select.Indicator>
                                        <ChevronDown className="w-4 h-4 text-zinc-500" />
                                    </Select.Indicator>
                                </Select.Trigger>
                                <Select.Popover className="bg-[#1A1A1A] border border-[#272727] rounded-lg p-1 text-zinc-300 shadow-xl">
                                    <ListBox>
                                        <ListBox.Item id="1-10 employees" textValue="1-10 employees" className="p-2 hover:bg-[#272727] rounded cursor-pointer text-sm">1-10 employees</ListBox.Item>
                                        <ListBox.Item id="11-50 employees" textValue="11-50 employees" className="p-2 hover:bg-[#272727] rounded cursor-pointer text-sm">11-50 employees</ListBox.Item>
                                        <ListBox.Item id="51-200 employees" textValue="51-200 employees" className="p-2 hover:bg-[#272727] rounded cursor-pointer text-sm">51-200 employees</ListBox.Item>
                                        <ListBox.Item id="201-500 employees" textValue="201-500 employees" className="p-2 hover:bg-[#272727] rounded cursor-pointer text-sm">201-500 employees</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-[#A1A1AA]">Company Logo</Label>
                            <label className="flex items-center gap-4 bg-[#1A1A1A] border border-dashed border-[#272727] rounded-lg p-3 cursor-pointer hover:border-zinc-500 transition">
                                <div className="w-10 h-10 bg-[#272727] hover:bg-zinc-700 rounded-lg flex items-center justify-center transition overflow-hidden">
                                    {isUploadingLogo ? (
                                        <span className="text-[10px] text-zinc-400 animate-pulse text-center">...</span>
                                    ) : formData.logoUrl ? (
                                        <Image src={formData.logoUrl} alt="Logo Preview" width={40} height={40} className="w-full h-full object-cover" />
                                    ) : (
                                        <ArrowUpToLine className="w-4 h-4 text-zinc-300" />
                                    )}
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-sm font-medium text-zinc-200">
                                        {isUploadingLogo ? "Uploading..." : formData.logoUrl ? "Image uploaded" : "Upload image"}
                                    </span>
                                    <span className="text-[10px] text-zinc-500">PNG, JPG up to 5MB</span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleLogoUpload}
                                    className="hidden"
                                    disabled={isUploadingLogo}
                                />
                            </label>
                        </div>

                        <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5 mt-1">
                            <Label className="text-xs font-semibold text-[#A1A1AA]">Brief Description</Label>
                            <TextArea
                                aria-label="Brief Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Tell us about your company's mission and culture..."
                                rows={4}
                                className="w-full bg-[#1A1A1A] border border-[#272727] text-zinc-200 text-sm rounded-lg p-3.5 focus:border-zinc-500 outline-none placeholder-zinc-600 transition resize-none"
                                required
                            />
                        </div>
                    </Fieldset>

                    <div className="flex justify-end gap-3 pt-6 border-t border-[#1F1F1F] mt-8 mb-4">
                        <Button
                            type="button"
                            onClick={handleCancelClose}
                            className="px-6 py-2.5 rounded-lg border border-[#242424] text-zinc-300 font-medium text-sm hover:bg-[#1E1E1E] transition duration-150"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || isUploadingLogo}
                            className="px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-sm transition duration-150 shadow-md disabled:opacity-50"
                        >
                            {isSubmitting ? "Registering..." : "Register Company"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default CompanyProfile;