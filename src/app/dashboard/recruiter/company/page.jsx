"use client";

import React, { useState } from "react";
// GravityUI Icons
import { Xmark, ChevronDown, Pin, ArrowUpToLine } from "@gravity-ui/icons";
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


const RecruiterCompanyPage = ({ onClose }) => {

    const [formData, setFormData] = useState({
        companyName: "",
        industry: "Technology",
        websiteUrl: "",
        location: "",
        employeeRange: "1-10 employees",
        logo: null,
        description: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, logo: file }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Process form submission
        setTimeout(() => {
            console.log("Submitting Company Data: ", formData);
            setIsSubmitting(false);
            if (onClose) onClose();
        }, 1000);
    };

    return (
        <div className="flex justify-center items-center flex-col mt-6 pb-4">
            <div className="w-full max-w-250 bg-[#121212] border border-[#1F1F1F] rounded-xl overflow-hidden font-sans mt-4 shadow-lg shadow-blue-600 mb-10">

                {/* Header */}
                <div className="flex justify-between items-start px-6 pt-6 pb-5 border-b border-[#1F1F1F]">
                    <div>
                        <h2 className="text-3xl pt-2 font-semibold text-zinc-100 tracking-tight">Register New Company</h2>
                        <p className="text-lg pb-2 text-zinc-500 mt-1">
                            Enter your business details to start hiring on HireLoop.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        type="button"
                        className="text-zinc-500 hover:text-zinc-200 transition-colors p-1"
                    >
                        <Xmark className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Content */}
                <Form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <Fieldset className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                        {/* Company Name */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-[#A1A1AA]">Company Name</Label>
                            <TextField>
                                <Input
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="e.g. Acme Corp"
                                    className="w-full bg-[#1A1A1A] border border-[#272727] text-zinc-200 text-sm rounded-lg px-3.5 py-2.5 focus:border-zinc-500 outline-none placeholder-zinc-600 transition"
                                    required
                                />
                            </TextField>
                        </div>

                        {/* Industry / Category */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-[#A1A1AA]">Industry / Category</Label>
                            <Select
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

                        {/* Website URL */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-[#A1A1AA]">Website URL</Label>
                            <div className="flex rounded-lg overflow-hidden border border-[#272727] focus-within:border-zinc-500 transition">
                                <span className="bg-[#222] text-zinc-500 text-xs px-3 flex items-center justify-center select-none border-r border-[#272727]">
                                    https://
                                </span>
                                <TextField className="flex-1">
                                    <Input
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

                        {/* Location */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-[#A1A1AA]">Location</Label>
                            <div className="relative flex items-center bg-[#1A1A1A] border border-[#272727] rounded-lg focus-within:border-zinc-500 transition px-3">
                                <Pin className="w-4 h-4 text-zinc-500 mr-2" />
                                <TextField className="w-full">
                                    <Input
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

                        {/* Employee Count Range */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-[#A1A1AA]">Employee Count Range</Label>
                            <Select
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

                        {/* Company Logo Upload */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-[#A1A1AA]">Company Logo</Label>
                            <label className="flex items-center gap-4 bg-[#1A1A1A] border border-dashed border-[#272727] rounded-lg p-3 cursor-pointer hover:border-zinc-500 transition">
                                <div className="w-10 h-10 bg-[#272727] hover:bg-zinc-700 rounded-lg flex items-center justify-center transition">
                                    <ArrowUpToLine className="w-4 h-4 text-zinc-300" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-sm font-medium text-zinc-200">Upload image</span>
                                    <span className="text-[10px] text-zinc-500">PNG, JPG up to 5MB</span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleLogoUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Brief Description */}
                        <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5 mt-1">
                            <Label className="text-xs font-semibold text-[#A1A1AA]">Brief Description</Label>
                            <TextArea
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

                    {/* Footer actions */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-[#1F1F1F] mt-8 mb-4">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-lg border border-[#242424] text-zinc-300 font-medium text-sm hover:bg-[#1E1E1E] transition duration-150"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
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

export default RecruiterCompanyPage;