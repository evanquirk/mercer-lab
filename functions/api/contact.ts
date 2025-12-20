export const onRequestPost: PagesFunction = async (context) => {
  try {
    const formData = await context.request.json();
    const { name, email, subject, message } = formData;

    const resendApiKey = context.env.RESEND_API_KEY as string;

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email service is not configured.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Mercer Lab Website <onboarding@resend.dev>",
        to: ["evan_quirk@me.com"],
        reply_to: email,
        subject: `[Mercer Lab Contact Form] ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Resend API error:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to send message. Please try again.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "An error occurred. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
