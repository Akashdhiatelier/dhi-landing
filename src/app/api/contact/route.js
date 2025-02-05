import sendMail from "@/utils/mailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, message, phone, secret } = await request.json();
    let response = await sendMail(
      `New message from ${name}`,
      "ravindra.b@wingsts.com",
      `
       Name: ${name}
       Email: ${email}
       Phone: ${phone}
       Message: ${message}
      `
    );
    return NextResponse.json({ message: response }, { status: 200 });
  } catch (error) {
    console.error("Error while sending mail", error);
    return NextResponse.json(
      { message: "Error while sending mail" },
      { status: 500 }
    );
  }
}
