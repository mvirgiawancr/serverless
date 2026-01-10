export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <title>Serverless Workshop - Vercel Demo</title>
        <meta name="description" content="Next.js Serverless API Demo" />
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
