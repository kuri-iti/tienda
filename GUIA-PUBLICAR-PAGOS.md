# Cómo activar "Pagar todo con Mercado Pago" en tu tienda Kuri Iti

Esta carpeta trae el pequeño servidor (`api/create-preference.js`) que suma
el carrito y genera el cobro en Mercado Pago. No necesitas saber programar,
solo seguir estos pasos una vez.

## 1. Consigue tu clave secreta de Mercado Pago

1. Entra a **mercadopago.cl** y crea una cuenta (o inicia sesión).
2. Ve a **mercadopago.cl/developers/panel** → **Tus integraciones** →
   crea una aplicación (el nombre no importa, por ejemplo "Kuri Iti Web").
3. Dentro de la aplicación, entra a **Credenciales de producción**.
4. Copia el **Access Token** (empieza con `APP_USR-...`). Es secreto: no lo
   escribas en el archivo de la tienda ni lo compartas por chat con nadie,
   solo lo vas a pegar en Vercel en el paso 3.

## 2. Sube esta carpeta a GitHub

1. Crea una cuenta gratis en **github.com** si no tienes.
2. Crea un repositorio nuevo (por ejemplo `kuri-iti-pagos`).
3. Sube estos archivos: `api/create-preference.js`, `package.json`,
   y también `kuri-iti.html` (o el sitio completo de tu tienda).
   Puedes arrastrar los archivos directo desde la página de GitHub,
   sin usar comandos.

## 3. Publica en Vercel (gratis)

1. Entra a **vercel.com** y crea una cuenta con tu mismo GitHub.
2. Clic en **Add New → Project**, elige el repositorio que subiste.
3. Antes de publicar, ve a **Environment Variables** y agrega:
   - `MP_ACCESS_TOKEN` → pega aquí tu Access Token del paso 1.
   - `SITE_URL` → la dirección donde quedará tu tienda (Vercel te la
     muestra antes de terminar, algo como `https://kuri-iti.vercel.app`).
4. Clic en **Deploy**. En un minuto te entrega una URL pública.

## 4. Conecta la tienda con el backend

1. Abre `kuri-iti.html`, busca la línea:
   ```
   const CHECKOUT_API_URL = "";
   ```
2. Pégala así, con tu dominio de Vercel + `/api/create-preference`:
   ```
   const CHECKOUT_API_URL = "https://kuri-iti.vercel.app/api/create-preference";
   ```
3. Guarda y vuelve a subir el archivo a GitHub — Vercel lo actualiza solo.

Listo: el botón **"Pagar todo con Mercado Pago"** del carrito quedará activo,
sumará todos los productos agregados y llevará al cliente a pagar el total
directo con Mercado Pago (tarjetas, transferencia, etc.).

## Si prefieres no hacer esto tú mismo

Puedo guiarte en videollamada imaginaria paso a paso aquí mismo si te
atascas en alguno de estos pasos — solo dime en cuál vas y seguimos desde ahí.
Mientras tanto, el carrito sigue funcionando con "Enviar pedido por WhatsApp"
y con los links de pago individuales por producto, así que tu tienda ya
puede vender sin esperar a que actives esta parte.
