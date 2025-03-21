"use client";

import React from "react";

import { useLocalStorage } from "@/lib/hooks";

// Separate the auth hook into its own file/component
export function useAuth() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const [username, setUsername, removeUsername] = useLocalStorage(
    "username",
    ""
  );
  const [password, setPassword, removePassword] = useLocalStorage(
    "password",
    ""
  );

  const checkAuth = async () => {
    if (!username || !password) {
      setIsSignedIn(false);
      return;
    }

    try {
      const credentials = btoa(`${username}:${password}`);
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
      });

      setIsSignedIn(res.ok);
    } catch (error) {
      console.error("Authentication error:", error);
      setIsSignedIn(false);
    }
  };

  const login = (newUsername, newPassword) => {
    setUsername(newUsername);
    setPassword(newPassword);
  };

  const logout = () => {
    removeUsername();
    removePassword();
    setIsSignedIn(false);
  };

  // Check auth when username or password changes
  React.useEffect(() => {
    checkAuth();
  }, [username, password]);

  return {
    isSignedIn,
    username,
    login,
    logout,
  };
}
