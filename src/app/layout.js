import "./globals.css";

export const metadata = {
  title: "Wasabi Shop",
  description: "Plataforma de venta de productos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-PE">
      <body>
        <h1>Navbar</h1>
        <div className="h-[calc(100vh-5rem)] container mx-auto px-10 lg:px-25">{children}</div>
      </body>
    </html>
  );
}
