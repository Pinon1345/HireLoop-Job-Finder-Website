'use client';

import React from 'react';
import { Table, Avatar, Button } from '@heroui/react';
import {
    FiFilter,
    FiPlus,
    FiClock,
    FiCheckCircle,
    FiSlash,
    FiChevronLeft,
    FiChevronRight
} from 'react-icons/fi';
import { updateCompany } from '@/lib/action/companies';
import toast from 'react-hot-toast';

const CompanyTable = ({ companies = [] }) => {

    // Action Event Handlers

    const handleApproval = async (id) => {
        const result = await updateCompany(id, { status: 'Approved' })
        if (result.modifiedCount) {
            toast.success("Congratulations! Successfully Approved This Company!")
        }
        // console.log("Approved company:", id, result);
    };

    const handleRejected = async (id) => {
        const result = await updateCompany(id, { status: 'Rejected' })
        if (result.modifiedCount) {
            toast.error("This Company Is Rejected By Admin!")
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };

    const pendingCount = companies.filter((c) => c.status?.toLowerCase() === 'pending').length;
    const approvedCount = companies.filter((c) => c.status?.toLowerCase() === 'approved').length;
    const rejectedCount = companies.filter((c) => c.status?.toLowerCase() === 'rejected').length;

    const getStatusBadge = (status) => {
        const s = status?.toLowerCase();
        if (s === 'pending') {
            return (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Pending
                </span>
            );
        }
        if (s === 'approved') {
            return (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Approved
                </span>
            );
        }
        if (s === 'rejected') {
            return (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    Rejected
                </span>
            );
        }
        return status;
    };

    return (
        <div className="w-full space-y-6 text-zinc-100 p-6 bg-neutral-950 rounded-xl">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Company Registrations</h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        Review and manage corporate entity access requests for the ecosystem.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition">
                        <FiFilter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-900 bg-white rounded-lg hover:bg-zinc-200 transition">
                        <FiPlus className="w-4 h-4" />
                        Register New
                    </button>
                </div>
            </div>

            {/* HeroUI Table Container */}
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl overflow-hidden">
                <Table className="w-full text-left">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Company Registrations Table">
                            <Table.Header className="bg-zinc-900/80 border-b border-zinc-800">
                                <Table.Column isRowHeader className="py-3.5 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                    Company Name
                                </Table.Column>
                                <Table.Column className="py-3.5 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                    Recruiter ID
                                </Table.Column>
                                <Table.Column className="py-3.5 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                    Industry
                                </Table.Column>
                                <Table.Column className="py-3.5 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                    Available Jobs
                                </Table.Column>
                                <Table.Column className="py-3.5 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                    Status
                                </Table.Column>
                                <Table.Column className="py-3.5 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                    Date Submitted
                                </Table.Column>
                                <Table.Column className="py-3.5 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">
                                    Actions
                                </Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {companies.map((company) => {
                                    const id = company._id?.$oid || company._id;
                                    const date = company.updatedAt?.$date || company.updatedAt;

                                    return (
                                        <Table.Row key={id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition">
                                            <Table.Cell className="py-3.5 px-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        src={company?.logoUrl}
                                                        name={company?.companyName}
                                                        className="w-8 h-8 rounded-lg bg-zinc-800 text-xs text-zinc-300 border border-zinc-700"
                                                    />
                                                    <span className="font-medium text-sm text-zinc-200">
                                                        {company?.companyName}
                                                    </span>
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell className="py-3.5 px-4 text-sm text-zinc-400">
                                                {company.recruiterId || 'N/A'}
                                            </Table.Cell>

                                            <Table.Cell className="py-3.5 px-4">
                                                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                                                    {company?.industry || 'N/A'}
                                                </span>
                                            </Table.Cell>

                                            <Table.Cell className="py-3.5 px-4">
                                                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                                                    {company?.jobCount || '0'}
                                                </span>
                                            </Table.Cell>

                                            <Table.Cell className="py-3.5 px-4">
                                                {getStatusBadge(company?.status)}
                                            </Table.Cell>

                                            <Table.Cell className="py-3.5 px-4 text-sm text-zinc-400">
                                                {formatDate(date)}
                                            </Table.Cell>

                                            <Table.Cell className="py-3.5 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {company.status?.toLowerCase() !== 'approved' && (
                                                        <Button
                                                            size="sm"
                                                            onPress={() => handleApproval(id)}
                                                            className="cursor-pointer px-3 py-1.5 text-xs font-medium text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-md hover:bg-emerald-500/20 transition h-auto min-w-0"
                                                        >
                                                            Approve
                                                        </Button>
                                                    )}
                                                    {company.status?.toLowerCase() !== 'rejected' && (
                                                        <Button
                                                            size="sm"
                                                            onPress={() => handleRejected(id)}
                                                            className="cursor-pointer px-3 py-1.5 text-xs font-medium text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-md hover:bg-rose-500/20 transition h-auto min-w-0"
                                                        >
                                                            Reject
                                                        </Button>
                                                    )}
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>

                    <Table.Footer>
                        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/40 border-t border-zinc-800 text-xs text-zinc-400">
                            <div>
                                Showing <span className="font-semibold text-zinc-200">1-{companies?.length}</span> of{' '}
                                <span className="font-semibold text-zinc-200">{companies?.length}</span> companies
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="p-1.5 rounded-md hover:bg-zinc-800 disabled:opacity-50 text-zinc-400">
                                    <FiChevronLeft className="w-4 h-4" />
                                </button>
                                <button className="w-7 h-7 rounded-md bg-white text-zinc-900 font-semibold text-xs flex items-center justify-center">
                                    1
                                </button>
                                <button className="w-7 h-7 rounded-md hover:bg-zinc-800 text-zinc-400 font-medium text-xs flex items-center justify-center">
                                    2
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400">
                                    <FiChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </Table.Footer>
                </Table>
            </div>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                            <FiClock className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-emerald-400">+12% vs last week</span>
                    </div>
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            Pending Review
                        </span>
                        <div className="text-3xl font-bold text-white mt-1">{pendingCount}</div>
                    </div>
                </div>

                <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                            <FiCheckCircle className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-emerald-400">+5% vs last week</span>
                    </div>
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            Approved Partners
                        </span>
                        <div className="text-3xl font-bold text-white mt-1">{approvedCount}</div>
                    </div>
                </div>

                <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
                            <FiSlash className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-zinc-400">Stable</span>
                    </div>
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            Total Rejections
                        </span>
                        <div className="text-3xl font-bold text-white mt-1">{rejectedCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyTable;