import Offer from "../models/offer.js";

export const createOffer = async (req, res) => {
    const { title, description, discount, validUntil } = req.body;
    
    try {
      const newOffer = new Offer({
        title,
        description,
        discount,
        validUntil
      });
      await newOffer.save();
      res.status(201).json({ message: 'Offer created successfully!', offer: newOffer });
    } catch (error) {
      res.status(500).json({ message: 'Error creating offer', error });
    }
};
  

export const getAllOffers = async (req, res) => {
    try {
      const offers = await Offer.find();
      res.status(200).json(offers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching offers', error });
    }
};
  

export const getOfferById = async (req, res) => {
    const { id } = req.params;  
  
    try {
      const offer = await Offer.findById(id);
      
      if (!offer) {
        return res.status(404).json({ message: 'Offer not found' });
      }
  
      res.status(200).json(offer);  
    } catch (error) {
      res.status(500).json({ message: 'Error fetching offer', error: error.message });
    }
  };

  
  export const updateOffer = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    
    try {
      const updatedOffer = await Offer.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedOffer) {
        return res.status(404).json({ message: 'Offer not found' });
      }
      res.status(200).json({ message: 'Offer updated successfully', offer: updatedOffer });
    } catch (error) {
      res.status(500).json({ message: 'Error updating offer', error });
    }
  };
  
  
  export const deleteOffer = async (req, res) => {
    const { id } = req.params;
    
    try {
      const deletedOffer = await Offer.findByIdAndDelete(id);
      if (!deletedOffer) {
        return res.status(404).json({ message: 'Offer not found' });
      }
      res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting offer', error });
    }
  };

  
  