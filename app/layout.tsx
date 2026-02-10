export const metadata = {
  title: 'BFHL API - Chitkara Qualifier',
  description: 'REST API for Chitkara University Qualifier 1 Assignment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
