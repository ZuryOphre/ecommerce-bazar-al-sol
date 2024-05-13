import * as mercadopago from 'mercadopago';

export default async function handler(req, res) {
  // Retrieve shopping cart data from request body
  const cartItems = req.body.cartItems;
  const totalAmount = req.body.totalAmount;

  // Configure MercadoPago with credentials from environment variables
  mercadopago.configure({
    client_id: process.env.NEXT_PUBLIC_MP_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_MP_CLIENT_SECRET,
  });

  // Create a preference object with shopping cart items and total amount
  const preference = {
    items: cartItems.map(item => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      unit_price: item.price,
    })),
    back_urls: {
      success: '/success',
      pending: '/pending',
      failure: '/failure',
    },
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    // Send the preference URL as a response to redirect the user to checkout
    res.status(200).json({ preferenceUrl: response.body.init_point });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Error creating MercadoPago preference: ${err.message}` });
  }
}