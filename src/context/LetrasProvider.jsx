import { useState, createContext } from "react";

const LetrasContext = createContext();

const LetrasProvider = ({ children }) => {
  const [alerta, setAlerta] = useState('');
  const [letra, setLetra] = useState('');
  const [cargando, setCargando] = useState(false)

  const busquedaLetra = async (busqueda) => {
      setCargando(true)
      setAlerta('')
      try {
        const { artista, cancion } = busqueda
        // encodeURIComponent evita que la entrada del usuario altere la ruta de la API
        const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(artista.trim())}/${encodeURIComponent(cancion.trim())}`
        const respuesta = await fetch(url)
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
        const data = await respuesta.json()
        if (typeof data.lyrics !== 'string' || !data.lyrics.trim()) throw new Error('Sin letra')
        setLetra(data.lyrics)
      } catch (error) {
        console.error(error)
        setLetra('')
        setAlerta('Cancion no encontrada')
      } finally {
        setCargando(false)
      }
  }
 
  return (
    <LetrasContext.Provider
      value={{
        alerta,
        setAlerta,
        busquedaLetra,
        letra,
        cargando,
      }}
    >
      {children}
    </LetrasContext.Provider>
  );
};

export { LetrasProvider };
export default LetrasContext;
