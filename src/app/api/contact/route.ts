import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, website, message } = body;

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "YOUR_EMAIL@gmail.com",
      subject: `New Portfolio Message from ${name}`,
      replyTo: email,

      html: `
        <div style="font-family:sans-serif;padding:20px">
          <h2>New Portfolio Contact</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Website:</strong> ${website}</p>

          <hr />

          <p>${message}</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}
