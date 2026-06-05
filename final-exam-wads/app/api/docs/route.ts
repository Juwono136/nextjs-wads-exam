import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NEXT_PUBLIC_API_DOCS_ENABLED !== "true") {
    return NextResponse.json({ error: "API docs disabled" }, { status: 404 });
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Simple Blog API Docs</title>
</head>
<body>
  <div id="swagger-ui">
  <h1>Simple Blog API Docs</h1>
  <p>This is a simple blog API documentation (Offline mode).</p>
  </div>
  <script>
    window.onload = () => {
      SwaggerUIBundle({
        url: '/openapi.json',
        dom_id: '#swagger-ui',
      });
    };
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
