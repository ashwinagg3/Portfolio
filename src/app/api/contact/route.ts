import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request){
  try {
    const body = await req.json();

    const { name, email, website, message } = body;

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["ashwinagg3@gmail.com"],
      subject: `New Portfolio Message from ${name}`,
      replyTo: email,

      html: `
        <div style="font-family:sans-serif;padding:20px">
          <h2>New Portfolio Contact</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Website:</strong> ${website}</p>

          <hr />

          <p>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    console.log(data);

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}
