"use client";

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { getFirebaseAuth, googleProvider } from "@/lib/firebase";

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleGoogleSignIn() {
    setLoading(true);
    setMessage("");
    try {
      const auth = getFirebaseAuth();
      const result = await signInWithPopup(auth, googleProvider);
      setMessage(`Signed in with Google as ${result.user.email}`);
    } catch (e) {
      setMessage(
        e instanceof Error ? e.message : "Google sign-in failed. Check Firebase env."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={loading}
        onClick={handleGoogleSignIn}
      >
        {loading ? "Connecting..." : "Sign in with Google"}
      </Button>
      {message && <p className="text-xs text-muted-foreground">{message}</p>}
    </div>
  );
}
