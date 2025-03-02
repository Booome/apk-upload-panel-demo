"use client";

import { loginWithGoogle } from "@/lib/supabase/client";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <button
      onClick={loginWithGoogle}
      className="btn mx-auto flex w-full max-w-xs items-center justify-center gap-2 rounded-md border px-4 py-2 shadow-md"
    >
      <FcGoogle className="h-5 w-5" />
      <span>Login with Google</span>
    </button>
  );
}
