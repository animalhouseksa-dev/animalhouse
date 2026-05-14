import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    // Log the submission for now — replace with email service (Resend/Formspree/etc)
    console.log(`[Inquiry] type=${type}`, data);

    // In a production setup, forward this to Formspree, Resend, or a webhook.
    // Example with Formspree (requires env var):
    // const FormspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
    // if (FormspreeEndpoint) {
    //   await fetch(FormspreeEndpoint, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json", Accept: "application/json" },
    //     body: JSON.stringify({ ...data, _subject: `New ${type} inquiry` }),
    //   });
    // }

    return NextResponse.json({ success: true, message: "Inquiry received" });
  } catch (err) {
    console.error("[Inquiry] error", err);
    return NextResponse.json(
      { success: false, message: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
