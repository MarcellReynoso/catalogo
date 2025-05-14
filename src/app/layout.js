import "./globals.css";

export const metadata = {
  title: "Catálogo",
  description: "Plataforma de venta de productos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-PE">
      <body>
        {children}
      </body>
    </html>
  );
}
