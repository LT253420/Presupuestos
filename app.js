// ==================== Firebase Config (ESM) ====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBW_GYELchHB-VoIc7TR1XPK-tkE4bLutg",
  authDomain: "iniciopruebabeta.firebaseapp.com",
  projectId: "iniciopruebabeta",
  storageBucket: "iniciopruebabeta.firebasestorage.app",
  messagingSenderId: "17837784293",
  appId: "1:17837784293:web:94538fc553b24751b5680c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ==================== 2º factor: configuración ====================
const PASSWORD_HASH = "7a92c8be74878e8ee870f84cc90dcf431a4104dc2d93426a56eb96008699ff52";

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}



// ==================== Helpers UI ====================
function show(id, display = "flex") {
  const el = document.getElementById(id);
  if (el) el.style.display = display;
}

function hide(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "none";
}

// 🔧 CORRECCIÓN REAL: ocultar vistas DE VERDAD
function ocultarTodo() {
  document.querySelectorAll("[data-view]").forEach(view => {
    view.style.display = "none";
    view.classList.remove("hud-appear");
  });
}

function isSecondFactorOk() {
  return sessionStorage.getItem("secondFactorOk") === "1";
}

function setSecondFactorOk(value) {
  sessionStorage.setItem("secondFactorOk", value ? "1" : "0");
}

// ==================== Login / Logout ====================
window.login = () => {
  signInWithPopup(auth, provider)
    .then(() => {
      setSecondFactorOk(false);
      hide("loginContainer");
      show("passwordGate", "flex");

      requestAnimationFrame(() => {
        document.getElementById("passwordGate")?.classList.add("hud-appear");
      });

      hide("appContent");
    })
    .catch(err => {
      console.error("Login error:", err);
      alert("Error al iniciar sesión");
    });
};

window.logout = () => {
  setSecondFactorOk(false);
  signOut(auth).finally(() => {
    show("loginContainer", "block");
    hide("passwordGate");
    hide("appContent");
    hide("logoutBtn");
    const emailText = document.getElementById("emailText");
    if (emailText) emailText.innerText = "";
  });
};

// ==================== 2FA ====================
let redirectTimer = null;

window.verifyPassword = async () => {
  const input = document.getElementById("pwdInput");
  const error = document.getElementById("pwdError");
  if (!input) return;

  if (redirectTimer) {
    clearInterval(redirectTimer.interval);
    clearTimeout(redirectTimer.timeout);
    redirectTimer = null;
  }

  const typedHash = await sha256Hex(input.value.trim());

  if (typedHash === PASSWORD_HASH) {
    input.classList.remove("error", "shake");
    if (error) error.style.display = "none";

    setSecondFactorOk(true);
    hide("passwordGate");
    show("appContent", "flex");
    show("logoutBtn", "inline-block");
  } else {
    input.classList.add("error", "shake");
    setTimeout(() => input.classList.remove("shake"), 400);

    let seconds = 5;
    if (error) {
      error.style.display = "block";
      error.textContent = `❌ Contraseña incorrecta. Redirigiendo en ${seconds}…`;
    }

    redirectTimer = {
      interval: setInterval(() => {
        seconds--;
        if (error && seconds >= 0) {
          error.textContent = `❌ Contraseña incorrecta. Redirigiendo en ${seconds}…`;
        }
        if (seconds <= 0) clearInterval(redirectTimer.interval);
      }, 1000),
      timeout: setTimeout(async () => {
        setSecondFactorOk(false);
        try { await signOut(auth); } catch {}
        location.replace("https://www.google.com/");
      }, 5000)
    };
  }
};

// ==================== Estado de sesión ====================
onAuthStateChanged(auth, user => {
  if (user) {
    const emailText = document.getElementById("emailText");
    if (emailText) emailText.innerText = user.email ?? "";

    hide("loginContainer");
    show("logoutBtn", "inline-block");

    if (isSecondFactorOk()) {
      hide("passwordGate");
      show("appContent", "flex");
    } else {
      show("passwordGate", "flex");
      hide("appContent");
      requestAnimationFrame(() => {
        document.getElementById("passwordGate")?.classList.add("hud-appear");
      });
    }
  } else {
    setSecondFactorOk(false);
    show("loginContainer", "block");
    hide("passwordGate");
    hide("appContent");
    hide("logoutBtn");
  }
});


let navigationStack = [];


// ==================== Navegación ====================
window.mostrarComoUsar = () => {
  mostrarSeccion("usoMenu");
};

window.mostrarContacto = () => {
  mostrarSeccion("contactoMenu");
};

// 🏠 Home: siempre al inicio
window.goToHome = () => {
  mostrarSeccion("mainMenu", true);
};

// 🔙 Volver: un paso atrás real
window.volverA = () => {
  if (navigationStack.length === 0) {
    mostrarSeccion("mainMenu", true);
    return;
  }

  const previous = navigationStack.pop();
  mostrarSeccion(previous);
};


window.toggleTheme = () => {
  document.body.classList.toggle("light-mode");
};

window.mostrarPresupuestos = () => {
  mostrarSeccion("presupuestosMenu");
};

// ==================== Preloader ====================
const preloader = document.getElementById("preloader");
const fill = document.getElementById("progressFill");
const percentText = document.getElementById("percentage");
const smoothProgress = [1, 5, 10, 20, 35, 50, 65, 80, 90, 100];
let progressIndex = 0;

window.onload = () => setTimeout(updateProgress, 200);

function updateProgress() {
  if (progressIndex < smoothProgress.length) {
    const value = smoothProgress[progressIndex];
    if (fill) fill.style.width = value + "%";
    if (percentText) percentText.textContent = value + "%";
    progressIndex++;
    setTimeout(updateProgress, 100);
  } else {
    percentText?.classList.add("flash");
    fill?.classList.add("flash");
    setTimeout(() => {
      if (preloader) preloader.style.display = "none";
      document.getElementById("appContent")?.classList.add("hud-appear");
    }, 500);
  }
}

// ==================== Seguridad básica ====================
document.addEventListener("contextmenu", e => e.preventDefault());

// ==================== Limpieza visual input 2FA ====================
document.getElementById("pwdInput")?.addEventListener("input", () => {
  const input = document.getElementById("pwdInput");
  const error = document.getElementById("pwdError");
  input?.classList.remove("error", "shake");
  if (error) error.style.display = "none";
});



// 🔧 CORRECCIÓN REAL: mostrar vistas DE VERDAD
function mostrarSeccion(id, resetStack = false) {
  const views = document.querySelectorAll("[data-view]");

  // Guardar vista actual antes de cambiar
  if (!resetStack) {
    const visible = [...views].find(v => v.style.display === "flex");
    if (visible && visible.id !== id) {
      navigationStack.push(visible.id);
    }
  } else {
    navigationStack = [];
  }

  // Ocultar todo
  views.forEach(v => {
    v.style.display = "none";
    v.classList.remove("hud-appear");
  });

  const el = document.getElementById(id);
  if (!el) return;

  el.style.display = "flex";

  requestAnimationFrame(() => {
    el.classList.add("hud-appear");
  });
}


window.mostrarPresupuestoModulo = () => {
  mostrarSeccion("calcPantalla");
};

document.addEventListener("DOMContentLoaded", () => {
  mostrarSeccion("mainMenu", true);
});
