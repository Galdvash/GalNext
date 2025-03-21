import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/database";

export async function POST(request) {
  try {
    await connectToMongo();
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Basic "))
      return new NextResponse(JSON.stringify({ error: "יש צורך באימות" }), {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
      });

    const base64Credentials = authHeader.split(" ")[1];

    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );

    const [username, password] = credentials.split(":");

    if (
      username !== process.env.ADMIN_USER ||
      password !== process.env.ADMIN_PASSWORD
    )
      return NextResponse.json({ error: "אימות נכשל" }, { status: 401 });
    return NextResponse.json(
      {
        message: "אימות בוצע בהצלחה",
        user: { username, password },
      },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "אירעה שגיאה בעת יצירת הפוסט" },
      { status: 500 }
    );
  }
}
