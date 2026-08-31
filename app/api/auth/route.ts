import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const url = process.env.nextpublicsupabaseUrl;
    const key = process.env.nextpublishablekey;

    if (!url || !key) {
      return NextResponse.json(
        { error: "Supabase server configuration is missing." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { action, email, password, fullName } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    let endpoint = "";
    let requestBody: Record<string, unknown>;

    if (action === "signup") {
      endpoint = `${url}/auth/v1/signup`;

      requestBody = {
        email: email.trim(),
        password,
        data: {
          full_name: fullName?.trim() || "",
        },
      };
    } else if (action === "login") {
      endpoint = `${url}/auth/v1/token?grant_type=password`;

      requestBody = {
        email: email.trim(),
        password,
      };
    } else {
      return NextResponse.json(
        { error: "Invalid authentication action." },
        { status: 400 }
      );
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
      },
      body: JSON.stringify(requestBody),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            result.error_description ||
            result.msg ||
            result.message ||
            "Authentication failed.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        action === "signup"
          ? "Account created successfully."
          : "Login successful.",
      user: result.user || null,
      session: result.access_token
        ? {
            access_token: result.access_token,
            refresh_token: result.refresh_token,
          }
        : null,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to connect to the authentication service." },
      { status: 500 }
    );
  }
}