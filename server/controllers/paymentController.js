import User from '../models/Users.js';

// @desc    Simulate creating a payment order
// @route   POST /api/payment/create-order
export const createOrder = async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findById(req.user._id); 
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Instantly return a fake order ID
    res.json({ 
      success: true, 
      order: {
        id: `dummy_order_${Date.now()}`,
        amount: 9900 // ₹99.00
      }
    });

  } catch (error) {
    console.error('Order Error:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};


// @desc    Simulate verifying payment & add dynamic credits
// @route   POST /api/payment/verify
export const verifyPayment = async (req, res) => {
  try {
    const { creditsToAdd } = req.body; // Accept the specific plan amount
    
    const user = await User.findById(req.user._id);
    user.credits += (creditsToAdd || 100); 
    await user.save();

    res.json({ 
      success: true, 
      message: `Dummy Payment successful! Added ${creditsToAdd} Credits. 🎉`, 
      credits: user.credits 
    });

  } catch (error) {
    console.error('Verification Error:', error);
    res.status(500).json({ message: 'Server error during verification' });
  }
};