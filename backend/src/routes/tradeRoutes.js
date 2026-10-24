const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * @route POST /api/trade/listing/create
 * @desc Record a new marketplace listing in the database
 */
router.post("/listing/create", async (req, res) => {
    try {
        const { listingId, sellerWallet, itemDescription, price } = req.body;
        
        if (!listingId || !sellerWallet || !itemDescription || !price) {
            return res.status(400).json({ success: false, error: "Missing required listing parameters" });
        }

        const query = `
            INSERT INTO listings (listing_id, seller_wallet, item_description, price, status)
            VALUES ($1, $2, $3, $4, 'Active') RETURNING *;
        `;
        const values = [listingId, sellerWallet, itemDescription, price];
        const result = await db.query(query, values);

        res.status(201).json({ success: true, listing: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @route POST /api/trade/listing/purchase
 * @desc Update listing status to Completed following an on-chain purchase
 */
router.post("/listing/purchase", async (req, res) => {
    try {
        const { listingId, buyerWallet } = req.body;

        const query = `
            UPDATE listings 
            SET status = 'Completed', buyer_wallet = $1, updated_at = CURRENT_TIMESTAMP
            WHERE listing_id = $2 AND status = 'Active' RETURNING *;
        `;
        const values = [buyerWallet, listingId];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Listing not found or already sold" });
        }

        res.status(200).json({ success: true, completedListing: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
