# Porcio — Especificación de Diseño (Design Spec) y Sistema Visual
**Versión:** 1.0  
**Fecha:** 11 de Junio de 2026  
**Diseñador UX/UI:** Equipo Porcio  
**Destinatarios:** Desarrollador de Frontend (React/Tailwind) y Desarrollador de Backend (Node/Express/SQLite)

---

## 1. Introducción y Filosofía de Diseño

**Porcio** es una aplicación de nutrición enfocada en el **método de intercambios por porciones**, eliminando la fricción y la ansiedad asociadas con contar calorías o registrar macronutrientes complejos de forma milimétrica.

### Filosofía UX/UI:
1. **Simplicidad Absoluta:** Un paciente debe poder registrar una porción consumida en **máximo 2 a 3 taps**. El registro no debe ser una tarea, sino un hábito ágil y visual.
2. **Claridad Visual:** Se utilizan colores y barras de progreso llamativos para representar el saldo de porciones consumidas y restantes. "Saber cuánto saldo me queda de un vistazo".
3. **Refuerzo Positivo:** Celebraciones sutiles (como confeti o metas marcadas con un check verde) al completar los objetivos diarios de un grupo de alimentos, fomentando el cumplimiento de hábitos saludables.
4. **Diseño Mobile-First Amigable:** El paciente usará la app principalmente desde su teléfono móvil mientras come o cocina. El nutriólogo usará una versión de escritorio (SaaS) limpia, intuitiva y rápida para monitorear pacientes y ajustar planes.

---

## 2. Sistema de Diseño (Design System)

### 2.1. Paleta de Colores

#### Colores de Marca y UI General
*   **Primary (Menta Saludable):** `#10B981` (Tailwind `emerald-500` / `emerald-600`). Transmite salud, frescura, vitalidad y éxito en el cumplimiento.
*   **Secondary (Naranja Cálido):** `#F59E0B` (Tailwind `amber-500`). Representa energía, nutrición y cercanía. Ideal para acentos y estados preventivos.
*   **Background (Crema Suave / Gris Claro):** `#FAFAF9` (Tailwind `stone-50`) o `#F3F4F6` (Tailwind `gray-100`). Brinda un fondo relajado y limpio.
*   **Card Background:** `#FFFFFF` (Blanco Puro) con sombras suaves `shadow-sm` o `shadow-md` para separar visualmente las tarjetas del fondo.
*   **Neutros de Tipografía:**
    *   **Oscuro Principal:** `#1C1917` (Tailwind `stone-900`) para títulos, textos principales y números grandes.
    *   **Gris Secundario:** `#78716C` (Tailwind `stone-500`) para subtítulos, etiquetas y descripciones cortas.
    *   **Gris de Bordes:** `#E7E5E4` (Tailwind `stone-200`) para divisores y bordes sutiles.

#### Paleta por Grupos de Alimentos
Cada categoría tiene un color semántico e ícono único para que el paciente las identifique al instante:

| Grupo de Alimento | Ícono | Color Hex | Tailwind Classes | Descripción Visual |
| :--- | :---: | :--- | :--- | :--- |
| **Cereales y Tubérculos** | 🌾 | `#F59E0B` | `bg-amber-500`, `text-amber-800`, `bg-amber-50` | Color trigo cálido y reconfortante |
| **Vegetales / Verduras** | 🥦 | `#10B981` | `bg-emerald-500`, `text-emerald-800`, `bg-emerald-50` | Verde jardín intenso y fresco |
| **Frutas** | 🍎 | `#F43F5E` | `bg-rose-500`, `text-rose-800`, `bg-rose-50` | Rojo/rosa vibrante y saludable |
| **Proteínas / Alimentos de Origen Animal** | 🍗 | `#EF4444` | `bg-red-500`, `text-red-800`, `bg-red-50` | Coral/Rojo cálido y enérgico |
| **Lácteos** | 🥛 | `#0EA5E9` | `bg-sky-500`, `text-sky-800`, `bg-sky-50` | Azul cielo limpio y fresco |
| **Grasas** | 🥑 | `#8B5CF6` | `bg-violet-500`, `text-violet-800`, `bg-violet-50` | Púrpura/violeta suave y natural |
| **Azúcares** | 🧁 | `#D946EF` | `bg-fuchsia-500`, `text-fuchsia-800`, `bg-fuchsia-50` | Rosa fucsia divertido (con moderación) |

---

### 2.2. Tipografía y Escala
Se recomienda usar una tipografía sin serifas moderna, redondeada y amigable como **Inter** o **Plus Jakarta Sans**. En entornos móviles, fuentes de sistema (`sans-serif`) funcionan perfectamente.

*   **Títulos de Pantalla (H1):** 24px (`text-2xl`), bold (`font-bold`), color `stone-900`.
*   **Títulos de Tarjeta (H2):** 18px (`text-lg`), semibold (`font-semibold`), color `stone-900`.
*   **Texto Principal / Contadores:** 16px (`text-base`), regular/medium (`font-medium`), color `stone-900`.
*   **Subtítulos / Etiquetas (Caption):** 14px (`text-sm`), regular, color `stone-500`.
*   **Números Grandes de Portas:** 28px - 32px (`text-3xl`), bold, para destacar el balance diario.

---

### 2.3. Componentes de Interfaz Estándar (UI Components)

#### A. Tarjetas de Porciones (Portion Cards)
*   **Contenedor:** `bg-white shadow-sm border border-stone-100 rounded-2xl p-4 flex justify-between items-center`.
*   **Sección Izquierda:** Ícono en círculo de color claro (ej: `bg-amber-50 text-amber-500 w-10 h-10 rounded-full flex items-center justify-center`), seguido del nombre del grupo de alimentos y progreso en barra sutil abajo.
*   **Sección Derecha (Controlador):** Un grupo flex con un botón de restar `[-]` (gris, discreto), el número de porciones consumidas `X / Y`, y el botón de sumar `[+]` (color del grupo, grande y táctil).

#### B. Botones (Buttons)
*   **Botón Primario:** `bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-150 shadow-sm flex items-center justify-center`.
*   **Botón Secundario:** `bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-3 px-6 rounded-xl transition duration-150 border border-stone-200`.
*   **Floating Action Button (FAB):** Botón flotante para Quick-Log de porciones: `fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition duration-150 z-40 text-2xl`.

#### C. Formularios (Form Inputs)
*   **Campos de Texto:** `border border-stone-200 bg-white rounded-xl py-3 px-4 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full`.

---

## 3. Flujo del Paciente (Mobile-First)

El flujo del paciente es móvil, privado y se enfoca en el registro rápido y en la visualización clara de sus límites diarios.

### 3.1. Pantalla 1: Login / Acceso con Código de Invitación
*   **Ruta propuesta:** `/app/patient/login`
*   **UX:** Muchos pacientes son registrados directamente por sus nutricionistas. Para ingresar, simplemente introducen su **Código de Invitación de 6 caracteres** (ej: `PORC-8921`) o su correo electrónico de registro. Esto elimina la molestia de crear contraseñas complejas.

#### Wireframe ASCII:
```
+---------------------------------------------------+
|                     PORCIO                        |
+---------------------------------------------------+
|                                                   |
|                    [  🥑🥦🌾  ]                   |
|                   Porcio App                      |
|                                                   |
|        Simplifica tu alimentación diaria          |
|                                                   |
|   Código de Invitación:                           |
|   +-------------------------------------------+   |
|   |  P  O  R  C  -  8  9  2  1                |   |
|   +-------------------------------------------+   |
|   (Proporcionado por tu nutricionista)            |
|                                                   |
|   o inicia sesión con tu correo:                  |
|   +-------------------------------------------+   |
|   |  paciente@correo.com                      |   |
|   +-------------------------------------------+   |
|                                                   |
|   +-------------------------------------------+   |
|   |             INGRESAR A MI PLAN            |   |
|   +-------------------------------------------+   |
|                                                   |
|           ¿Eres nutricionista? Entra aquí         |
+---------------------------------------------------+
```

---

### 3.2. Pantalla 2: Dashboard Diario (El Corazón de Porcio)
*   **Ruta propuesta:** `/app/patient/dashboard`
*   **UX:** Al iniciar la app, el paciente ve instantáneamente su estado del día.
    *   **Indicador Global:** Una barra de progreso circular o lineal que muestra el total de porciones consumidas hoy frente al total programado (ej: `11 / 18 porciones consumidas`).
    *   **Selector de Fecha:** Un control superior `< Ayer | HOY (12 de Jun) | Mañana >` para revisar registros pasados o registrar retroactivamente.
    *   **Lista de Tarjetas por Grupo:** Cada tarjeta representa un grupo del plan del paciente para ese día. Permite sumar/restar porciones con botones `[+]` y `[-]`.

#### Wireframe ASCII:
```
+---------------------------------------------------+
|  ¡Hola, María!                         [👤 Perfil]|
|  < Ayer  |         HOY (12 de Jun)         |  Sigu >  |
|                                                   |
|  +---------------------------------------------+  |
|  |  TU SALDO DE HOY: 11 / 18 Porciones Cons.   |  |
|  |  ========================------ [61%]       |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  🌾 Cereales           [ - ]  3 / 5  [ + ]  |  |
|  |  ==========------             Quedan: 2     |  |
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  🥦 Verduras           [ - ]  2 / 4  [ + ]  |  |
|  |  =====------                  Quedan: 2     |  |
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  🍎 Frutas             [ - ]  3 / 3  [ + ]  |  |
|  |  ============                 ¡Meta de hoy! |  |
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  🍗 Proteínas          [ - ]  2 / 4  [ + ]  |  |
|  |  ====------                   Quedan: 2     |  |
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  🥛 Lácteos            [ - ]  1 / 2  [ + ]  |  |
|  |  ===------                    Queda: 1      |  |
|  +---------------------------------------------+  |
|                                                   |
|                      [  +  ]                      |
|                                                   |
|     [🏠 Inicio]      [📈 Progreso]      [⚙️ Ajustes] |
+---------------------------------------------------+
```

---

### 3.3. Pantalla 3: Modal / Flujo de Quick-Log (Registrar Porción)
*   **Ruta propuesta o estado:** Abrir desde el botón flotante `(+)` en el dashboard.
*   **UX:** Un panel tipo *bottom sheet* (desde abajo hacia arriba) que muestra una cuadrícula limpia con todos los grupos de alimentos y sus colores correspondientes. Un solo toque en cualquier grupo registra instantáneamente una porción de ese grupo en el plan activo de hoy.

#### Wireframe ASCII:
```
+---------------------------------------------------+
|                                                   |
|  +---------------------------------------------+  |
|  |                  REGISTRAR                  |  |
|  |  ¿Qué consumiste?                           |  |
|  |                                             |  |
|  |  +---------------+       +---------------+  |  |
|  |  |  🌾 Cereales  |       |  🥦 Verduras  |  |  |
|  |  |     (🌾)      |       |     (🥦)      |  |  |
|  |  +---------------+       +---------------+  |  |
|  |  |  🍎 Frutas    |       |  🍗 Proteínas |  |  |
|  |  |     (🍎)      |       |     (🍗)      |  |  |
|  |  +---------------+       +---------------+  |  |
|  |  |  🥛 Lácteos   |       |  🥑 Grasas    |  |  |
|  |  |     (🥛)      |       |     (🥑)      |  |  |
|  |  +---------------+       +---------------+  |  |
|  |                                             |  |
|  |         [ Cerrar / Volver al Inicio ]       |  |
|  +---------------------------------------------+  |
|                                                   |
+---------------------------------------------------+
```

---

### 3.4. Mecanismo de Confirmación con Deshacer (Undo Log - 5s)
*   **Ruta propuesta:** `/app/patient/log/:foodGroupId` (o manejado mediante estado reactivo global en la pantalla del dashboard).
*   **UX Crucial:** Cuando un usuario suma una porción, la UI incrementa instantáneamente el contador en la pantalla y muestra una barra de confirmación deslizante en la parte inferior.
    *   **Barra deslizante (Toast/Banner):** Muestra el mensaje: *"Porción de Cereales agregada con éxito"*.
    *   **Botón Deshacer:** Un botón prominente de `[ DESHACER ]`.
    *   **Temporizador Visual:** Un pequeño círculo de progreso o barra de progreso que se agota progresivamente en **5 segundos**.
    *   **Lógica:** Si el usuario presiona `DESHACER`, el registro se anula inmediatamente de forma local y no se consolida en la base de datos (o se envía un comando `DELETE` si ya se guardó). Esto evita errores de "dedazo" y genera un control total en el usuario sin necesidad de confirmaciones previas tediosas de "Aceptar / Cancelar".

#### Wireframe ASCII de la Alerta:
```
+---------------------------------------------------+
|  🌾 Cereales           [ - ]  4 / 5  [ + ]  |  |
|  ============----             Quedan: 1     |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  ✔ Porción de Cereales agregada con éxito   |  |
|  |                                             |  |
|  |         [   DESHACER (4s)   ]               |  |
|  |  (Círculo de carga que se consume en 5s)    |  |
|  +---------------------------------------------+  |
```

---

### 3.5. Pantalla 4: Vista de Progreso / Historial
*   **Ruta propuesta:** `/app/patient/progress`
*   **UX:** Permite al paciente ver sus rachas diarias de cumplimiento y un historial visual de la semana para sentirse motivado.
    *   **Racha de Cumplimiento (Streak):** Un ícono de fuego 🔥 con el número de días seguidos que ha completado su registro o se ha mantenido dentro de sus porciones límite.
    *   **Gráfico Semanal de Cumplimiento:** Un gráfico de barras sencillo que muestra el porcentaje de porciones consumidas respecto a las programadas cada día de la semana.

#### Wireframe ASCII:
```
+---------------------------------------------------+
|                MI PROGRESO                        |
|                                                   |
|  +---------------------------------------------+  |
|  |  Racha de Cumplimiento:  🔥 5 días seguidos |  |
|  |  Excelente trabajo. Sigue así.              |  |
|  +---------------------------------------------+  |
|                                                   |
|  Porciones consumidas esta semana:                |
|                                                   |
|   100% |     *                                    |
|    80% |  *  *  *     *                           |
|    60% |  *  *  *  *  *  *  *                     |
|    40% |  *  *  *  *  *  *  *                     |
|    20% |  *  *  *  *  *  *  *                     |
|     0% +--L--M--M--J--V--S--D--                   |
|          [9][10][11][12][13][14][15] de Junio     |
|                                                   |
|  Desglose de hoy (Cumplimiento por Grupo):        |
|  - Cereales:  3 / 5 (60%)                         |
|  - Verduras:  4 / 4 (100%) [Meta cumplida! 🎉]    |
|  - Frutas:    3 / 3 (100%) [Meta cumplida! 🎉]    |
|  - Proteínas: 2 / 4 (50%)                         |
|                                                   |
|     [🏠 Inicio]      [📈 Progreso]      [⚙️ Ajustes] |
+---------------------------------------------------+
```

---

## 4. Flujo del Nutriólogo (Desktop Dashboard)

El portal del nutriólogo está optimizado para web de escritorio, lo que permite gestionar una lista de decenas de pacientes de un vistazo y configurar planes de porciones de manera rápida.

### 4.1. Pantalla 5: Dashboard del Nutriólogo & Lista de Pacientes
*   **Ruta propuesta:** `/app/nutritionist/patients`
*   **UX:** Al iniciar sesión, el profesional ve una lista completa de sus pacientes activos.
    *   **Métricas de un vistazo:** Quién ha registrado porciones hoy, qué porcentaje de avance llevan de su plan del día, y quién no ha registrado nada.
    *   **Botón de Acción Rápida:** Botón para invitar a un nuevo paciente destacado en la barra superior.

#### Wireframe ASCII:
```
+---------------------------------------------------------------------------------------+
|  PORCIO  [Nutriólogos]        [👥 Pacientes]   [📝 Plantas]   [⚙️ Ajustes]   [👤 Dr. Pérez]  |
+---------------------------------------------------------------------------------------+
|                                                                                       |
|   MIS PACIENTES (Total: 12)                                    [ + Invitar Paciente ] |
|                                                                                       |
|   Buscar paciente: [ Busque por nombre o correo...        ]  Filtrar por: [ Activos ] |
|                                                                                       |
|   +-------------------------------------------------------------------------------+   |
|   |  Nombre        |  Progreso de Hoy (Porciones consumidas)     |  Estado        |   |
|   +-------------------------------------------------------------------------------+   |
|   |  María Solís   |  ========================------ [61%] 11/18  |  Activo (Hoy)  |   |
|   |  Juan Pérez    |  ==============---------------- [35%]  7/20  |  Activo (Hoy)  |   |
|   |  Ana Ramos     |  ============================== [100%] 15/15 |  ¡Plan OK!  🎉 |   |
|   |  Carlos Ruiz   |  ------------------------------ [0%]   0/16  |  Sin Registro  |   |
|   |  Sofía Díaz    |  ====================---------- [66%] 10/15  |  Activo (Ayer) |   |
|   +-------------------------------------------------------------------------------+   |
|                                                                                       |
|   Soporte técnico: contacto@porcio.app | Licencia Profesional: Activa                 |
+---------------------------------------------------------------------------------------+
```

---

### 4.2. Pantalla 6: Detalle del Paciente
*   **Ruta propuesta:** `/app/nutritionist/patients/:id`
*   **UX:** El nutriólogo hace clic en un paciente para ver su ficha clínica básica, el plan diario que tiene activo, su cumplimiento histórico semanal y su racha de registro. Permite tomar decisiones de ajuste de porciones de inmediato.

#### Wireframe ASCII:
```
+---------------------------------------------------------------------------------------+
|  PORCIO  [Nutriólogos]        < Volver a Pacientes                                    |
+---------------------------------------------------------------------------------------+
|                                                                                       |
|   MARÍA SOLÍS  (maria.solis@correo.com)                                               |
|   Edad: 28 años | Peso: 65 kg | Plan Activo: "Reducción de Grasa"                     |
|                                                                                       |
|   +----------------------------+   +----------------------------------------------+   |
|   |  PLAN DIARIO ACTUAL        |   |  HISTORIAL DE CUMPLIMIENTO SEMANAL           |   |
|   |                            |   |                                              |   |
|   |  - Cereales: 5 porciones   |   |   Lunes:   ===================== [100%] 🎉   |   |
|   |  - Verduras: 4 porciones   |   |   Martes:  ==================---- [85%]      |   |
|   |  - Frutas: 3 porciones     |   |   Miércoles:===================== [100%] 🎉   |   |
|   |  - Proteínas: 4 porciones  |   |   Jueves:  =================----- [80%]      |   |
|   |  - Lácteos: 2 porciones    |   |   Viernes: (En curso) =========== [61%]      |   |
|   |                            |   |                                              |   |
|   |     [ Editar Porciones ]   |   |            [ Ver Reporte Completo ]          |   |
|   +----------------------------+   +----------------------------------------------+   |
|                                                                                       |
|   Última porción registrada: Lácteo (hace 15 minutos)                                 |
+---------------------------------------------------------------------------------------+
```

---

### 4.3. Pantalla 7: Configuración / Edición del Plan de Porciones
*   **Ruta propuesta:** `/app/nutritionist/patients/:id/plan`
*   **UX:** Una pantalla limpia e intuitiva con controles numéricos para ajustar la asignación exacta de porciones diarias por cada grupo de alimentos.
    *   **Controles numéricos:** Botones de restar `[-]` e incrementar `[+]` grandes y legibles.
    *   **Visualización de apoyo:** Una previsualización de cuántos iconos representativos tiene ese número de porciones para dar un sentido de volumen de alimentos real.

#### Wireframe ASCII:
```
+---------------------------------------------------------------------------------------+
|  PORCIO  [Nutriólogos]        Configuración de Plan > María Solís                      |
+---------------------------------------------------------------------------------------+
|                                                                                       |
|   CONFIGURADOR DE PORCIONES DIARIAS                                                   |
|   Establece la cantidad de porciones diarias que el paciente debe consumir por grupo.  |
|                                                                                       |
|   Nombre del Plan: [ Reducción de Grasa                        ]                      |
|                                                                                       |
|   +-------------------------------------------------------------------------------+   |
|   |  Grupo de Alimento          |   Porciones Recomendadas  |   Acciones          |   |
|   +-------------------------------------------------------------------------------+   |
|   |  🌾 Cereales y Tubérculos   |        [ - ]  5  [ + ]     |   (🌾🌾🌾🌾🌾)      |   |
|   |  🥦 Verduras / Vegetales     |        [ - ]  4  [ + ]     |   (🥦🥦🥦🥦)        |   |
|   |  🍎 Frutas                  |        [ - ]  3  [ + ]     |   (🍎🍎🍎)          |   |
|   |  🍗 Proteínas / A.O.A.      |        [ - ]  4  [ + ]     |   (🍗🍗🍗🍗)        |   |
|   |  🥛 Lácteos                 |        [ - ]  2  [ + ]     |   (🥛🥛)            |   |
|   |  🥑 Grasas                  |        [ - ]  3  [ + ]     |   (🥑🥑🥑)          |   |
|   |  🧁 Azúcares                |        [ - ]  1  [ + ]     |   (🧁)              |   |
|   +-------------------------------------------------------------------------------+   |
|                                                                                       |
|                   [ GUARDAR PLAN Y ASIGNAR ]       [ Cancelar ]                       |
+---------------------------------------------------------------------------------------+
```

---

### 4.4. Pantalla 8: Flujo de Invitación de Pacientes
*   **Ruta propuesta:** `/app/nutritionist/invite`
*   **UX:** Para que el paciente pueda usar la app, el nutriólogo lo registra con su nombre y correo. La aplicación genera un **Código de Invitación Único** (ej: `PORC-8921`) y ofrece un botón rápido de "Copiar texto para WhatsApp" con un mensaje prediseñado para compartir instantáneamente por chat privado.

#### Wireframe ASCII:
```
+---------------------------------------------------------------------------------------+
|  PORCIO  [Nutriólogos]        Invitar Paciente                                        |
+---------------------------------------------------------------------------------------+
|                                                                                       |
|   INVITAR NUEVO PACIENTE                                                              |
|   Registra el correo del paciente para generar su cuenta y código de acceso.          |
|                                                                                       |
|   Nombre del Paciente:  [ María Solís                         ]                      |
|   Correo Electrónico:   [ maria.solis@correo.com              ]                      |
|                                                                                       |
|   [ GENERAR INVITACIÓN ]                                                              |
|                                                                                       |
|   ---------------------------------------------------------------------------------   |
|   ¡Invitación Generada Exitosamente! 🎉                                                |
|                                                                                       |
|   Código de Acceso:   [  P O R C - 8 9 2 1  ]   (Copiar código)                       |
|                                                                                       |
|   Enlace de Registro rápido:                                                          |
|   [ https://porcio.app/app/patient/login?code=PORC-8921 ]   (Copiar enlace)           |
|                                                                                       |
|   Mensaje predefinido para compartir por WhatsApp:                                    |
|   +-------------------------------------------------------------------------------+   |
|   | ¡Hola María Solís! He creado tu plan nutricional en Porcio. Descarga la app y |   |
|   | usa el código PORC-8921 para empezar a registrar tus porciones hoy mismo:    |   |
|   | https://porcio.app/app/patient/login?code=PORC-8921                            |   |
|   +-------------------------------------------------------------------------------+   |
|                                                                                       |
|                                                  [ ENVIAR POR CORREO ]  [ FINALIZAR ] |
+---------------------------------------------------------------------------------------+
```

---

## 5. Estados de Interacción (States & Edge Cases)

Para lograr un producto robusto y pulido, los desarrolladores deben programar los siguientes estados especiales:

1.  **Estado Sin Plan Activo (Paciente):**
    *   *Cuándo:* Un paciente inicia sesión pero su nutriólogo aún no le ha creado un plan.
    *   *UI:* Mostrar una ilustración amigable con un texto de apoyo: *"¡Hola! Tu nutriólogo está preparando tu plan de porciones. Te avisaremos en cuanto esté listo."* Botón de ayuda para contactar al especialista.
2.  **Estado Completado / Éxito (Paciente):**
    *   *Cuándo:* El paciente alcanza exactamente el 100% en cualquiera de las categorías del día (ej: consume 4 de 4 verduras).
    *   *UI:* La barra de progreso de la tarjeta cambia a un tono verde vibrante o se marca con un ícono check `🎉` / `✔`. El botón de agregar `[+]` de esa tarjeta se atenúa sutilmente para incentivar a no sobrepasar la meta, aunque se mantiene interactivo por si comió de más.
3.  **Estado de Advertencia por Exceso (Paciente):**
    *   *Cuándo:* El paciente registra más porciones de las programadas en su plan (ej: come 6 de 5 porciones de cereales).
    *   *UI:* La barra de progreso se vuelve de color ámbar/naranja sutil (`bg-amber-500`) y el texto del saldo dice `+1 Exceso` en lugar de mostrar saldo disponible, con un recordatorio amigable: *"Has superado la porción ideal diaria de Cereales."*
4.  **Estado Vacío de Pacientes (Nutriólogo):**
    *   *Cuándo:* Un nutriólogo recién registrado ingresa a su panel y no tiene pacientes.
    *   *UI:* Mostrar una flecha animada apuntando al botón de `[ Invitar Paciente ]` en el centro de la pantalla con una explicación corta de cómo funciona: *"Arranquemos invitando a tu primer paciente para que registre su alimentación en tiempo real."*

---

## 6. Recomendaciones Técnicas de Implementación

### Estructura de Datos Recomendada (SQLite - Sincronizado por el Backend)
Alineado con el diseño UX, el backend y frontend deben estructurar las porciones de la siguiente forma:

1.  **Grupo de Alimentos (Food Groups Seed):**
    ```json
    [
      { "id": 1, "name": "Cereales y Tubérculos", "icon": "🌾", "color": "#F59E0B" },
      { "id": 2, "name": "Verduras", "icon": "🥦", "color": "#10B981" },
      { "id": 3, "name": "Frutas", "icon": "🍎", "color": "#F43F5E" },
      { "id": 4, "name": "Proteínas", "icon": "🍗", "color": "#EF4444" },
      { "id": 5, "name": "Lácteos", "icon": "🥛", "color": "#0EA5E9" },
      { "id": 6, "name": "Grasas", "icon": "🥑", "color": "#8B5CF6" },
      { "id": 7, "name": "Azúcares", "icon": "🧁", "color": "#D946EF" }
    ]
    ```

2.  **Lógica del Deshacer (Undo) en React:**
    Al hacer clic en `[+]` para agregar un log:
    1.  Sumar localmente el contador en el estado de React y mostrar la tarjeta actualizada inmediatamente (Feedback instantáneo).
    2.  Iniciar un temporizador de 5 segundos (`setTimeout`) y mostrar el Toast inferior de deshacer con el countdown visual.
    3.  Si el usuario hace clic en **Deshacer** antes de que termine el timeout, detener el temporizador, revertir el contador localmente y ocultar el toast. No se envía petición al backend.
    4.  Si el timeout finaliza normalmente, realizar la llamada a la API: `POST /api/logs` con `{ food_group_id: X, date: "YYYY-MM-DD" }` para consolidar el registro de forma permanente.

---
**Diseño elaborado con ❤ por el equipo de Porcio. ¡A construir una gran herramienta de salud!**
