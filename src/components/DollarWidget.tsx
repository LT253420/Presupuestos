import { useState, useEffect } from "react";
import { DollarSign, X } from "lucide-react";
import { Card } from "./Card";

export default function DollarWidget() {
  const [open, setOpen] = useState(false);


  const [oficial, setOficial] = useState<any>(null);
const [blue, setBlue] = useState<any>(null);
const [loading, setLoading] = useState(false);

useEffect(() => {

  if (!open) return;

  const cargar = async () => {

    try {

      setLoading(true);

      const [oficialRes, blueRes] = await Promise.all([
        fetch("https://dolarapi.com/v1/dolares/oficial"),
        fetch("https://dolarapi.com/v1/dolares/blue")
      ]);

      setOficial(await oficialRes.json());
      setBlue(await blueRes.json());

    } catch (e) {

      console.error(e);

    } finally {

      setLoading(false);

    }

  };

  cargar();

}, [open]);

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <button
        onClick={() => setOpen(!open)}
        className="
        fixed
        bottom-24
        right-6
        z-[11000]
        w-14
        h-14
        rounded-full

        flex
        items-center
        justify-center

        border
        border-[var(--border-color)]

        bg-[var(--bg-surface)]

        text-[var(--color-primary)]

        shadow-lg

        backdrop-blur-md

        transition-all
        duration-300
        ease-out

        hover:scale-110
        hover:border-[var(--color-primary)]
        hover:shadow-[0_0_18px_var(--color-primary)]

        active:scale-95
        animate-usdGlow
        "
      >
       {open ? (
        <X size={20} />
        ) : (
        <span
            className="
            font-mono
            font-bold
            tracking-wide
            text-sm
            select-none
            "
        >
            USD
        </span>
        )}
      </button>

      {/* CARD */}
        {open && (
        <div
          className="
            fixed
            inset-0
            z-[10000]

            bg-black/05

            backdrop-blur-sm

            flex
            items-center
            justify-center

            animate-fadeIn
            "
        >
          <Card
            variant="glow"
            padding="lg"
            className="
              w-full
              max-w-md
              animate-dollarOpen
            "
          >
            <h2 className="font-mono text-xl text-center mb-6">
              Cotización USD
            </h2>

            <div className="space-y-6">

              <Card variant="bordered" padding="md">

                <h3 className="font-bold mb-4">
                  🇦🇷 Dólar Oficial
                </h3>

                <div className="flex justify-between">
                  <span>Compra</span>
                  <span>
                    {
                    loading
                    ? "..."
                    : `$ ${oficial?.compra?.toLocaleString("es-AR")}`
                    }
                    </span>
                </div>

                <div className="flex justify-between">
                  <span>Venta</span>
                  <span>
                    {
                    loading
                    ? "..."
                    : `$ ${oficial?.venta?.toLocaleString("es-AR")}`
                    }
                    </span>
                </div>
              </Card>
              <p className="text-xs text-center mt-4 opacity-60">
                Actualizado:
                {" "}
                {oficial &&
                new Date(oficial.fechaActualizacion).toLocaleString("es-AR")}
                </p>

              <Card variant="bordered" padding="md">

                <h3 className="font-bold mb-4">
                  💵 Dólar Blue
                </h3>

                <div className="flex justify-between">
                  <span>Compra</span>
                  <span>
                    {
                    loading
                    ? "..."
                    : `$ ${blue?.compra?.toLocaleString("es-AR")}`
                    }
                    </span>
                </div>

                <div className="flex justify-between">
                  <span>Venta</span>
                  <span>
                {
                loading
                ? "..."
                : `$ ${blue?.venta?.toLocaleString("es-AR")}`
                }
                </span> 
                </div>

              </Card>

            </div>
            <p className="text-xs text-center mt-4 opacity-60">
            Actualizado:
            {" "}
            {blue &&
            new Date(blue.fechaActualizacion).toLocaleString("es-AR")}
            </p>
            
          </Card>
        </div>
      )}
    </>
  );
}