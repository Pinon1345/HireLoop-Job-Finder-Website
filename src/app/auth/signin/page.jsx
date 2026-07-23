"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Input,
    Button,
    Card,
    Separator,
    TextField,
    Label,
    InputGroup
} from "@heroui/react";
import {
    FaEye,
    FaEyeSlash,
    FaGoogle,
    FaEnvelope,
    FaLock
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; // Adjust path to your client file

export default function SignIn() {
    const router = useRouter();

    const searchParams = useSearchParams()
    const redirectTo = searchParams.get('redirect') || '/'

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    // Live Inline Validation Handler
    const validateField = (name, value) => {
        let errorMsg = "";

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                errorMsg = "Email address is required.";
            } else if (!emailRegex.test(value)) {
                errorMsg = "Please enter a valid email address.";
            }
        }

        if (name === "password") {
            if (!value) {
                errorMsg = "Password is required.";
            }
        }

        setErrors((prev) => ({ ...prev, [name]: errorMsg }));
        return errorMsg;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validate fields dynamically as the user types
        if (name === "email" || name === "password") {
            validateField(name, value);
        }
    };

    // CORRECT BETTER-AUTH MONGO LOGIN PIPELINE
    const handleSignIn = async (e) => {
        e.preventDefault();

        // Run final validation check on submit
        const emailErr = validateField("email", formData.email);
        const passwordErr = validateField("password", formData.password);

        if (emailErr || passwordErr) {
            toast.error("Please fix the errors in the form before submitting.");
            return;
        }

        setIsLoading(true);

        try {
            // Official BetterAuth client SDK signin method
            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                throw new Error(error.message || "Invalid email or password.");
            }

            toast.success("Signed in successfully!");

            // Refresh the router so the session is re-fetched
            router.refresh();
            router.push(redirectTo);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // CORRECT BETTER-AUTH GOOGLE OAUTH PIPELINE
    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            toast.error("Google authentication failed.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-zinc-900">

            {/* Toast Notification Container */}
            <Toaster position="top-center" reverseOrder={false} />

            <Card className="w-full max-w-2xl p-4 shadow-lg border-2 border-gray-800 shadow-blue-800">
                <Card.Content className="flex flex-col gap-5">

                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-primary mt-2 text-blue-600">Hireloop</h1>
                        <p className="mt-2 mb-2 text-sm text-gray-500 dark:text-gray-400">
                            Welcome back! Sign in to your account
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignIn} className="flex flex-col gap-6" noValidate>

                        {/* Email Input */}
                        <TextField isRequired isInvalid={!!errors.email} className="w-full flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</Label>
                            <InputGroup className={`flex items-center border rounded-xl px-3 bg-transparent focus-within:ring-2 ${errors.email ? 'border-danger focus-within:ring-danger' : 'border-gray-300 dark:border-zinc-700 focus-within:ring-primary'}`}>
                                <FaEnvelope className="text-default-400 mr-2 shrink-0" />
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent py-2 outline-none text-sm"
                                />
                            </InputGroup>
                            {errors.email && (
                                <span className="text-xs text-red-500 pl-1 mt-0.5">{errors.email}</span>
                            )}
                        </TextField>

                        {/* Password Input */}
                        <TextField isRequired isInvalid={!!errors.password} className="w-full flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</Label>
                            <InputGroup className={`flex items-center border rounded-xl px-3 bg-transparent focus-within:ring-2 ${errors.password ? 'border-danger focus-within:ring-danger' : 'border-gray-300 dark:border-zinc-700 focus-within:ring-primary'}`}>
                                <FaLock className="text-default-400 mr-2 shrink-0" />
                                <Input
                                    type={isVisible ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-transparent py-2 outline-none text-sm flex-1"
                                />
                                <button
                                    className="focus:outline-none ml-2 text-default-400 hover:text-default-600 transition-colors"
                                    type="button"
                                    onClick={toggleVisibility}
                                    aria-label="toggle password visibility"
                                >
                                    {isVisible ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                                </button>
                            </InputGroup>
                            {errors.password && (
                                <span className="text-xs text-red-500 pl-1 mt-0.5">{errors.password}</span>
                            )}
                        </TextField>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            color="primary"
                            className="w-full font-semibold mt-2 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-0.5"
                            isLoading={isLoading}
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Separator */}
                    <div className="flex items-center my-2">
                        <Separator className="flex-1" />
                        <span className="px-3 text-xs text-gray-400 uppercase">Or continue with</span>
                        <Separator className="flex-1" />
                    </div>

                    {/* Google Auth Button */}
                    <Button
                        variant="bordered"
                        className="w-full flex items-center justify-center gap-2 border dark:border-zinc-700 font-medium transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-0.5"
                        onClick={handleGoogleSignIn}
                    >
                        <FaGoogle className="text-red-500" />
                        Google
                    </Button>

                    {/* Navigation to Sign Up */}
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4">
                        Do not have an account yet?{" "}
                        <Link
                            href={`/auth/signup?redirect=${redirectTo}`}
                            className="font-semibold text-primary hover:underline transition-all text-blue-600"
                        >
                            Sign Up
                        </Link>
                    </p>
                </Card.Content>
            </Card>
        </div>
    );
}