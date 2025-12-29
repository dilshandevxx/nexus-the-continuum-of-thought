"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormState = {
  success: boolean;
  message?: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const validatedFields = contactFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("📨 Contact Form Submitted:", validatedFields.data);

  // In a real application, you would send an email here using Resend, SendGrid, etc.
  // await resend.emails.send({ ... });

  return {
    success: true,
    message: "Message sent! We'll get back to you shortly.",
  };
}
