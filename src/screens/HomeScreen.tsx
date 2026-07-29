import React from 'react';
import { Wrench, Search, Phone, HelpCircle, Calculator } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Header, Footer } from '../components/Layout';
import { cn } from '../utils/helpers';

type Screen = 'home' | 'search' | 'howToUse' | 'contact' | 'falla';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const menuItems = [
    {
      id: 'search',
      title: 'Buscar Calculadora',
      description: 'Accede a la lista completa de Calculadoras',
      icon: <Search size={24} />,
      action: () => onNavigate('search'),
      variant: 'primary' as const,
    },
    {
      id: 'howToUse',
      title: 'Como Usar',
      description: 'Guia rapida de uso del sistema',
      icon: <HelpCircle size={24} />,
      action: () => onNavigate('howToUse'),
      variant: 'secondary' as const,
    },
    {
      id: 'contact',
      title: 'Soporte',
      description: 'Contacto y colaboracion',
      icon: <Phone size={24} />,
      action: () => onNavigate('contact'),
      variant: 'secondary' as const,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main content */}
      <main className="flex-1 pt-24 pb-8 px-4">
        <div className="max-w-md mx-auto w-full space-y-6">
          {/* Title */}
          <div className="text-center mb-8 animate-fadeInUp">
            <div
              className={cn(
                'inline-flex items-center justify-center mb-4',
                'w-16 h-16 rounded-xl',
                'border-2 border-[var(--color-primary)]',
                'bg-[var(--color-primary-subtle)]',
                'animate-pulseGlow'
              )}
            >
              <Calculator size={28} className="text-[var(--color-primary)]" />
            </div>
            <h1 className="text-2xl font-mono font-bold tracking-wide">
              Calculadora de Presupuestos
            </h1>
            <p className="text-[var(--text-muted)] text-sm mt-2">
              Selecciona una opcion para continuar
            </p>
          </div>

          {/* Menu items */}
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <Card
                key={item.id}
                variant="bordered"
                padding="md"
                clickable
                hoverable
                onClick={item.action}
                className={cn(
                  'animate-fadeInUp',
                  `stagger-${index + 1}`
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'flex-shrink-0 flex items-center justify-center',
                      'w-12 h-12 rounded-xl',
                      item.variant === 'primary'
                        ? 'bg-[var(--color-primary-subtle)] border border-[var(--color-primary)]'
                        : 'bg-[var(--bg-elevated)] border border-[var(--border-color)]'
                    )}
                  >
                    <span
                      className={
                        item.variant === 'primary'
                          ? 'text-[var(--color-primary)]'
                          : 'text-[var(--text-secondary)]'
                      }
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-mono font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-[var(--text-muted)]">
                    <svg size={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick stats */}
          <div
            className={cn(
              'grid grid-cols-3 gap-3 pt-4',
              'animate-fadeInUp stagger-4'
            )}
          >
            <div
              className={cn(
                'text-center p-4 rounded-xl',
                'bg-[var(--bg-surface)]',
                'border border-[var(--border-color)]'
              )}
            >
              <div
                className={cn(
                  'text-2xl font-mono font-bold',
                  'text-[var(--color-primary)]'
                )}
              >
                7+
              </div>
              <div className="text-xs text-[var(--text-muted)]">Calculadoras</div>
            </div>
            <div
              className={cn(
                'text-center p-4 rounded-xl',
                'bg-[var(--bg-surface)]',
                'border border-[var(--border-color)]'
              )}
            >
              <div
                className={cn(
                  'text-2xl font-mono font-bold',
                  'text-[var(--color-primary)]'
                )}
              >
                Calc.
              </div>
              <div className="text-xs text-[var(--text-muted)]">Automaticas</div>
            </div>
            <div
              className={cn(
                'text-center p-4 rounded-xl',
                'bg-[var(--bg-surface)]',
                'border border-[var(--border-color)]'
              )}
            >
              <div
                className={cn(
                  'text-2xl font-mono font-bold',
                  'text-[var(--color-primary)]'
                )}
              >
                v2.0
              </div>
              <div className="text-xs text-[var(--text-muted)]">Version</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// How to use screen
export const HowToUseScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showLogout={false} />

      <main className="flex-1 pt-24 pb-8 px-4">
        <div className="max-w-md mx-auto w-full space-y-6">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={onBack}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            }
            className="animate-fadeIn"
          >
            Volver
          </Button>

          {/* Content */}
          <Card variant="glow" padding="lg" className="animate-fadeInUp">
            <h2 className="text-xl font-mono font-bold mb-4 text-center">
              Como Usar el Sistema
            </h2>

            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                La Herramienta esta diseñada de forma simple: selecciona de toda la
                lista el cálculo que quieras para tu equipo.
              </p>

              <p>
                Te apareceran los posibles modelos para que las revises. Toca en
                una y tocá el botón de "Calcular Presupuesto" para realizar
                 el cálculo automatico y actualizado.
              </p>

              <div
                className={cn(
                  'p-4 rounded-lg',
                  'bg-[var(--color-primary-subtle)]',
                  'border border-[var(--border-color)]',
                  'text-[var(--text-primary)]'
                )}
              >
                <strong className="text-[var(--color-primary)]">Recordá:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Las listas Son Recomendaciones en precio. </li>
                  <li>Si sos técnico, te sirve para
                    orientarte mejor sobre cuanto cobrar como mínimo. </li>
                  <li>El presupuesto se calcula con una lista de repuestos con un precio ligeramente 
                    elevado Por lo que hay margen para reducir.</li>
                  <li>El precio del dolar se actualiza Automaticamente de forma precisa conforme 
                    la página "dolarhoy.com". </li>
                  <li>NO se toma precio por calidades, el presupuesto es con la mejor calidad disponible
                    (exceptuando calidad Service Pack u Original) </li>
                </ul>
              </div>

              <p>
                Si algún Cálculo te parece erroneo, podés comunicarlo al whatsapp para 
                corregirlo. 
              </p>

              <p className="text-sm text-[var(--text-muted)]">
                En muchos casos, la lista podrá tener una variacion en el precio real.
                Ya sea por un margen para cubrir cambios de precios, margen para gastos
                o directamente redondeando los precios. Podés orientarte con ellos y actualizar
                al precio Exacto de tu proveedor, o directamente utilizarlo.
                 <br></br>Está en el tecnico
                decidir que hacer ;)
              </p>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Contact screen
export const ContactScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showLogout={false} />

      <main className="flex-1 pt-24 pb-8 px-4">
        <div className="max-w-md mx-auto w-full space-y-6">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={onBack}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            }
            className="animate-fadeIn"
          >
            Volver
          </Button>

          {/* Content */}
          <Card variant="glow" padding="lg" className="animate-fadeInUp">
            <h2 className="text-xl font-mono font-bold mb-4 text-center">
              Soporte y Contacto
            </h2>

            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/5491127222169"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'relative block p-4 rounded-xl overflow-hidden',
                  'bg-[var(--color-primary)]',
                  'text-[#111]',
                  'font-medium',
                  'transition-all duration-300',
                  'hover:shadow-[var(--shadow-glow-strong)]',
                  'active:scale-[0.98]',
                  'group'
                )}
              >
                {/* Efecto de iluminacion shimmer animado */}
                <div
                  className={cn(
                    'absolute inset-0 opacity-0',
                    'group-hover:opacity-100 group-active:opacity-100',
                    'transition-opacity duration-300',
                    'pointer-events-none'
                  )}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s ease-in-out infinite',
                  }}
                />
                <div className="relative flex items-center gap-3 z-10">
                  <svg
                      viewBox="0 0 32 32"
                      className="w-6 h-6"
                      fill="currentColor"
                      >
                      <path d="M19.11 17.21c-.27-.13-1.59-.78-1.84-.87-.25-.09-.43-.13-.61.14-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.13-1.12-.41-2.13-1.31-.79-.71-1.33-1.58-1.48-1.85-.16-.27-.02-.42.12-.56.12-.12.27-.31.4-.46.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26s.97 2.62 1.1 2.8c.14.18 1.9 2.91 4.61 4.08.65.28 1.15.45 1.54.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.82-1.27.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.31z"/>
                      <path d="M16 3C8.82 3 3 8.82 3 16c0 2.29.61 4.53 1.77 6.5L3.5 28.5l6.15-1.61A12.9 12.9 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.5c-2.01 0-3.98-.54-5.7-1.56l-.41-.24-3.65.96.98-3.56-.27-.43A10.4 10.4 0 015.5 16C5.5 10.2 10.2 5.5 16 5.5S26.5 10.2 26.5 16 21.8 26.5 16 26.5z"/>
                  </svg>
                  <span>WhatsApp: +54 9 11 2722-2169</span>
                </div>
              </a>

              {/* Collaboration */}
              <div
                className={cn(
                  'p-4 rounded-xl',
                  'bg-[var(--bg-surface)]',
                  'border border-[var(--border-color)]'
                )}
              >
                <h3 className="font-mono font-semibold text-[var(--text-primary)] mb-2">
                  Te gustaria colaborar?
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Envia al WhatsApp Cálculos, Propuestas o ideas para que la
                  herramienta crezca! Tambien si necesitas ayuda o tenés algun
                  inconveniente con la calculadora, te podemos ayudar ;)
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};