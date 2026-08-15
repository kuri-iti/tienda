// api/create-preference.js
//
// Esta función recibe el carrito desde la tienda (index.html),
// le pide a Mercado Pago un cobro por el total exacto, y devuelve
// el link de pago (init_point) al que hay que redirigir al cliente.
//
// La clave secreta de Mercado Pago (Access Token) NUNCA va escrita
// aquí en el código. Se configura como variable de entorno llamada
// MP_ACCESS_TOKEN en el panel de Vercel.

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    return res.status(500).json({
      error: "Falta configurar MP_ACCESS_TOKEN en las variables de entorno de Vercel.",
    });
  }

  const { items } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "El carrito llegó vacío." });
  }

  const cleanItems = items.map((it) => ({
    title: String(it.title || "Producto").slice(0, 120),
    quantity: Math.max(1, parseInt(it.quantity, 10) || 1),
    unit_price: Math.max(0, Number(it.unit_price) || 0),
    currency_id: "CLP",
  }));

  try {
    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        items: cleanItems,
        back_urls: {
          success: process.env.SITE_URL || "https://example.com",
          failure: process.env.SITE_URL || "https://example.com",
          pending: process.env.SITE_URL || "https://example.com",
        },
        auto_return: "approved",
      }),
    });

    const data = await mpRes.json();

    if (!mpRes.ok) {
      return res.status(mpRes.status).json({ error: data.message || "Error de Mercado Pago" });
    }

    return res.status(200).json({ init_point: data.init_point });
  } catch (err) {
    return res.status(500).json({ error: "No se pudo conectar con Mercado Pago." });
  }
}
