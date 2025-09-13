import { usePuterStore } from "~/lib/puter";
import React from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => [
    { title: "Resumind | Auth" },
    { name: "description", content: "Log into your account" },
];

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const navigate = useNavigate();

    // Safer `next` parsing with a default fallback
    const params = new URLSearchParams(location.search);
    const next = params.get("next") || "/";

    const handlePrimaryClick = async () => {
        if (auth.isAuthenticated) {
            // Already signed in – only navigate after the user clicks
            navigate(next);
            return;
        }
        // Not signed in – trigger the SDK login flow
        await auth.signIn();
        // After sign-in completes, the store will reflect it; we can navigate here
        // (If Puter performs a full-page redirect, you’ll land back and this line may not run.)
        if (usePuterStore.getState().auth.isAuthenticated) {
            navigate(next);
        }
    };

    const handleLogout = async () => {
        await auth.signOut();
    };

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex itens-centre justify-centre">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 p-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-centre gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Log In to Continue Your Job Journey</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse" disabled>
                                <p>Signing you in...</p>
                            </button>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <button className="auth-button" onClick={handlePrimaryClick}>
                                    <p>{auth.isAuthenticated ? "Continue" : "Log in"}</p>
                                </button>
                                {auth.isAuthenticated && (
                                    <button className="auth-button" onClick={handleLogout}>
                                        <p>Log Out</p>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
};
export default Auth;