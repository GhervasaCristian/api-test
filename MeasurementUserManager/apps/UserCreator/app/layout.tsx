export const metadata = {
  title: 'Admin - Măsurători de Mediu',
  description: 'Panou administrator',
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