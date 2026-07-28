import React, { Suspense } from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-white">Loading...</div>}>
            <SignInForm />
        </Suspense>
    );
}