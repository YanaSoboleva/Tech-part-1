import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Header } from '@/components/Header/Header';
import { FilterProvider } from '@/app/context/FilterContext'; 
import './globals.css';

export default function RootLayout({ 
  children, 
  sidebar 
}: { 
  children: React.ReactNode;
  sidebar: React.ReactNode; 
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <FilterProvider> 
            <Header />
            <main>
              {children}
              {sidebar} 
            </main>
          </FilterProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}