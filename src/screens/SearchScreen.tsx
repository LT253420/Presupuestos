
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Zap, AlertTriangle, Puzzle, LucideGamepad, Settings, MonitorSmartphone, 
BatteryCharging, PlugZap, Wrench, Search, ChevronRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Header, Footer, HomeButton } from '../components/Layout';
import { cn } from '../utils/helpers.ts';
import DollarWidget from "../components/DollarWidget";
import ModulosScreen from "./calc/ModulosScreen.tsx";
import BateriasScreen from "./calc/BateriasScreen.tsx";
import PinScreen from "./calc/PinScreen.tsx";
import BotonesScreen from "./calc/BotonesScreen.tsx";
import OtrosScreen from "./calc/OtrosScreen.tsx";
import RevisionScreen from "./calc/RevisionScreen.tsx";
import TecnicoScreen from "./calc/TecnicoScreen.tsx";


interface SearchScreenProps {
  onBack: () => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery, ] = useState('');
  const [screen, setScreen] = useState<
  "home" |
  "modulos" |
  "baterias" |
  "pin" |
  "botones" |
  "otros" |
  "revision" |
  "tecnico"
>("home");

  // Scroll al inicio cuando se monta el componente o cambia la seleccion
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

switch (screen) {
  case "modulos":
    return <ModulosScreen onBack={() => setScreen("home")} />;

  case "baterias":
    return <BateriasScreen onBack={() => setScreen("home")} />;

  case "pin":
    return <PinScreen onBack={() => setScreen("home")} />;

    case "botones":
    return <BotonesScreen onBack={() => setScreen("home")} />;

    case "otros":
    return <OtrosScreen onBack={() => setScreen("home")} />;

    case "revision":
    return <RevisionScreen onBack={() => setScreen("home")} />;

    case "tecnico":
    return <TecnicoScreen onBack={() => setScreen("home")} />;


  default:
    break;
}

{/* fin parte 2 */}
return (
  <div className="min-h-screen flex flex-col">
    <Header showLogout={false} />

    <main className="flex-1 pt-24 pb-8 px-4">
      <div className="max-w-md mx-auto w-full space-y-4">

        {/* BOTÓN VOLVER */}
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

        <Card
          variant="glow"
          padding="lg"
          className="animate-fadeInUp text-center"
        >
          <MonitorSmartphone
            size={42}
            className="mx-auto mb-3 text-[var(--color-primary)]"
          />

          <h2 className="font-mono text-xl font-bold">
            Calculadora de Presupuestos
          </h2>

          <p className="text-sm text-[var(--text-muted)] mt-2">
            Seleccioná el tipo de presupuesto que querés calcular.
          </p>
        </Card>

         <Card
                variant="bordered"
                clickable
                hoverable
                padding="md"
                onClick={() => setScreen("modulos")}
                className="animate-fadeIn cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <MonitorSmartphone
                    size={20}
                    className="text-[var(--color-primary)]"
                  />
                  <span className="font-mono">
                    Cambio de Pantalla
                  </span>
                </div>
            </Card>

         <Card
                variant="bordered"
                clickable
                hoverable
                padding="md"
                onClick={() => setScreen("baterias")}
                className="animate-fadeIn cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <BatteryCharging
                    size={20}
                    className="text-[var(--color-primary)]"
                  />
                  <span className="font-mono">
                    Cambio de Batería
                  </span>
                </div>
            </Card>

         <Card
                variant="bordered"
                clickable
                hoverable
                padding="md"
                onClick={() => setScreen("pin")}
                className="animate-fadeIn cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <PlugZap
                    size={20}
                    className="text-[var(--color-primary)]"
                  />
                  <span className="font-mono">
                    Cambio de Pin de carga
                  </span>
                </div>
            </Card>

        <Card
                        variant="bordered"
                        clickable
                        hoverable
                        padding="md"
                        onClick={() => setScreen("otros")}
                        className="animate-fadeIn cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <LucideGamepad
                            size={20}
                            className="text-[var(--color-primary)]"
                          />
                          <span className="font-mono">
                            Cambio de Otros componentes
                          </span>
                        </div>
                    </Card>

                    <Card
                        variant="bordered"
                        clickable
                        hoverable
                        padding="md"
                       onClick={() => setScreen("botones")}
                        className="animate-fadeIn cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <Puzzle 
                            size={20}
                            className="text-[var(--color-primary)]"
                          />
                          <span className="font-mono">
                            Cambio de Botones
                          </span>
                        </div>
                    </Card>

         <Card
                variant="bordered"
                clickable
                hoverable
                padding="md"
                onClick={() => setScreen("revision")}
                className="animate-fadeIn cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Wrench
                    size={20}
                    className="text-[var(--color-primary)]"
                  />
                  <span className="font-mono">
                    Presupuesto Revision / Diagnóstico
                  </span>
                </div>
            </Card>

             <Card
                variant="bordered"
                clickable
                hoverable
                padding="md"
                onClick={() => setScreen("tecnico")}
                className="animate-fadeIn cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Search
                    size={20}
                    className="text-[var(--color-primary)]"
                  />
                  <span className="font-mono">
                    Presupuestos Para Técnicos
                  </span>
                </div>
            </Card>


      </div>
    </main>

    <HomeButton onClick={onBack} />
    <DollarWidget />
    <Footer />
  </div>
);
}