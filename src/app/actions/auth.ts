"use server";

import * as z from "zod";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginState = {
  error?: string;
  success?: boolean;
};

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const data = Object.fromEntries(formData.entries());
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid email or password format." };
  }

  const { email, password } = parsed.data;

  try {
    // 1. Find user
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      // Use fake comparison to prevent time-based enumeration attacks
       await bcrypt.compare("fake", "$2b$10$abcdefghijklmnopqrstuv");
       return { error: "Invalid credentials." };
    }

    // 2. Verify password
    const passwordsMatch = await bcrypt.compare(password, admin.password);
    if (!passwordsMatch) {
      return { error: "Invalid credentials." };
    }

    // 3. Create Session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
    const session = await encrypt({ adminId: admin.id, email: admin.email, expires });

    // 4. Set Cookie
    (await cookies()).set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

  } catch (err) {
    console.error("Login error:", err);
    return { error: "Something went wrong." };
  }

  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete("session");
  redirect("/admin/login");
}
