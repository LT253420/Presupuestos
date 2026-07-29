/**
 * SEARCHBAR.TSX - COMPONENTE DE BARRA DE BUSQUEDA
 * ===============================================
 *
 * Este componente es el buscador que se usa en SearchScreen.
 * Permite al usuario buscar fallas escribiendo texto.
 *
 * CARACTERISTICAS:
 * --------------
 * - Input con icono de lupa
 * - Muestra sugerencias mientras escribe
 * - Navegacion con teclado (flechas, enter, escape)
 * - Boton para limpiar (X)
 * - Debounce para no buscar en cada tecla
 *
 * COMO USAR:
 * ---------
 * import { SearchBar } from '../components/SearchBar';
 *
 * <SearchBar
 *   value={busqueda}
 *   onChange={setBusqueda}
 *   placeholder="Buscar falla..."
 *   suggestions={listaDeNombres}
 *   autoFocus
 *   fullWidth
 * />
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../utils/helpers';

/**
 * INTERFACE: SearchBarProps
 * ==========================
 */
interface SearchBarProps {
  // Valor controlado (si el padre maneja el estado)
  value?: string;

  // Funcion ejecutada al presionar Enter
  onEnter?: () => void;

  // Funcion ejecutada cuando cambia el texto
  onChange?: (value: string) => void;

  // Funcion ejecutada despues del debounce
  onSearch?: (value: string) => void;

  // Texto placeholder
  placeholder?: string;

  // Lista de sugerencias para mostrar
  suggestions?: string[];

  // Tiempo de debounce en ms (default: 300)
  debounce?: number;

  // Si hacer focus automatico
  autoFocus?: boolean;

  // Si ocupa todo el ancho
  fullWidth?: boolean;
}

/**
 * COMPONENTE: SearchBar
 * =====================
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value: controlledValue,
  onEnter,
  onChange,
  onSearch,
  placeholder = 'Buscar falla...',
  suggestions = [],
  debounce = 300,
  autoFocus = false,
  fullWidth = false,
}) => {
  /**
   * ESTADOS
   * =======
   */
  // Valor interno (si no hay valor controlado)
  const [internalValue, setInternalValue] = useState('');

  // Si mostrar la lista de sugerencias
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Indice de sugerencia activa (para navegacion con teclado)
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  /**
   * VALOR ACTUAL
   * ============
   * Si hay controlledValue, usarlo; si no, usar internalValue.
   * Esto permite usar el componente de forma controlada o no.
   */
  const value = controlledValue ?? internalValue;

  /**
   * SUGERENCIAS FILTRADAS
   * =====================
   * Filtra las sugerencias que coinciden con el valor actual.
   * Limita a 6 resultados para no mostrar lista muy larga.
   */
const filteredSuggestions = suggestions.filter((s) => {

  const texto = value
    .toLowerCase()
    .trim();


  const sugerencia = s
    .toLowerCase()
    .trim();


  // Coincidencia normal
  if (sugerencia.includes(texto)) {
    return true;
  }


  // Separar modelos con /
  const variantes = sugerencia
    .split("/")
    .map(v => v.trim());


  // Buscar dentro de cada variante
  return variantes.some(v =>
    v.includes(texto)
  );


})
.slice(0, );
  /**
   * HANDLECHANGE
   * ============
   * Se ejecuta cuando el usuario escribe.
   */
  const handleChange = useCallback(
    (newValue: string) => {
      setInternalValue(newValue);
      onChange?.(newValue); // Notificar al padre
      setShowSuggestions(newValue.length > 0);
      setActiveSuggestion(-1);
    },
    [onChange]
  );

  /**
   * HANDLECLEAR
   * ===========
   * Limpia el campo de busqueda.
   */
  const handleClear = useCallback(() => {
    handleChange('');
    setShowSuggestions(false);
  }, [handleChange]);

  /**
   * EFFECT: DEBOUNCE
   * ================
   * Espera a que el usuario deje de escribir antes de llamar onSearch.
   * Esto evita llamadas excesivas.
   */
  useEffect(() => {
    if (debounce && value) {
      const timer = setTimeout(() => {
        onSearch?.(value);
      }, debounce);
      return () => clearTimeout(timer);
    }
  }, [value, debounce, onSearch]);

  /**
   * RENDER
   * ======
   */
        return (
          <div className={cn(
        'relative z-50',
        fullWidth && 'w-full'
      )}>
      {/* INPUT CONTAINER */}
      <div className="relative">
        {/* ICONO DE LUPA */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
          <Search size={20} />
        </div>

        {/* CAMPO DE TEXTO */}
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          // Mostrar sugerencias al enfocar (si hay texto)
          onFocus={() => value && setShowSuggestions(true)}
          // Ocultar sugerencias al desenfocar (con delay para permitir click)
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          // NAVEGACION CON TECLADO
          onKeyDown={(e) => {

  if (e.key === 'ArrowDown') {

    setActiveSuggestion((prev) =>
      prev < filteredSuggestions.length - 1
        ? prev + 1
        : prev
    );


  } else if (e.key === 'ArrowUp') {


    setActiveSuggestion((prev) =>
      prev > 0
        ? prev - 1
        : prev
    );


  } else if (e.key === 'Enter') {


    e.preventDefault();


    // Si hay una sugerencia seleccionada
    if (activeSuggestion >= 0) {

      handleChange(
        filteredSuggestions[activeSuggestion]
      );

      setShowSuggestions(false);

    }


    // Ejecutar acción del padre
    onEnter?.();



  } else if (e.key === 'Escape') {


    setShowSuggestions(false);


  }

}}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn(
            'w-full py-3 pl-12 pr-10',
            'bg-[var(--bg-surface)]',
            'border-2 border-[var(--border-color)] rounded-xl',
            'text-[var(--text-primary)] font-mono',
            'placeholder:text-[var(--text-muted)]',
            'transition-all duration-300',
            'shadow-[0_0_15px_var(--color-primary-glow-low)]',
            'focus:outline-none focus:border-[var(--color-primary)]',
            'focus:shadow-[0_0_20px_var(--color-primary-glow-mid)]',
            'focus:bg-[var(--color-primary-subtle)]'
          )}
        />

        {/* BOTON LIMPIAR (X) */}
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2
                       text-[var(--text-muted)] hover:text-[var(--color-primary)]
                       transition-colors duration-150"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* LISTA DE SUGERENCIAS */}
      {showSuggestions && filteredSuggestions.length > 0 && (
  <div
    className={cn(
      'absolute top-full left-0 right-0 mt-2 z-[500]',
      'max-h-80 overflow-y-auto',
      'bg-[var(--bg-elevated)]',
      'border border-[var(--border-color)]',
      'rounded-lg overflow-hidden',
      'shadow-lg shadow-[rgba(0,0,0,0.4)]',
      'animate-fadeInUp'
    )}
  >
    {filteredSuggestions.map((suggestion, index) => (
      <button
        key={suggestion}
        onClick={() => {
          handleChange(suggestion);
          setShowSuggestions(false);
        }}
        className={cn(
          'w-full text-left px-4 py-3',
          'text-[var(--text-secondary)] font-mono text-sm',
          'transition-colors duration-150',
          'hover:bg-[var(--color-primary-subtle)]',
          'hover:text-[var(--color-primary)]',
          index === activeSuggestion &&
          'bg-[var(--color-primary-subtle)]'
        )}
      >
        {suggestion}
      </button>
    ))}
  </div>
)}
    </div>
  );
};
