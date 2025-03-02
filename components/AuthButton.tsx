"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();
  const buttonClasses = "text-sm font-semibold underline";

  return (
    <>
      {session ? (
        <>
          <span className="mr-4 font-semibold">Hi, {session.user?.name}</span>
          <button onClick={() => signOut()} className={buttonClasses}>
            SIGN OUT
          </button>
        </>
      ) : (
        <button onClick={() => signIn("google")} className={buttonClasses}>
          SIGN IN
        </button>
      )}
    </>
  );
}
