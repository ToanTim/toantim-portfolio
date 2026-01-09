import express from 'express';
import { Contact } from '../models/Contact';
import { sendContactEmail } from '../utils/email';

const router = express.Router();

// Submit a contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing required fields' });
    }

    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();

    // Send email notification (optional)
    try {
      await sendContactEmail(name, email, message);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you soon.',
      data: contact,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error submitting contact form' });
  }
});

// Get all contacts (admin only)
router.get('/list', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ success: false, message: 'Error fetching contacts' });
  }
});

// Mark contact as read
router.patch('/:id/read', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ success: false, message: 'Error updating contact' });
  }
});

export default router;
