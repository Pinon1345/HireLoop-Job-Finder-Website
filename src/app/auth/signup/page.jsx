import React, { Suspense } from "react";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-white">Loading...</div>}>
            <SignUpForm />
        </Suspense>
    );
}