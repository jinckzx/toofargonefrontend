import { body, param, validationResult } from 'express-validator';
import sanitizeHtml from 'sanitize-html';
import xss from 'xss';

// Sanitize string inputs
export const sanitizeString = (value) => {
  if (typeof value !== 'string') return value;
  return xss(sanitizeHtml(value.trim()));
};

// Validation middleware for orderId
export const validateOrderId = [
  param('orderId')
    .trim()
    .notEmpty().withMessage('Order ID is required')
    .isAlphanumeric().withMessage('Order ID must contain only letters and numbers')
    .isLength({ min: 8, max: 24 }).withMessage('Order ID must be between 8 and 24 characters'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: 'error',
        errors: errors.array()
      });
    }
    // Sanitize the orderId
    req.params.orderId = sanitizeString(req.params.orderId);
    next();
  }
];