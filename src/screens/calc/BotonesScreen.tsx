import { Header, Footer, HomeButton } from "../../components/Layout";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import DollarWidget from "../../components/DollarWidget";
import { Calculator, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import { modulos } from "../../data/repuestos";


interface Props {
  onBack: () => void;
}

{/* Acá va el Costo Del pin de carga fijo */}

const COSTO_BOTONES_MIN_USD = 16.18;
const COSTO_BOTONES_MAX_USD = 22.6;

export default function BotonesScreen({ onBack }: Props) {


 
  const [resultado, setResultado] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [animacionResultado, setAnimacionResultado] = useState(0);
  const [tipoResultado, setTipoResultado] = useState<"ok" | "warning">("ok");
  const [buscando, setBuscando] = useState(false);
  const [modelo, setModelo] = useState("");

  {/* Esto genera una lista de modelos En el searchbar */}
const modelos = useMemo(() => {

  return [
    ...new Set(
      modulos.map(item => item.modelo)
    )
  ].sort();

}, []);


{/* Acá empieza el redondeo Del pin */}
  function redondearPrecioBotones(valor: number) {

  if (valor <= 400) {
    return Math.floor(valor / 10) * 10;
  }

  return Math.ceil(valor / 1000) * 1000;

}

async function calcularBotones() {

  if (buscando) return;

  setBuscando(true);
  setResultado("");

  try {

    const respuesta = await fetch(
      "https://dolarapi.com/v1/dolares/oficial"
    );

    const data = await respuesta.json();

    const dolar = data.venta;


    const costoMin = COSTO_BOTONES_MIN_USD * dolar;
    const costoMax = COSTO_BOTONES_MAX_USD * dolar;

    const finalMin = redondearPrecioBotones(
      costoMin * 1.0
    );

    const finalMax = redondearPrecioBotones(
      costoMax * 1.0
    );

    setResultado(
   `Desde $ ${finalMin.toLocaleString("es-AR")} hasta $ ${finalMax.toLocaleString("es-AR")}`
    );

    setTipoResultado("ok");

    setAnimacionResultado((v) => v + 1);

  } catch {

    setResultado("⚠️ No se pudo obtener el dólar.");

    setTipoResultado("warning");

    setAnimacionResultado((v) => v + 1);

  } finally {

    setBuscando(false);

  }

}



  
async function copiarResultado() {

  const presupuesto = `📋 PRESUPUESTO

🛠️ Cambio / reparación Otros componentes

💰 Valor Total de la reparación:

${resultado}

────────────────────────────

📱 Presupuesto realizado con la
Calculadora Automática

Grow Educativa & Novacell Repairs`;

  await navigator.clipboard.writeText(presupuesto);

  setCopiado(true);

  setTimeout(() => {
    setCopiado(false);
  }, 1500);

}



  return (

    <div className="min-h-screen flex flex-col">


      <Header showLogout={false} />



      <main className="flex-1 pt-24 pb-8 px-4">


        <div className="max-w-md mx-auto space-y-4">



          <Button
            variant="ghost"
            onClick={onBack}
          >
            Volver
          </Button>





          <Card
            variant="glow"
            padding="lg"
            className="overflow-visible
            bg-[var(--color-primary-suave)]
            "
            
            animate-hudAppear
                    
          >


            <h2 className="text-xl font-bold text-center">
              Calculador Presupuestos <br></br> Cambio / reparación Botones
            </h2>



            <div className="mt-5 space-y-4">




              <SearchBar
                value={modelo}
                onChange={setModelo}
                placeholder="Buscar modelo..."
                suggestions={modelos}
                fullWidth
                onEnter={calcularBotones}
              />


              <Button
                onClick={calcularBotones}
                className="w-full"
                disabled={buscando}
              >

                <Calculator size={18}/>

                {buscando
                  ? "Buscando modelo..."
                  : "Crear Presupuesto"}

              </Button>



              {
                resultado !== "" && (
                <div
                    key={animacionResultado}
                    className="animate-hudAppear"
                  >
                  <Card
                               variant="default"
                     padding="md"
                    className={
                    tipoResultado === "ok"
                    ? `
                      border-green-400
                      shadow-[0_0_25px_rgba(0,255,120,.35)]
                      bg-[rgba(0,40,20,.25)]
                      animate-hudAppear
                    `
                    : `
                      border-yellow-400
                      shadow-[0_0_25px_rgba(255,210,0,.35)]
                      bg-[rgba(70,55,0,.20)]
                      animate-errorPulse
                    `
                    }
                   >


                    <div className="space-y-2">


                      <p className="text-center text-lg font-bold">
                          {resultado}
                      </p>




                      <div className="flex justify-center mt-5">

                          <Button
                          variant="ghost"
                          onClick={copiarResultado}
                          >

                          <Copy size={18}/>

                          Copiar presupuesto

                          </Button>

                          </div>



                      </div>


                  </Card>
                    </div>
                )
              }



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