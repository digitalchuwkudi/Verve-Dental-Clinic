export const onRequestPost = async (context: any) => {
  try {
    const { request } = context;
    const body = await request.json();
    const { name, phone, email, treatmentInterest, transcript } = body as any;

    const interestTag = treatmentInterest && treatmentInterest.toLowerCase() !== 'general' 
                        ? `[${treatmentInterest.toUpperCase()}]` 
                        : '';
    const subject = `Urgent: Dental Lead ${interestTag} - ${name}`;

    const emailContent = `
NEW LEAD CAPTURED FROM VERVE DENTAL AI RECEPTIONIST

Lead Name: ${name}
Lead Phone: ${phone || 'Not provided'}
Lead Email: ${email || 'Not provided'}
Interest/Context: ${treatmentInterest || 'General'}

--- CHAT TRANSCRIPT ---
${transcript}
    `.trim();

    // Formsubmit AJAX triggered from Server (Cloudflare Function)
    const formSubmitUrl = "https://formsubmit.co/ajax/madudimcjx@gmail.com";
    
    const response = await fetch(formSubmitUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Cloudflare-Workers'
      },
      body: JSON.stringify({
        _subject: subject,
        "Lead Name": name,
        "Phone Number": phone,
        "Email Address": email,
        "Interest": treatmentInterest || "General",
        "Chat Transcript": transcript
      })
    });

    if (!response.ok) {
        throw new Error("Failed to forward lead to email.");
    }

    return Response.json({ success: true, message: "Lead forwarded successfully." });
  } catch (error: any) {
    console.error("Error sending lead:", error);
    return Response.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
