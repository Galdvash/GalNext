import { NextResponse } from "next/server";
import { connectToMongo, Post } from "@/lib/database";

export async function GET(request) {
  await connectToMongo();
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "אירעה שגיאה בעת שליפת הפוסטים" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectToMongo();

  // אימות Basic
  // const authHeader = request.headers.get("authorization");
  // if (!authHeader || !authHeader.startsWith("Basic ")) {
  //   return new NextResponse(JSON.stringify({ error: "יש צורך באימות" }), {
  //     status: 401,
  //     headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
  //   });
  // }

  // const base64Credentials = authHeader.split(" ")[1];
  // const credentials = Buffer.from(base64Credentials, "base64").toString(
  //   "ascii"
  // );
  // const [username, password] = credentials.split(":");

  // if (
  //   username !== process.env.ADMIN_USER ||
  //   password !== process.env.ADMIN_PASSWORD
  // ) {
  //   return NextResponse.json({ error: "אימות נכשל" }, { status: 401 });
  // }

  const body = await request.json();
  const { title, content } = body;
  if (!title || !content) {
    return NextResponse.json(
      { error: "חסרים שדות (title או content)" },
      { status: 400 }
    );
  }

  try {
    // לא מעבירים createdByAdmin מהקליינט – מובטח שיהיה true
    const newPost = await Post.create({ title, content });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "אירעה שגיאה בעת יצירת הפוסט" },
      { status: 500 }
    );
  }
}
