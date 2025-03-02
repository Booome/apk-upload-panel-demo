"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<User | null>(null);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const user = useContext(UserContext);
  return user;
}
