'use client';

import React, { useState } from 'react';
import {
    Modal,
    Form,
    Button,
    TextField,
    Label,
    Input,
    TextArea,
    Description,
    FieldError,
} from '@heroui/react';
import {
    FiLink,
    FiFileText,
    FiGlobe,
    FiDollarSign,
    FiSend,
    FiBriefcase,
} from 'react-icons/fi';
import { submitApplication } from '@/lib/action/applications';
import toast from 'react-hot-toast';

const JobApply = ({ job, applicant }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData);

            const payload = {
                jobId: job?._id,
                jobTitle: job?.jobTitle,
                companyName: job?.companyName,
                applicantId: applicant?._id,
                applicantName: applicant?.name || `${data.firstName || ''} ${data.lastName || ''}`,
                applicantEmail: applicant?.email || data.email,
                resumeLink: data.resumeLink,
                portfolioUrl: data.portfolioUrl,
                expectedSalary: data.expectedSalary,
                coverNote: data.coverNote,
                appliedAt: new Date().toISOString(),
            };

            const res = await submitApplication(payload);

            if (res?.insertedId) {
                toast.success("Application Submitted Successfully!");
                setIsOpen(false);
            } else if (res?.error) {
                toast.error(`Submission failed (Error ${res.status || 500})`);
            } else {
                toast.error("Failed to submit application. Please try again.");
            }
        } catch (err) {
            console.error("Submission Error:", err);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }

        window.location.reload();
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>

            {/* Trigger Button */}

            <div className='flex items-center justify-center'>
                <Button
                    color="primary"
                    size="lg"
                    onPress={() => setIsOpen(true)}
                    className="font-medium shadow-md transition-transform active:scale-95 mb-12"
                >
                    <FiBriefcase className="mr-1 text-lg" />
                    Apply Now
                </Button>
            </div>

            {/* Modal Anatomy for HeroUI v3 */}

            <Modal.Backdrop>
                <Modal.Container size="xl" className="w-full max-w-lg md:max-w-3xl">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading className="text-xl font-bold text-gray-900 dark:text-white">
                                Apply for <span className='text-blue-600'>{job?.jobTitle || 'Position'}</span>
                            </Modal.Heading>
                            {job?.company && (
                                <p className="text-sm font-normal text-gray-500">
                                    {job.company} • {job?.location || 'Remote'}
                                </p>
                            )}
                        </Modal.Header>

                        <Modal.Body className="py-4">
                            <Form
                                id="job-application-form"
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-5"
                            >
                                {/* Pre-filled applicant info indicator */}
                                {applicant && (
                                    <div className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-zinc-800/60 p-3 border border-gray-200 dark:border-zinc-700 text-sm">
                                        <div>
                                            <span className="text-xs text-gray-500 block">Applying as</span>
                                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                                                {applicant.name || 'User'} ({applicant.email || 'No email provided'})
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Required: Resume Link */}
                                <TextField isRequired name="resumeLink">
                                    <Label className="flex items-center gap-1.5 font-medium">
                                        <FiLink className="text-blue-500" /> Resume / CV URL
                                    </Label>
                                    <Input
                                        type="url"
                                        placeholder="https://drive.google.com/file/d/your-resume..."
                                        className="mt-1 bg-gray-800"
                                    />
                                    <Description className="text-xs text-gray-500">
                                        Provide a viewable link (Google Drive, Dropbox, Notion, etc.)
                                    </Description>
                                    <FieldError>Please enter a valid URL for your resume.</FieldError>
                                </TextField>

                                {/* Optional: Portfolio / LinkedIn */}
                                <TextField name="portfolioUrl">
                                    <Label className="flex items-center gap-1.5 font-medium">
                                        <FiGlobe className="text-gray-500" /> Portfolio or LinkedIn (Optional)
                                    </Label>
                                    <Input
                                        type="url"
                                        placeholder="https://linkedin.com/in/yourprofile or portfolio site"
                                        className="mt-1 bg-gray-800"
                                    />
                                </TextField>

                                {/* Optional: Expected Salary */}
                                <TextField name="expectedSalary">
                                    <Label className="flex items-center gap-1.5 font-medium">
                                        <FiDollarSign className="text-gray-500" /> Expected Salary / Rate (Optional)
                                    </Label>
                                    <Input
                                        type="text"
                                        placeholder="e.g. $80,000/year or $50/hr"
                                        className="mt-1 bg-gray-800"
                                    />
                                </TextField>

                                {/* Optional: Short Cover Note */}
                                <TextField name="coverNote">
                                    <Label className="flex items-center gap-1.5 font-medium">
                                        <FiFileText className="text-gray-500" /> Quick Note / Cover Message (Optional)
                                    </Label>
                                    <TextArea
                                        rows={3}
                                        placeholder="Introduce yourself briefly..."
                                        className="mt-1 bg-gray-800"
                                    />
                                </TextField>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer className="flex items-center justify-end gap-3 border-t pt-4">
                            <Button
                                type="button"
                                variant="flat"
                                color="danger"
                                onPress={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                form="job-application-form"
                                color="primary"
                                isLoading={isSubmitting}
                                startContent={!isSubmitting && <FiSend />}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default JobApply;