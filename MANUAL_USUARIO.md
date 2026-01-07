# Manual de Usuario - Gestor de Gastos PWA

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Primeros Pasos](#primeros-pasos)
3. [Registro e Inicio de Sesión](#registro-e-inicio-de-sesión)
4. [Dashboard Principal](#dashboard-principal)
5. [Gestión de Gastos](#gestión-de-gastos)
6. [Gestión de Categorías](#gestión-de-categorías)
7. [Estadísticas](#estadísticas)
8. [Configuración de Tema](#configuración-de-tema)
9. [Instalación como PWA](#instalación-como-pwa)
10. [Uso Offline](#uso-offline)
11. [Preguntas Frecuentes](#preguntas-frecuentes)
12. [Solución de Problemas](#solución-de-problemas)

---

## Introducción

### ¿Qué es Gestor de Gastos?

**Gestor de Gastos** es una aplicación web progresiva (PWA) diseñada para ayudarte a controlar y analizar tus gastos personales de manera simple y eficiente. Puedes usarla desde cualquier navegador web o instalarla como una aplicación en tu computadora o dispositivo móvil.

### Características Principales

- **Registro de Gastos**: Añade, edita y elimina gastos fácilmente
- **Categorías Personalizables**: Organiza tus gastos por categorías con colores
- **Estadísticas Visuales**: Gráficas de pastel y resúmenes detallados
- **Diseño Responsivo**: Interfaz adaptable a móviles, tablets y computadoras
- **Modo Oscuro/Claro**: Cambia entre temas según tu preferencia
- **Instalable**: Funciona como una app nativa en cualquier dispositivo
- **Seguro**: Autenticación con JWT y contraseñas encriptadas
- **Offline**: Funciona sin conexión a internet

### Requisitos del Sistema

- **Navegador Web Moderno**: Chrome, Firefox, Safari, Edge (última versión)
- **Conexión a Internet**: Solo para sincronizar datos
- **Espacio de Almacenamiento**: Mínimo 10 MB libres
- **Dispositivos Compatibles**: Smartphones, tablets, laptops y computadoras de escritorio

### Diseño Responsivo

La aplicación se adapta automáticamente al tamaño de tu pantalla:

- **Móviles (320px - 768px)**: Diseño vertical optimizado, menú hamburguesa, tarjetas apiladas
- **Tablets (769px - 1024px)**: Diseño híbrido, cuadrícula de 2 columnas
- **Escritorio (1025px+)**: Diseño completo, cuadrícula de 3-4 columnas, mayor espacio

Todas las funciones están disponibles en cualquier dispositivo.

---

## Primeros Pasos

### Acceso a la Aplicación

1. Abre tu navegador web
2. Ingresa la URL de la aplicación: `https://tu-dominio.com`
3. Verás la pantalla de inicio de sesión

### Requisitos para Crear una Cuenta

- Nombre completo (mínimo 2 caracteres)
- Correo electrónico válido
- Contraseña segura (mínimo 6 caracteres)

---

## Registro e Inicio de Sesión

### Crear una Cuenta Nueva

#### Paso 1: Acceder al Registro
1. En la pantalla de inicio, haz clic en **"¿No tienes cuenta? Regístrate"**
2. Serás redirigido a la página de registro

#### Paso 2: Completar el Formulario
Ingresa la siguiente información:
- **Nombre**: Tu nombre completo
- **Email**: Tu dirección de correo electrónico
- **Contraseña**: Mínimo 6 caracteres (se recomienda usar letras, números y símbolos)
- **Confirmar Contraseña**: Repite tu contraseña

#### Paso 3: Crear Cuenta
1. Haz clic en el botón **"Registrarse"**
2. Si todos los datos son correctos, verás un mensaje de éxito
3. Serás redirigido automáticamente al dashboard

#### Mensajes de Error Comunes
- **"El email ya está registrado"**: Usa otro email o inicia sesión
- **"Las contraseñas no coinciden"**: Verifica que ambas contraseñas sean iguales
- **"Completa todos los campos"**: Asegúrate de llenar todos los campos

### Iniciar Sesión

#### Paso 1: Ingresar Credenciales
1. En la pantalla de inicio, ingresa tu email y contraseña
2. Haz clic en **"Iniciar Sesión"**

#### Paso 2: Acceso al Dashboard
- Si las credenciales son correctas, accederás al dashboard principal
- Tu sesión permanecerá activa hasta que cierres sesión

#### 💡 Consejo
Marca la página como favorita para acceder más rápido en futuras ocasiones.

### Cerrar Sesión

1. Haz clic en el botón **"Salir"** en la esquina superior derecha
2. Serás redirigido a la página de inicio de sesión
3. Tu sesión se cerrará de forma segura

---

## Dashboard Principal

El **Dashboard** es tu página de inicio donde verás un resumen de tu actividad financiera.

### Elementos del Dashboard

#### 1. Header (Barra Superior)
- **Logo**: "Gestor de Gastos"
- **Botón de Tema**: Botón para cambiar entre modo oscuro y claro
- **Nombre de Usuario**: Tu nombre
- **Botón Salir**: Para cerrar sesión

#### 2. Menú de Navegación
Barra azul con 4 opciones (horizontal en escritorio, adaptable en móviles):
- **Dashboard**: Vista general (página actual)
- **Gastos**: Lista completa de gastos
- **Categorías**: Gestión de categorías
- **Estadísticas**: Gráficas y análisis

**En dispositivos móviles**: El menú se ajusta para ocupar el ancho completo con iconos y texto más compacto.

#### 3. Tarjetas de Resumen
Tres tarjetas mostrando:

**Total Gastado**
- Suma total de todos tus gastos
- Formato: $0.00

**Total Gastos**
- Número total de gastos registrados
- Ejemplo: 25 gastos

**Promedio**
- Promedio del monto por gasto
- Cálculo: Total Gastado ÷ Total Gastos

#### 4. Gastos Recientes
- Lista de los últimos 5 gastos
- Cada gasto muestra:
  - Badge de categoría con color
  - Descripción del gasto
  - Fecha (formato: "d 'de' MMMM, yyyy")
  - Monto en rojo
- Botón **"Ver todos"** para ir a la página de gastos

#### 5. Gastos por Categoría
- Resumen de gastos agrupados por categoría
- Muestra:
  - Color de la categoría
  - Nombre de la categoría
  - Monto total gastado
- Solo muestra las 5 categorías principales

### Navegación

- **Clic en tarjetas**: Las tarjetas de resumen tienen efecto hover
- **Enlaces rápidos**: Usa "Ver todos" para acceder a páginas completas
- **Menú superior**: Navega entre secciones principales

---

## Gestión de Gastos

La página de **Gastos** te permite administrar todos tus registros de gastos.

### Ver Todos los Gastos

1. Haz clic en **"Gastos"** en el menú de navegación
2. Verás una cuadrícula con todos tus gastos
3. Cada tarjeta de gasto muestra:
   - Categoría con badge de color
   - Descripción del gasto
   - Fecha de registro
   - Monto destacado
   - Botones de acción (✏️ Editar, 🗑️ Eliminar)

### Agregar un Nuevo Gasto

#### Paso 1: Abrir el Formulario
1. En la página de Gastos, haz clic en **"Nuevo Gasto"**
2. Se abrirá un modal (ventana emergente)

#### Paso 2: Completar los Datos

**Monto** (obligatorio)
- Ingresa el valor numérico del gasto
- Formato: Solo números y punto decimal
- Ejemplo: 50.75

**Descripción** (obligatorio)
- Describe brevemente el gasto
- Máximo 255 caracteres
- Ejemplo: "Almuerzo en restaurante"

**Categoría** (obligatorio)
- Selecciona una categoría del menú desplegable
- Si no hay categorías, crea una primero en la sección de Categorías

**Fecha** (obligatorio)
- Selecciona la fecha del gasto
- Por defecto: Fecha actual
- Puedes seleccionar fechas pasadas

#### Paso 3: Guardar el Gasto
1. Revisa que todos los campos estén completos
2. Haz clic en **"Guardar"**
3. El gasto aparecerá inmediatamente en la lista
4. Verás una notificación de éxito ✓

#### ❌ Cancelar
- Haz clic en **"Cancelar"** para cerrar sin guardar
- Haz clic fuera del modal para cerrar

### Editar un Gasto Existente

#### Paso 1: Seleccionar el Gasto
1. Busca el gasto que deseas editar
2. Haz clic en el botón **Editar**

#### Paso 2: Modificar los Datos
1. Se abrirá el modal con los datos actuales
2. Modifica los campos que desees cambiar:
   - Monto
   - Descripción
   - Categoría
   - Fecha

#### Paso 3: Guardar Cambios
1. Haz clic en **"Guardar"**
2. Los cambios se aplicarán inmediatamente
3. Verás una notificación de confirmación

### Eliminar un Gasto

#### Advertencia
Esta acción **no se puede deshacer**. Asegúrate de que realmente quieres eliminar el gasto.

#### Paso 1: Seleccionar el Gasto
1. Busca el gasto que deseas eliminar
2. Haz clic en el botón **Eliminar**

#### Paso 2: Confirmar Eliminación
1. Aparecerá un diálogo de confirmación:
   - Título: "¿Estás seguro?"
   - Mensaje: "Esta acción no se puede deshacer"
2. Opciones:
   - **Cancelar**: No elimina nada
   - **Confirmar**: Elimina el gasto

#### Paso 3: Confirmación
- El gasto desaparecerá de la lista
- Verás una notificación de éxito
- Las estadísticas se actualizarán automáticamente

### Filtros y Búsqueda

#### Buscar Gastos (función futura)
- Usa la barra de búsqueda para encontrar gastos específicos
- Busca por descripción, monto o categoría

#### Ordenar Gastos
Los gastos se muestran por defecto:
- Del más reciente al más antiguo
- Formato de cuadrícula adaptable:
  - **Móvil**: 1 columna (tarjetas apiladas)
  - **Tablet**: 2 columnas
  - **Escritorio**: 3-4 columnas según el ancho de pantalla

---

## Gestión de Categorías

Las **Categorías** te ayudan a organizar tus gastos por tipo.

### Ver Categorías Existentes

1. Haz clic en **"Categorías"** en el menú
2. Verás una cuadrícula con todas tus categorías
3. Cada tarjeta muestra:
   - Círculo de color identificativo
   - Nombre de la categoría
   - Botones de acción (✏️ Editar, 🗑️ Eliminar)

### Crear una Nueva Categoría

#### Paso 1: Abrir el Formulario
1. En la página de Categorías, haz clic en **"Nueva Categoría"**
2. Se abrirá un modal

#### Paso 2: Definir la Categoría

**Nombre** (obligatorio)
- Ingresa el nombre de la categoría
- Ejemplos: "Alimentación", "Transporte", "Entretenimiento"
- Máximo 50 caracteres

**Color** (obligatorio)
- Selecciona un color del selector
- El color te ayudará a identificar visualmente la categoría
- Elige colores diferentes para cada categoría

**Paleta de Colores Disponibles:**
- Rojo: #EF4444
- Naranja: #F97316
- Amarillo: #EAB308
- Verde: #22C55E
- Azul: #3B82F6
- Morado: #A855F7
- Café: #A16207
- Gris: #6B7280
- ... y más colores

#### Paso 3: Guardar la Categoría
1. Haz clic en **"Guardar"**
2. La categoría aparecerá en la lista
3. Ya puedes usarla al crear gastos

### Editar una Categoría

#### Paso 1: Seleccionar la Categoría
1. Busca la categoría que deseas editar
2. Haz clic en **Editar**

#### Paso 2: Modificar los Datos
1. Cambia el nombre o el color
2. Haz clic en **"Guardar"**

#### Nota Importante
- Al cambiar una categoría, todos los gastos asociados se actualizarán
- El nuevo nombre/color se aplicará a todos los gastos existentes

### Eliminar una Categoría

#### Advertencia Importante
- No puedes eliminar una categoría que tenga gastos asociados
- Primero debes reasignar o eliminar esos gastos

#### Paso 1: Verificar Gastos
1. Asegúrate de que la categoría no tenga gastos
2. Si tiene gastos, aparecerá un mensaje de error

#### Paso 2: Eliminar
1. Haz clic en **Eliminar**
2. Confirma la eliminación
3. La categoría desaparecerá de la lista

### Categorías Predeterminadas Sugeridas

Al iniciar, te recomendamos crear estas categorías básicas:

1. **Alimentación** - Color Verde
2. **Transporte** - Color Azul
3. **Entretenimiento** - Color Morado
4. **Salud** - Color Rojo
5. **Vivienda** - Color Naranja
6. **Educación** - Color Amarillo
7. **Servicios** - Color Gris
8. **Otros** - Color Café

---

## Estadísticas

La página de **Estadísticas** te proporciona análisis visuales de tus gastos.

### Acceder a Estadísticas

1. Haz clic en **"Estadísticas"** en el menú
2. Verás un panel completo con gráficas y resúmenes

### Selector de Período

Elige el período de tiempo para analizar:

#### Opciones Disponibles

**Este mes**
- Muestra gastos del mes actual
- Desde el día 1 hasta hoy
- Por defecto al abrir la página

**Mes anterior**
- Gastos del mes pasado completo
- Del día 1 al último día del mes

**Todo**
- Todos tus gastos registrados
- Sin límite de fechas

**Personalizado**
- Define tu propio rango de fechas
- Selecciona fecha de inicio y fin
- Útil para análisis específicos

#### Cómo Usar el Período Personalizado

1. Haz clic en el botón **"Personalizado"**
2. Aparecerán dos campos de fecha:
   - **Desde**: Fecha de inicio
   - **Hasta**: Fecha de fin
3. Selecciona las fechas con el selector
4. Las estadísticas se actualizan automáticamente

### Tarjetas de Resumen

Tres tarjetas principales muestran:

#### Total Gastado
- Suma de todos los gastos del período
- Formato: $1,234.56
- Color: Azul

#### Total Gastos
- Cantidad de gastos registrados
- Ejemplo: 42 gastos
- Color: Azul

#### Promedio por Gasto
- Cálculo: Total ÷ Cantidad
- Te ayuda a entender tu gasto típico
- Color: Azul

### Gráfica de Pastel

La gráfica de pastel es la característica estrella de las estadísticas.

#### Elementos de la Gráfica

**Centro del Donut**
- Muestra "Total"
- Monto total del período
- Ejemplo: $1,234.56

**Secciones de Colores**
- Cada color representa una categoría
- El tamaño muestra la proporción del gasto
- Colores coinciden con tus categorías

**Efectos Interactivos**
- **Hover**: Pasa el mouse sobre una sección
  - La sección se agranda
  - Las demás se atenúan
  - Sincroniza con la leyenda
- **Animaciones**: Entrada suave al cargar

#### Leyenda de la Gráfica

Debajo de la gráfica verás tarjetas con:
- **Color**: Cuadro del color de la categoría
- **Nombre**: Nombre de la categoría
- **Monto**: Cantidad gastada ($)
- **Porcentaje**: % del total

**Interacción con la Leyenda:**
1. Pasa el mouse sobre una tarjeta
2. La sección correspondiente en la gráfica se resaltará
3. Fácil identificación de categorías

#### ¿Cómo Interpretar la Gráfica?

**Sección Grande = Mayor Gasto**
- Si "Alimentación" ocupa 50% del círculo
- Significa que gastas el 50% de tu dinero en comida
- Te ayuda a identificar en qué gastas más

**Distribución Equilibrada**
- Secciones de tamaño similar
- Gastos distribuidos uniformemente
- Buen balance financiero

**Sección Dominante**
- Una categoría muy grande
- Indica concentración de gastos
- Considera si es adecuado para tu presupuesto

### Detalle por Categoría

Lista detallada de cada categoría con:

#### Información Mostrada

**Encabezado**
- Punto de color de la categoría
- Nombre de la categoría
- Monto total
- Porcentaje del total

**Barra de Progreso**
- Representación visual del porcentaje
- Color de la categoría
- Animación al cargar

**Información Adicional**
- Número de gastos en esa categoría
- Ejemplo: "15 gastos"

#### Ordenamiento
Las categorías se muestran:
- De mayor a menor monto
- Las más costosas primero
- Fácil identificación de categorías principales

### Análisis y Recomendaciones

#### Consejos para Usar las Estadísticas

**Revisión Mensual**
- Al final de cada mes, revisa tus estadísticas
- Compara "Este mes" vs "Mes anterior"
- Identifica tendencias de gasto

**Identificar Gastos Excesivos**
- Si una categoría domina (>50%)
- Considera reducir gastos en esa área
- Busca alternativas más económicas

**Establecer Límites**
- Usa los porcentajes como guía
- Define límites por categoría
- Ejemplo: Máximo 30% en alimentación

**Comparación Temporal**
- Usa el período personalizado
- Compara diferentes meses
- Identifica meses con más gastos

---

## Configuración de Tema

La aplicación ofrece dos temas visuales para tu comodidad.

### Cambiar entre Modo Claro y Oscuro

#### Ubicación del Botón
- Esquina superior derecha del header
- Al lado de tu nombre de usuario
- Icono de luna (modo oscuro) o sol (modo claro)

#### Cómo Cambiar el Tema

**Método 1: Un Clic**
1. Haz clic en el botón de tema
2. El tema cambia instantáneamente
3. Se guarda automáticamente

**Método 2: Hover**
1. Pasa el mouse sobre el botón
2. Verás un efecto de hover
3. Tooltip indica la acción

### Características de los Temas

#### Modo Claro (Light Mode)
**Ideal para:**
- Uso durante el día
- Ambientes bien iluminados
- Mejor legibilidad con luz natural

**Colores:**
- Fondo: Blanco/Gris claro
- Texto: Negro/Gris oscuro
- Tarjetas: Blanco
- Menú: Azul brillante

#### Modo Oscuro (Dark Mode)
**Ideal para:**
- Uso nocturno
- Reducir fatiga visual
- Ambientes con poca luz
- Ahorrar batería (en pantallas OLED)

**Colores:**
- Fondo: Gris oscuro/Negro
- Texto: Blanco/Gris claro
- Tarjetas: Gris oscuro
- Menú: Azul oscuro

### Persistencia del Tema

**Guardado Automático:**
- Tu preferencia se guarda en localStorage
- Al cerrar y abrir la app, mantiene tu tema
- Funciona en todos los dispositivos donde inicies sesión

**Sincronización:**
- El tema es local a cada dispositivo
- En PC puede ser claro, en móvil oscuro
- Flexibilidad según el dispositivo

### Transiciones Suaves

**Cambio de Tema:**
- Transición animada de 0.3 segundos
- Todos los elementos cambian gradualmente
- Sin parpadeos bruscos
- Experiencia fluida y profesional

---

## Instalación como PWA

Una PWA (Progressive Web App) funciona como una aplicación nativa.

### Ventajas de Instalar

- **Acceso Directo**: Icono en tu escritorio/pantalla
- **Pantalla Completa**: Sin barra de navegación
- **Más Rápida**: Carga instantánea
- **Offline**: Funciona sin internet
- **Notificaciones**: Alertas push (futura implementación)
- **Menos Recursos**: Consume menos que en navegador

### Instalar en Android

#### Opción 1: Chrome
1. Abre la aplicación en Chrome
2. Toca el menú (⋮) en la esquina superior derecha
3. Selecciona **"Agregar a pantalla de inicio"** o **"Instalar app"**
4. Confirma el nombre de la aplicación
5. Toca **"Agregar"** o **"Instalar"**
6. El icono aparecerá en tu pantalla de inicio

#### Opción 2: Banner Automático
1. Al visitar la app varias veces
2. Aparecerá un banner en la parte inferior
3. Toca **"Instalar"**
4. La app se instalará automáticamente

### Instalar en iOS (iPhone/iPad)

#### Safari (único navegador compatible)
1. Abre la aplicación en Safari
2. Toca el botón **Compartir** en la parte inferior
3. Desplázate y toca **"Agregar a pantalla de inicio"**
4. Edita el nombre si lo deseas
5. Toca **"Agregar"**
6. El icono aparecerá en tu pantalla de inicio

**Nota**: Solo Safari soporta PWAs en iOS, Chrome y Firefox no.

### Instalar en Windows

#### Chrome
1. Abre la aplicación en Chrome
2. Busca el icono **⊕** (más) en la barra de direcciones
3. Haz clic en **"Instalar Gestor de Gastos"**
4. En el diálogo, haz clic en **"Instalar"**
5. La app se abrirá en una ventana separada
6. Se creará un acceso directo en el menú inicio y escritorio

#### Edge
1. Abre la aplicación en Edge
2. Haz clic en el icono **⊕** en la barra de direcciones
3. Selecciona **"Instalar Gestor de Gastos"**
4. Haz clic en **"Instalar"**
5. La aplicación se instalará como app de Windows

#### Menú Manual
1. Haz clic en el menú (⋯) en la esquina superior derecha
2. Navega a **"Apps"** → **"Instalar este sitio como aplicación"**
3. Sigue los pasos de instalación

### Instalar en Mac

#### Chrome
1. Abre la aplicación en Chrome
2. Haz clic en el icono **⊕** en la barra de direcciones
3. Selecciona **"Instalar Gestor de Gastos"**
4. La app se instalará en tu carpeta de Aplicaciones

#### Safari
1. Safari no soporta instalación de PWAs completas
2. Usa Chrome o Edge para mejor experiencia

### Verificar la Instalación

**En Móvil:**
- Busca el icono en tu pantalla de inicio
- Icono: 💰 con el nombre "Gestor de Gastos"
- Toca para abrir

**En PC:**
- Busca en el menú inicio (Windows)
- Busca en Aplicaciones (Mac)
- Acceso directo en escritorio (Windows)
- Ícono en la barra de tareas

### Desinstalar la PWA

#### Android
1. Mantén presionado el icono de la app
2. Toca **"Desinstalar"** o **"Información de la app"**
3. Toca **"Desinstalar"**

#### iOS
1. Mantén presionado el icono
2. Toca **"Eliminar app"**
3. Confirma **"Eliminar de pantalla de inicio"**

#### Windows
1. Abre la app instalada
2. Haz clic en el menú (⋯) en la ventana de la app
3. Selecciona **"Desinstalar Gestor de Gastos"**
4. O usa el Panel de Control → Programas → Desinstalar

#### Mac
1. Abre Finder
2. Ve a la carpeta Aplicaciones
3. Arrastra "Gestor de Gastos" a la Papelera

---

## Uso Offline

La aplicación puede funcionar sin conexión a internet.

### Funcionalidad Offline

#### Funciones Disponibles Sin Internet

**Visualización:**
- Ver gastos previamente cargados
- Ver categorías
- Ver estadísticas (datos en caché)
- Navegar entre páginas

**Limitaciones:**
- No puedes crear nuevos gastos
- No puedes editar gastos existentes
- No puedes eliminar gastos
- No puedes crear categorías
- Los datos no se sincronizan

### Cómo Funciona

**Service Worker:**
- La app usa un Service Worker
- Almacena recursos en caché:
  - HTML, CSS, JavaScript
  - Imágenes e iconos
  - Algunos datos

**Estrategia:**
1. **Primero, Caché**: Carga recursos desde caché
2. **Actualización en Segundo Plano**: Actualiza caché con datos nuevos
3. **Fallback**: Si no hay red, usa caché

### Preparar para Uso Offline

#### Paso 1: Precarga de Datos
1. Abre la aplicación con internet
2. Navega por todas las secciones:
   - Dashboard
   - Gastos
   - Categorías
   - Estadísticas
3. Los datos se guardarán en caché

#### Paso 2: Instalar como PWA (Recomendado)
- La instalación mejora el rendimiento offline
- Garantiza que todos los recursos estén disponibles

### Sincronización al Reconectar

**Automática:**
1. Cuando recuperes la conexión
2. La app detectará la red
3. Sincronizará automáticamente
4. Verás los datos actualizados

**Manual:**
- Recarga la página (F5)
- Los datos se actualizarán

### Indicador de Estado de Red

**Sin Conexión:**
- Mensaje en la parte superior (implementación futura)
- "Sin conexión - Modo offline"
- Fondo amarillo/naranja

**Con Conexión:**
- Sin mensaje
- Funcionamiento normal

---

## Preguntas Frecuentes

### Cuenta y Seguridad

**¿Es segura mi información?**
- Sí, usamos encriptación JWT
- Las contraseñas se almacenan con bcrypt (hash)
- Conexión HTTPS segura

**¿Puedo cambiar mi contraseña?**
- Actualmente no desde la app
- Contacta al administrador
- Función en desarrollo

**¿Puedo usar la app sin registrarme?**
- No, necesitas crear una cuenta
- Es necesario para guardar tus datos de forma segura

**¿Qué pasa si olvido mi contraseña?**
- Función de recuperación en desarrollo
- Contacta al administrador del sistema

### Gastos

**¿Puedo agregar gastos de fechas pasadas?**
- Sí, selecciona cualquier fecha en el selector de fechas
- Útil para registrar gastos atrasados

**¿Hay límite de gastos que puedo registrar?**
- No hay límite establecido
- Puedes registrar tantos gastos como necesites

**¿Puedo agregar ingresos?**
- Actualmente solo gastos
- Función de ingresos en planificación

**¿Puedo adjuntar comprobantes?**
- Función en desarrollo
- Próximamente podrás subir imágenes

### Categorías

**¿Cuántas categorías puedo crear?**
- Sin límite específico
- Se recomienda entre 5 y 15 para mejor organización

**¿Puedo usar la misma categoría para diferentes tipos de gastos?**
- Sí, pero se recomienda ser específico
- Mejor análisis con categorías bien definidas

**¿Puedo fusionar dos categorías?**
- No directamente
- Debes reasignar gastos manualmente

### Estadísticas

**¿Cada cuánto se actualizan las estadísticas?**
- En tiempo real
- Al agregar/editar/eliminar un gasto
- Al cambiar el período de tiempo

**¿Puedo exportar las estadísticas?**
- Función en desarrollo
- Exportación a PDF/Excel próximamente

**¿Por qué no aparece la gráfica de pastel?**
- Necesitas tener al menos un gasto registrado
- Verifica que el período seleccionado tenga gastos
- Recarga la página

### Instalación y Rendimiento

**¿Cuánto espacio ocupa la app?**
- Aproximadamente 5-10 MB
- Incluye caché de datos

**¿Funciona en todos los navegadores?**
- Chrome: Completo
- Firefox: Completo
- Safari: Completo (iOS limitado)
- Edge: Completo
- Opera: Completo

**¿Necesito instalarla o puedo usarla en el navegador?**
- Ambas opciones funcionan perfectamente
- Instalada: Mejor rendimiento, experiencia nativa, acceso sin navegador
- Navegador: Acceso rápido sin instalación, mismo diseño responsivo
- El diseño se adapta automáticamente en ambos casos

**¿La app consume muchos datos móviles?**
- No, consume muy pocos datos
- Solo sincroniza cuando hay cambios
- Funciona principalmente offline

### Sincronización

**¿Se sincroniza entre dispositivos?**
- Sí, al iniciar sesión en cualquier dispositivo
- Tus datos están en la nube
- Sincronización automática

**¿Puedo usar la app en múltiples dispositivos?**
- Sí, sin límite de dispositivos
- Inicia sesión con las mismas credenciales

---

## Solución de Problemas

### Problemas de Inicio de Sesión

#### No puedo iniciar sesión

**Problema**: "Email o contraseña incorrectos"

**Soluciones:**
1. Verifica que el email esté escrito correctamente
2. Verifica que no haya espacios extra
3. Asegúrate de usar la contraseña correcta
4. Intenta escribir la contraseña en un bloc de notas primero
5. Verifica que no esté activado Caps Lock

**Problema**: "Error de conexión"

**Soluciones:**
1. Verifica tu conexión a internet
2. Recarga la página (F5)
3. Limpia caché del navegador
4. Intenta en modo incógnito

#### No recibo el email de confirmación

**Soluciones:**
1. Revisa tu carpeta de spam
2. Espera unos minutos (puede tardar)
3. Verifica que el email sea correcto
4. Intenta registrarte nuevamente

### Problemas con Gastos

#### No puedo agregar un gasto

**Problema**: El botón "Guardar" no funciona

**Soluciones:**
1. Verifica que todos los campos estén completos:
   - Monto (número válido)
   - Descripción (texto)
   - Categoría (seleccionada)
   - Fecha (seleccionada)
2. Verifica tu conexión a internet
3. Recarga la página
4. Intenta con un monto diferente (sin caracteres especiales)

**Problema**: El gasto no aparece después de guardarlo

**Soluciones:**
1. Recarga la página (F5)
2. Ve a la página de Gastos
3. Verifica que la fecha sea correcta
4. Revisa si hay filtros activos

#### No puedo eliminar un gasto

**Soluciones:**
1. Verifica tu conexión a internet
2. Recarga la página
3. Intenta desde un navegador diferente
4. Limpia caché del navegador

### Problemas con Categorías

#### No puedo crear categorías

**Soluciones:**
1. Verifica que el nombre no esté vacío
2. Asegúrate de seleccionar un color
3. Verifica tu conexión a internet
4. Recarga la página

#### No puedo eliminar una categoría

**Problema**: "No puedes eliminar una categoría con gastos"

**Solución:**
1. Esta es una protección de datos
2. Primero debes:
   - Reasignar los gastos a otra categoría, o
   - Eliminar los gastos de esa categoría
3. Luego podrás eliminar la categoría

### Problemas con Estadísticas

#### No aparece la gráfica de pastel

**Soluciones:**
1. Asegúrate de tener gastos registrados
2. Verifica que el período seleccionado tenga gastos
3. Recarga la página
4. Limpia caché del navegador:
   - Chrome: Ctrl + Shift + Supr
   - Firefox: Ctrl + Shift + Supr
   - Safari: Cmd + Option + E
5. Actualiza el navegador a la última versión

**Problema**: Los datos no coinciden

**Soluciones:**
1. Recarga la página
2. Verifica el período seleccionado
3. Ve a Gastos y verifica los montos
4. Cierra sesión e inicia nuevamente

### Problemas de Instalación PWA

#### No aparece la opción de instalar

**Soluciones:**
1. Asegúrate de usar un navegador compatible:
   - Chrome (recomendado)
   - Edge
   - Firefox (Android)
2. Visita la app desde HTTPS (no HTTP)
3. Recarga la página varias veces
4. Espera unos segundos después de cargar la página

**Problema**: La app instalada no funciona

**Soluciones:**
1. Desinstala la app
2. Limpia caché del navegador
3. Reinstala la app
4. Verifica tu conexión a internet

### Problemas de Rendimiento

#### La app va lenta

**Soluciones:**
1. Cierra otras pestañas del navegador
2. Reinicia el navegador
3. Limpia caché del navegador
4. Verifica tu conexión a internet
5. Reinicia tu dispositivo

**Problema**: La app consume mucha batería

**Soluciones:**
1. Cierra la app cuando no la uses
2. Reduce el brillo de la pantalla
3. Usa modo oscuro (ahorra batería en OLED)
4. Desactiva ubicación si está activa

### Problemas de Visualización

#### Los elementos se ven mal (desalineados)

**Soluciones:**
1. Recarga la página (Ctrl + F5 o Cmd + Shift + R)
2. Ajusta el zoom del navegador (Ctrl + 0)
3. Actualiza el navegador
4. Limpia caché del navegador

**Problema**: Los colores se ven raros

**Soluciones:**
1. Verifica el tema (claro/oscuro)
2. Desactiva extensiones del navegador
3. Intenta en modo incógnito
4. Actualiza los drivers de tu tarjeta gráfica

### Problemas de Sincronización

#### Los datos no se sincronizan entre dispositivos

**Soluciones:**
1. Verifica que iniciaste sesión con la misma cuenta
2. Recarga la página en ambos dispositivos
3. Espera unos segundos
4. Verifica la conexión a internet
5. Cierra sesión e inicia nuevamente

### Limpieza de Caché (Todas las plataformas)

#### Chrome/Edge (Windows/Mac)
1. Presiona `Ctrl + Shift + Supr` (Windows) o `Cmd + Shift + Supr` (Mac)
2. Selecciona "Imágenes y archivos almacenados en caché"
3. Haz clic en "Borrar datos"

#### Firefox (Windows/Mac)
1. Presiona `Ctrl + Shift + Supr` (Windows) o `Cmd + Shift + Supr` (Mac)
2. Selecciona "Caché"
3. Haz clic en "Limpiar ahora"

#### Safari (Mac)
1. Presiona `Cmd + Option + E`
2. Confirma

#### Chrome/Safari (iOS)
1. Ve a Ajustes → Safari
2. Toca "Borrar historial y datos de sitios web"

#### Chrome (Android)
1. Abre Chrome
2. Menú (⋮) → Historial
3. "Borrar datos de navegación"
4. Selecciona "Imágenes y archivos en caché"

### Contacto para Soporte

Si ninguna solución funciona:

1. **Documenta el problema:**
   - ¿Qué estabas haciendo?
   - ¿Qué mensaje de error apareció?
   - ¿En qué navegador/dispositivo?
   - ¿Tienes conexión a internet?

2. **Toma una captura de pantalla** del error

3. **Contacta al soporte:**
   - Email: soporte@gestorgastos.com (ejemplo)
   - Describe el problema detalladamente
   - Adjunta la captura de pantalla

4. **Información útil para el soporte:**
   - Navegador y versión
   - Sistema operativo
   - Fecha y hora del problema
   - Pasos para reproducir el error

---

## Soporte y Contacto

### Recursos Adicionales

**Documentación Técnica:**
- README.md - Instalación para desarrolladores
- CARACTERISTICAS.md - Lista completa de características

**Tutoriales en Video** (próximamente)
- Canal de YouTube
- Guías paso a paso

**Comunidad:**
- Foro de usuarios (en desarrollo)
- Grupo de Facebook (en desarrollo)

### Feedback y Sugerencias

Tu opinión es importante. Si tienes sugerencias:

1. **Nuevas Características:**
   - ¿Qué te gustaría que agregáramos?
   - ¿Qué mejorarías?

2. **Reportar Bugs:**
   - Describe el problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs actual

3. **Mejoras de Diseño:**
   - Sugerencias de interfaz
   - Colores, fuentes, layouts

### Actualizaciones

**Versión Actual:** 1.0.0

**Próximas Actualizaciones:**
- Exportación a PDF
- Gráficos de líneas
- Presupuestos por categoría
- Gastos recurrentes
- Recordatorios
- Modo multidivisa
- Copias de seguridad

---

## Checklist de Inicio Rápido

Usa este checklist cuando empieces a usar la app:

- [ ] Crear cuenta
- [ ] Iniciar sesión
- [ ] Explorar el dashboard
- [ ] Crear al menos 5 categorías básicas
- [ ] Agregar tu primer gasto
- [ ] Revisar las estadísticas
- [ ] Cambiar el tema (claro/oscuro)
- [ ] Instalar como PWA (opcional)
- [ ] Agregar 10 gastos de ejemplo
- [ ] Revisar la gráfica de pastel
- [ ] Editar un gasto
- [ ] Eliminar un gasto de prueba
- [ ] Cambiar período en estadísticas
- [ ] Cerrar sesión y volver a iniciar

---

## Consejos de Uso Profesional

### Mejores Prácticas

1. **Registro Diario:**
   - Agrega gastos al final del día
   - No dejes acumular para después
   - Toma fotos de tickets como recordatorio

2. **Categorías Claras:**
   - Usa nombres descriptivos
   - No crees demasiadas categorías
   - Revisa y consolida cada 3 meses

3. **Revisión Semanal:**
   - Cada domingo, revisa tu semana
   - Compara con semanas anteriores
   - Ajusta comportamiento si es necesario

4. **Análisis Mensual:**
   - Al final del mes, analiza estadísticas
   - Identifica gastos innecesarios
   - Establece metas para el siguiente mes

5. **Presupuesto Mental:**
   - Define límites por categoría
   - Ejemplo: Máximo $500 en entretenimiento
   - Usa la gráfica para monitorear

6. **Uso Multi-Dispositivo:**
   - Registra gastos desde tu móvil en el momento
   - Analiza estadísticas desde tu computadora
   - La interfaz se adapta automáticamente a cada dispositivo
   - Sincronización instantánea entre dispositivos

### Organización Avanzada

**Nomenclatura de Gastos:**
- Sé específico: "Almuerzo - Restaurante X" mejor que solo "Comida"
- Incluye el lugar: "Gasolina - Estación Shell"
- Agrega detalles: "Mercado semanal" vs "Mercado"

**Uso de Categorías:**
- Subcategorías descriptivas: "Restaurantes", "Supermercado"
- Jerarquía mental: Alimentación → Restaurantes → Específico

**Análisis de Tendencias:**
- Compara mes actual vs anterior
- Identifica patrones: ¿Gastas más al inicio o fin de mes?
- Ajusta comportamiento basándote en datos

---

## Objetivos y Metas

### Usa la App Para:

1. **Autoconocimiento Financiero:**
   - Entender en qué gastas
   - Identificar hábitos
   - Tomar decisiones informadas

2. **Reducción de Gastos:**
   - Identificar gastos superfluos
   - Establecer límites
   - Ahorrar más dinero

3. **Planificación:**
   - Preparar presupuestos
   - Planear compras grandes
   - Ahorrar para metas específicas

4. **Hábitos Saludables:**
   - Desarrollar disciplina financiera
   - Registrar todo consistentemente
   - Revisar periódicamente

---

## Glosario de Términos

**PWA (Progressive Web App):** Aplicación web que funciona como app nativa

**Dashboard:** Página principal con resumen de información

**Categoría:** Clasificación de gastos (Alimentación, Transporte, etc.)

**Gráfica de Pastel:** Gráfico circular que muestra proporciones

**Offline:** Sin conexión a internet

**Service Worker:** Tecnología que permite funcionamiento offline

**Caché:** Almacenamiento temporal de datos para acceso rápido

**JWT (JSON Web Token):** Sistema de autenticación seguro

**Tema:** Esquema de colores (claro u oscuro)

**Responsivo:** Diseño que se adapta automáticamente a diferentes tamaños de pantalla (móviles, tablets, escritorio) reorganizando elementos para óptima visualización

**Modal:** Ventana emergente sobre el contenido principal

**Badge:** Etiqueta visual (como las categorías de colores)

**Hover:** Pasar el mouse sobre un elemento

**Tooltip:** Mensaje que aparece al hacer hover

---

## Notas Finales

Este manual se actualiza constantemente con nuevas características y mejoras.

**Versión del Manual:** 1.0.0  
**Fecha de Actualización:** Diciembre 2025  
**Compatible con App Versión:** 1.0.0

---

¿Tienes preguntas? ¿Encontraste un error en el manual?  
Contáctanos y ayúdanos a mejorar la documentación.

**¡Gracias por usar Gestor de Gastos!**

