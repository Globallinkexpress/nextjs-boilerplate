"use client";

import { useState } from "react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const endpoint =
      mode === "signup"
        ? `${SUPABASE_URL}/auth/v1/signup`
        : `${SUPABASE_URL}/auth/v1/token?grant_type=password`;

    const body =
      mode === "signup"
        ? {
            email,
            password,
            data: { full_name: name },
          }
        : {
            email,
            password,
          };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || data.error_description || data.message || "Something went wrong.");
      }

      setMessage(
        mode === "signup"
          ? "Account created successfully. Check your email if verification is required."
          : "Login successful."
      );

      if (mode === "signup") {
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#0B1026",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "32px",
          borderRadius: "24px",
          background: "rgba(17,24,39,0.85)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h1>

        <p style={{ opacity: 0.7, marginBottom: "28px" }}>
          Global Link Express
        </p>

        <form onSubmit={submit}>
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={buttonStyle}
          >
            {loading
              ? "Please wait..."
              : mode === "signup"
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "18px", lineHeight: 1.5 }}>
            {message}
          </p>
        )}

        <button
          onClick={() => {
            setMode(mode === "signup" ? "login" : "signup");
            setMessage("");
          }}
          style={switchButtonStyle}
        >
          {mode === "signup"
            ? "Already have an account? Login"
            : "Don't have an account? Create one"}
        </button>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "14px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "#111827",
  color: "white",
  fontSize: "16px",
  boxSizing: "border-box" as const,
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  marginTop: "8px",
  borderRadius: "12px",
  border: "none",
  background: "#1D4ED8",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
};

const switchButtonStyle = {
  width: "100%",
  marginTop: "20px",
  padding: "10px",
  border: "none",
  background: "transparent",
  color: "#93C5FD",
  fontSize: "14px",
};