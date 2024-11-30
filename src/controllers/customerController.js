import { sanitizeString } from '../middleware/validator.js';

export async function getCustomerOrder(req, res) {
  try {
    const orderId = sanitizeString(req.params.orderId);
    
    const customer = await mongoose.connection
      .collection('customers')
      .findOne({ orderId });

    if (!customer) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // Sanitize response data
    const sanitizedCustomer = {
      orderId: sanitizeString(customer.orderId),
      name: sanitizeString(customer.name),
      email: sanitizeString(customer.email),
      orderStatus: sanitizeString(customer.orderStatus),
      paymentStatus: sanitizeString(customer.paymentStatus),
      totalAmount: parseFloat(customer.totalAmount),
      orderItems: customer.orderItems.map(item => ({
        name: sanitizeString(item.name),
        quantity: parseInt(item.quantity),
        price: parseFloat(item.price),
        size: sanitizeString(item.size),
        image: sanitizeString(item.image)
      }))
    };

    res.json(sanitizedCustomer);
  } catch (error) {
    console.error('Error fetching customer order:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch order details'
    });
  }
}