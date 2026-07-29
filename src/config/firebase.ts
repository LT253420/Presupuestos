/**
 * CONFIGURACION DE FIREBASE
 * ========================
 *
 * Este archivo contiene la configuracion de Firebase para autenticacion con Google.
 * Firebase es un servicio de Google que permite agregar funcionalidades como:
 * - Autenticacion con Google, Facebook, Email, etc.
 * - Base de datos en tiempo real
 * - Almacenamiento de archivos
 * - Hosting de aplicaciones
 *
 * COMO FUNCIONA:
 * 1. Firebase proporciona un objeto "app" que inicializa la conexion
 * 2. De ese objeto "app" se extrae el modulo de autenticacion (auth)
 * 3. El auth permite usar el proveedor de Google para iniciar sesion
 *
 * INSTRUCCIONES SI NECESITAS CAMBIAR ESTA CONFIGURACION:
 * 1. Ve a https://console.firebase.google.com/
 * 2. Crea un proyecto (o usa uno existente)
 * 3. En "Configuracion del proyecto" > "Tus aplicaciones" > "Web"
 * 4. Copia el objeto firebaseConfig que te proporcionan
 * 5. Pega los valores aqui abajo
 */

// Importamos las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

/**
 * CONFIGURACION DEL PROYECTO FIREBASE
 * -----------------------------------
 * Esta configuracion es proporcionada por Firebase Console.
 * Cada proyecto tiene valores unicos que identifican tu aplicacion.
 */
const firebaseConfig = {
  // API Key: Clave publica que identifica tu proyecto (NO es secreta)
  apiKey: 'AIzaSyCbZk6vwd-t6NPUCPvL6MCfW7W1nITW3K4',

  // Auth Domain: Dominio autorizado para autenticacion
  authDomain: 'presupuestos-grow.firebaseapp.com',

  // Project ID: Identificador unico del proyecto en Firebase
  projectId: 'presupuestos-grow',

  // Storage Bucket: Donde se guardan archivos (no usado en este proyecto)
  storageBucket: 'presupuestos-grow.firebasestorage.app',

  // Messaging Sender ID: ID para notificaciones push (no usado aqui)
  messagingSenderId: '801106069332',

  // App ID: Identificador de esta aplicacion web especifica
  appId: '1:801106069332:web:031a72ad3a51ff24f56ac1',
};

/**
 * INICIALIZACION DE FIREBASE
 * --------------------------
 * initializeApp() crea la conexion con Firebase usando la configuracion.
 * Esto debe hacerse UNA sola vez al iniciar la aplicacion.
 */
const app = initializeApp(firebaseConfig);

/**
 * SERVICIO DE AUTENTICACION
 * -------------------------
 * getAuth() obtiene el objeto de autenticacion desde la app de Firebase.
 * Este objeto tiene todos los metodos para:
 * - Iniciar sesion (signInWithPopup, signInWithRedirect)
 * - Cerrar sesion (signOut)
 * - Ver el usuario actual (currentUser)
 * - Escuchar cambios de sesion (onAuthStateChanged)
 */
export const auth = getAuth(app);

/**
 * PROVEEDOR DE GOOGLE
 * -------------------
 * GoogleAuthProvider es el "puente" entre Firebase y Google.
 * Cuando el usuario hace clic en "Acceder con Google":
 * 1. Firebase abre una ventana popup de Google
 * 2. El usuario selecciona su cuenta de Google
 * 3. Google devuelve los datos del usuario a Firebase
 * 4. Firebase guarda la sesion y nos avisa
 */
export const googleProvider = new GoogleAuthProvider();

/**
 * CONFIGURACION ADICIONAL DEL PROVEEDOR
 * ------------------------------------
 * setCustomParameters permite personalizar la pantalla de login de Google.
 * 'login_hint' puede usarse para sugerir un email especifico.
 * 'prompt': 'select_account' fuerza a mostrar el selector de cuentas.
 */
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

/**
 * EXPORTACION POR DEFECTO
 * -----------------------
 * Exportamos la app inicializada por si se necesita en otros archivos.
 * Ejemplo de uso en otro archivo:
 *   import { auth, googleProvider } from './config/firebase';
 */
export default app;
