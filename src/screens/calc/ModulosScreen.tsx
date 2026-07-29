import { Header, Footer, HomeButton } from "../../components/Layout";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import DollarWidget from "../../components/DollarWidget";
import { SearchBar } from "../../components/SearchBar";
import { useMemo, useState } from "react";
import { Search, Copy, Check } from "lucide-react";


import { modulos } from "../../data/repuestos";


interface Props {
  onBack: () => void;
}


export default function ModulosScreen({ onBack }: Props) {


  const [modelo, setModelo] = useState("");
  const [resultado, setResultado] = useState<string[]>([]);
  const [textoPresupuesto, setTextoPresupuesto] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [animacionResultado, setAnimacionResultado] = useState(0);
  const [tipoResultado, setTipoResultado] = useState<"ok" | "warning">("ok");


  function redondearPrecio(valor: number) {

    if (valor < 100) {
      return Math.floor(valor / 10) * 10;
    }

    return Math.ceil(valor / 1000) * 1000;

  }



  function normalizarTexto(texto: string) {

    return texto
      .toUpperCase()
      .replace(/\s+/g, " ")
      .trim();

  }



  const modelosIndexados = useMemo(() => {

    const mapa = new Map<string, number[]>();


    modulos.forEach((item) => {

      const key = normalizarTexto(item.modelo);


      if (!mapa.has(key)) {
        mapa.set(key, []);
      }


      mapa.get(key)!.push(item.precio);

    });


    return mapa;


  }, []);



  const modelos = useMemo(() => {

    return [
      ...modelosIndexados.keys()
    ].sort();


  }, [modelosIndexados]);


<div className="space-y-4">


</div>


  function buscarModelo() {

  const texto = normalizarTexto(modelo);


  if (!texto) {

    setResultado([
      "⚠️ Ingresá un modelo"
    ]);

    setAnimacionResultado(prev => prev + 1);
    setTipoResultado("warning");
    return;

  }


  let encontrado: string | null = null;


  for (const nombre of modelos) {


    const variantes = [
  nombre,
  ...nombre
    .split("/")
    .map((v) => v.trim())
    ];


    const palabrasBusqueda = texto.split(" ");


    if (
      variantes.some((v) => {

        const palabrasModelo = normalizarTexto(v)
          .split(" ");


        return palabrasModelo.every((palabra) =>
          palabrasBusqueda.includes(palabra)
        );

      })
    ) {

      encontrado = nombre;
      break;

    }

  }



  if (!encontrado) {

    setResultado([
      "⚠️ Modelo no encontrado / SIN STOCK"
    ]);

    setAnimacionResultado(prev => prev + 1);
    setTipoResultado("warning");
    return;

  }



  const precios = modelosIndexados.get(encontrado)!;



  const lista = precios.map((precio) => {


    const venta = redondearPrecio(
      precio * 2.10
    );


    return `$ ${venta.toLocaleString("es-AR")}`;


  });



  setResultado(lista);
  setTextoPresupuesto(
  `📋 PRESUPUESTO

  🔧 Cambio de módulo

  💰 Valor de la reparación:
  ${lista.join("\n")}

  ────────────────────

  📱 Presupuesto generado automáticamente
  por Grow Educativa & Novacell Repairs`
  );
  setAnimacionResultado(prev => prev + 1);
  setTipoResultado("ok");

}async function copiarResultado() {

  const presupuesto = `📋 PRESUPUESTO

🔧 Cambio de módulo

💰 Valor de la reparación:
${resultado.join("\n")}

────────────────────────────

📱 Presupuesto realizado con la
Calculadora Automática

By Grow Educativa & Novacell Repairs`;

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
            hoverable
            animate-hudAppear
                    
          >


            <h2 className="text-xl font-bold text-center">
              Calculadora de Módulos
            </h2>



            <div className="mt-5 space-y-4">



              <SearchBar
  value={modelo}
  onChange={setModelo}
  placeholder="Buscar modelo..."
  suggestions={modelos}
  fullWidth
  onEnter={buscarModelo}
/>


<Button
  onClick={buscarModelo}
  className="w-full"
>

  <Search size={18}/>
  Buscar módulo

</Button>


              {
                resultado.length > 0 && (
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


                      {
                        resultado.map((item, index) => (

                          <p
                            key={index}
                            className="text-center"
                          >
                            {item}
                          </p>

                        ))
                      }




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