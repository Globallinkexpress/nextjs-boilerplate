"use client";

import { FormEvent, useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: mode,
          fullName,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Authentication failed.");
      }

      setMessage(
        mode === "signup"
          ? "Account created successfully. Check your email if verification is required."
          : "Login successful."
      );

      if (mode === "signup") {
        setFullName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
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
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        background: "#0B1026",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "32px",
          borderRadius: "24px",
          background: "#111827",
          border: "1px solid rgba(255,255,255,.12)",
        }}
      >
        <h1>
          {mode === "signup"
            ? "Create your account"
            : "Welcome back"}
        </h1>

        <p style={{ opacity: 0.7 }}>
          Global Link Express
        </p>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
          <p style={{ marginTop: "18px" }}>
            {message}
          </p>
        )}

        <button
          type="button"
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
      </section>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "14px",
  marginBottom: "14px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,.15)",
  background: "#0B1026",
  color: "#fff",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "12px",
  border: "none",
  background: "#1D4ED8",
  color: "#fff",
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