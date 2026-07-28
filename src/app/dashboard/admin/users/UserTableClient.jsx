'use client';

import React, { useState } from 'react';
import { Table, Avatar, Button, Modal } from '@heroui/react';
import {
    FiChevronDown,
    FiDownload,
    FiUser,
    FiBriefcase,
    FiChevronLeft,
    FiChevronRight,
    FiAlertCircle
} from 'react-icons/fi';
import { updateUserRole } from '@/lib/action/users';

const UserTableClient = ({ users: initialUsers = [] }) => {
    // 1. Maintain local state initialized from props
    const [usersList, setUsersList] = useState(initialUsers);
    const [selectedRole, setSelectedRole] = useState('All');

    // Modal state management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingRoleChange, setPendingRoleChange] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Stats Calculations
    const activeCount = usersList.filter((u) => u.status?.toLowerCase() === 'active').length;
    const recruiterCount = usersList.filter((u) => u.role?.toLowerCase() === 'recruiter').length;
    const suspendedCount = usersList.filter((u) => u.status?.toLowerCase() === 'suspended').length;

    // Filtered Users List
    const filteredUsers = usersList.filter((user) => {
        if (selectedRole === 'All') return true;
        return user.userRole?.toLowerCase() === selectedRole.toLowerCase();
    });

    // 1. Triggered when clicking "Make Seeker / Make Recruiter"
    const openRoleChangeModal = (user) => {
        const userId = user._id?.$oid || user._id || user.id;
        const currentRole = user.userRole;
        const targetRole = currentRole?.toLowerCase() === 'seeker' ? 'Recruiter' : 'Seeker';

        setPendingRoleChange({
            id: userId,
            name: user.name,
            currentRole,
            targetRole
        });
        setIsModalOpen(true);
    };

    // 2. Confirmed action inside Modal
    const confirmRoleChange = async () => {
        if (!pendingRoleChange) return;

        const { id, targetRole } = pendingRoleChange;

        try {
            setIsUpdating(true);
            // Send the NEW role to Server Action
            const data = await updateUserRole(id, targetRole);
            console.log("Successfully updated role:", data);

            // Optimistically update local state
            setUsersList((prevUsers) =>
                prevUsers.map((user) => {
                    const userId = user._id?.$oid || user._id || user.id;
                    if (userId === id) {
                        return { ...user, role: targetRole };
                    }
                    return user;
                })
            );

            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to update user role:", error);
        } finally {
            setIsUpdating(false);
            setPendingRoleChange(null);
        }
    };

    // Toggle Status Handler
    const handleStatusChange = (id, currentStatus) => {
        const nextStatus = currentStatus?.toLowerCase() === 'active' ? 'Suspended' : 'Active';

        console.log(`Updating status for user ${id} to ${nextStatus}`);

        setUsersList((prevUsers) =>
            prevUsers.map((user) => {
                const userId = user._id?.$oid || user._id || user.id;
                if (userId === id) {
                    return { ...user, status: nextStatus };
                }
                return user;
            })
        );
    };

    // Delete User Handler
    const handleDeleteUser = (id) => {
        console.log(`Deleting user ${id}`);

        setUsersList((prevUsers) =>
            prevUsers.filter((user) => {
                const userId = user._id?.$oid || user._id || user.id;
                return userId !== id;
            })
        );
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <div className="w-full min-h-screen bg-black text-zinc-100 p-6 space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">User Management</h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        Review, filter, and manage platform access for all users.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="appearance-none bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-medium px-4 py-2 pr-8 rounded-lg cursor-pointer focus:outline-none focus:border-zinc-700"
                        >
                            <option value="All">All Roles</option>
                            <option value="Seeker">Seeker</option>
                            <option value="Recruiter">Recruiter</option>
                        </select>
                        <FiChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <Button
                        size="sm"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-900 bg-white rounded-lg hover:bg-zinc-200 transition min-w-0 h-auto"
                    >
                        <FiDownload className="w-3.5 h-3.5" />
                        Export List
                    </Button>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-2">
                    <p className="text-xs font-medium text-zinc-400">Total Active Users</p>
                    <p className="text-2xl font-bold text-white">{activeCount.toLocaleString()}</p>
                    <p className="text-xs font-medium text-emerald-400">+12% vs last month</p>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-2">
                    <p className="text-xs font-medium text-zinc-400">Recruiter Growth</p>
                    <p className="text-2xl font-bold text-white">{recruiterCount.toLocaleString()}</p>
                    <p className="text-xs font-medium text-emerald-400">High demand</p>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-2">
                    <p className="text-xs font-medium text-zinc-400">Suspended Accounts</p>
                    <p className="text-2xl font-bold text-white">{suspendedCount}</p>
                    <p className="text-xs font-medium text-zinc-400">0.8% of total</p>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-2">
                    <p className="text-xs font-medium text-zinc-400">New Signups (24h)</p>
                    <p className="text-2xl font-bold text-white">42</p>
                    <p className="text-xs font-medium text-amber-500">Steady activity</p>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl overflow-hidden shadow-xl">
                <Table className="w-full text-left">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="User Management Table">
                            <Table.Header className="bg-zinc-900/90 border-b border-zinc-800">
                                <Table.Column isRowHeader className="py-3.5 px-5 text-xs font-semibold text-zinc-400">
                                    User Name
                                </Table.Column>
                                <Table.Column className="py-3.5 px-5 text-xs font-semibold text-zinc-400">
                                    Email Address
                                </Table.Column>
                                <Table.Column className="py-3.5 px-5 text-xs font-semibold text-zinc-400">
                                    Role
                                </Table.Column>
                                <Table.Column className="py-3.5 px-5 text-xs font-semibold text-zinc-400">
                                    Join Date
                                </Table.Column>
                                <Table.Column className="py-3.5 px-5 text-xs font-semibold text-zinc-400">
                                    Status
                                </Table.Column>
                                <Table.Column className="py-3.5 px-5 text-xs font-semibold text-zinc-400 text-right">
                                    Actions
                                </Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {filteredUsers.map((user) => {
                                    const id = user._id?.$oid || user._id || user.id;
                                    const isRecruiter = user.userRole?.toLowerCase() === 'recruiter';
                                    const isActive = user.status?.toLowerCase() === 'active';

                                    return (
                                        <Table.Row key={id} className="border-b border-zinc-800/40 hover:bg-zinc-800/30 transition">
                                            <Table.Cell className="py-3.5 px-5">
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        src={user.avatar || user.image}
                                                        name={user.name}
                                                        className="w-8 h-8 rounded-full bg-zinc-800 text-xs text-zinc-300 font-medium"
                                                    />
                                                    <span className="font-medium text-sm text-zinc-200">{user.name}</span>
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell className="py-3.5 px-5 text-xs text-zinc-400 font-normal">
                                                {user.email}
                                            </Table.Cell>

                                            <Table.Cell className="py-3.5 px-5">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                                                    {isRecruiter ? (
                                                        <FiBriefcase className="w-3 h-3 text-zinc-400" />
                                                    ) : (
                                                        <FiUser className="w-3 h-3 text-zinc-400" />
                                                    )}
                                                    {user.userRole || 'Seeker'}
                                                </span>
                                            </Table.Cell>

                                            <Table.Cell className="py-3.5 px-5 text-xs text-zinc-400">
                                                {formatDate(user.createdAt || user.joinDate || user.updatedAt)}
                                            </Table.Cell>

                                            <Table.Cell className="py-3.5 px-5">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${isActive
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                        }`}
                                                >
                                                    <span
                                                        className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-rose-400'
                                                            }`}
                                                    />
                                                    {user.status || 'Active'}
                                                </span>
                                            </Table.Cell>

                                            {/* Actions */}
                                            <Table.Cell className="py-3.5 px-5 text-right">
                                                <div className="flex items-center justify-end gap-3 text-xs">
                                                    <button
                                                        onClick={() => openRoleChangeModal(user)}
                                                        className="text-zinc-400 hover:text-white font-medium transition"
                                                    >
                                                        {isRecruiter ? 'Make Seeker' : 'Make Recruiter'}
                                                    </button>

                                                    {isActive ? (
                                                        <button
                                                            onClick={() => handleStatusChange(id, user.status)}
                                                            className="text-rose-500 hover:text-rose-400 font-medium transition"
                                                        >
                                                            Suspend
                                                        </button>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleStatusChange(id, user.status)}
                                                                className="text-emerald-400 hover:text-emerald-300 font-medium transition"
                                                            >
                                                                Activate
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteUser(id)}
                                                                className="text-zinc-500 hover:text-rose-500 font-medium transition"
                                                            >
                                                                Delete
                                                            </button>
                                                        </>
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
                        <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900/40 border-t border-zinc-800 text-xs text-zinc-400">
                            <div>
                                Showing <span className="font-semibold text-zinc-200">1 to {filteredUsers.length}</span> of{' '}
                                <span className="font-semibold text-zinc-200">{usersList.length}</span> users
                            </div>
                            <div className="flex items-center gap-1.5">
                                <button className="p-1 rounded hover:bg-zinc-800 text-zinc-400 disabled:opacity-50">
                                    <FiChevronLeft className="w-4 h-4" />
                                </button>
                                <button className="w-6 h-6 rounded bg-white text-zinc-900 font-semibold text-xs flex items-center justify-center">
                                    1
                                </button>
                                <button className="w-6 h-6 rounded hover:bg-zinc-800 text-zinc-400 font-medium text-xs flex items-center justify-center">
                                    2
                                </button>
                                <button className="w-6 h-6 rounded hover:bg-zinc-800 text-zinc-400 font-medium text-xs flex items-center justify-center">
                                    3
                                </button>
                                <span className="text-zinc-600 px-1">...</span>
                                <button className="px-1.5 h-6 rounded hover:bg-zinc-800 text-zinc-400 font-medium text-xs flex items-center justify-center">
                                    1285
                                </button>
                                <button className="p-1 rounded hover:bg-zinc-800 text-zinc-400">
                                    <FiChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </Table.Footer>
                </Table>
            </div>

            {/* Confirmation Modal using compound Modal structural API */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                    <Modal.Backdrop className="bg-black/80 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center">
                        <Modal.Container>
                            <Modal.Dialog className="bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
                                <Modal.CloseTrigger
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 text-zinc-400 hover:text-white"
                                />
                                <Modal.Header className="flex items-center gap-2">
                                    <Modal.Icon>
                                        <FiAlertCircle className="w-5 h-5 text-amber-500" />
                                    </Modal.Icon>
                                    <Modal.Heading className="text-lg font-semibold text-white">
                                        Confirm Role Change
                                    </Modal.Heading>
                                </Modal.Header>

                                <Modal.Body className="text-sm text-zinc-300">
                                    Are you sure you want to change the role of{' '}
                                    <span className="font-semibold text-white">{pendingRoleChange?.name}</span> from{' '}
                                    <span className="font-semibold text-zinc-200">{pendingRoleChange?.currentRole || 'Seeker'}</span> to{' '}
                                    <span className="font-semibold text-white">{pendingRoleChange?.targetRole}</span>?
                                </Modal.Body>

                                <Modal.Footer className="flex items-center justify-end gap-3 pt-2">
                                    <Button
                                        size="sm"
                                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs px-4 py-2 rounded-lg"
                                        onClick={() => setIsModalOpen(false)}
                                        disabled={isUpdating}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="bg-white hover:bg-zinc-200 text-zinc-950 font-medium text-xs px-4 py-2 rounded-lg"
                                        onClick={confirmRoleChange}
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? 'Updating...' : 'Confirm Change'}
                                    </Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>
            )}
        </div>
    );
};

export default UserTableClient;