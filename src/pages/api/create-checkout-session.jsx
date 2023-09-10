const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  // Transform items to match the new line_items structure
  const transformedItems = items.map((item) => ({
    price_data: {
      currency: "usd", // Replace with the appropriate currency
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      },
      unit_amount: 10995, // Replace with the price in cents
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_options: ["shr_1NnXcsCjgOEzN1Xy4x3jhnQ3"],
    shipping_address_collection: {
      allowed_countries: ["US", "GB", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email
    },
  });

  res.status(200).json({ id: session.id });
};
