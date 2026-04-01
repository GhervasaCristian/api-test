export const metadata = {
  title: 'Client - Măsurători de Mediu',
  description: 'Aplicația client',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  )
}