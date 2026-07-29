import { Header, Footer, HomeButton } from "../../components/Layout";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import DollarWidget from "../../components/DollarWidget";
import { Calculator, Copy } from "lucide-react";
import { useState } from "react";
import { Input } from "../../components/Input";
import { SearchBar } from "../../components/SearchBar";



interface Props {
  onBack: () => void;
}


export default function TecnicoScreen({ onBack }: Props) {


  const [precio, setPrecio] = useState("");
  const [resultado, setResultado] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [animacionResultado, setAnimacionResultado] = useState(0);
  const [tipoResultado, setTipoResultado] = useState<"ok" | "warning">("ok");

  function redondearTecnico(valor: number) {

  if (valor <= 400) {
    return Math.floor(valor / 10) * 10;
  }

  return Math.ceil(valor / 1000) * 1000;

}

function calcularPresupuesto() {

  const base = Number(precio);

  if (!base || base <= 0) {

    setResultado("⚠️ Ingresá un valor válido");

    setTipoResultado("warning");

    setAnimacionResultado(prev => prev + 1);

    return;

  }

  const conGanancia = base * 2;

  const total = conGanancia * 1.05;

  const final = redondearTecnico(total);

  setResultado(
    `$ ${final.toLocaleString("es-AR")}`
  );

  setTipoResultado("ok");

  setAnimacionResultado(prev => prev + 1);

}


  
async function copiarResultado() {

  const presupuesto = `📋 PRESUPUESTO

🛠️ Servicio Técnico

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
              Calculador Presupuestos para Técnicos
            </h2>



            <div className="mt-5 space-y-4">



              <SearchBar
  value={precio}
  onChange={setPrecio}
  onEnter={calcularPresupuesto}
  placeholder="Costo del repuesto..."
  fullWidth
/>
{/*
<Input
    type="number"
    placeholder="Costo del repuesto..."
    value={precio}
    onChange={(e) => setPrecio(e.target.value)}
/>*/}


<Button
  onClick={calcularPresupuesto}
  className="w-full"
>

  <Calculator size={18}/>
  Crear Presupuesto

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