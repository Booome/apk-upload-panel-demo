"use client";

import { useUser } from "@/components/userProvider";
import { loginWithGoogle, signOut } from "@/lib/supabase/client";

export default function AuthButton() {
  const user = useUser();
  const buttonClasses = "text-sm font-semibold underline hover:cursor-pointer";

  return (
    <>
      {user ? (
        <>
          <span className="mr-4 font-semibold">
            Hi, {user.user_metadata.name ?? user.email}
          </span>
          <button onClick={signOut} className={buttonClasses}>
            SIGN OUT
          </button>
        </>
      ) : (
        <button onClick={loginWithGoogle} className={buttonClasses}>
          SIGN IN
        </button>
      )}
    </>
  );
}
