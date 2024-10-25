const Photo = require('../models/photoModel');

// API endpoint to return paginated and sorted data
exports.getPhotos = async (req, res) => {
    const { page = 1, limit = 10, orderBy = 'id', order = 'asc' } = req.query;

    try {
        // Sorting order
        const sortOrder = order === 'asc' ? 1 : -1;

        // Pagination logic
        const photos = await Photo.find()
            .sort({ [orderBy]: sortOrder })   // Sort by orderBy field
            .skip((page - 1) * limit)         // Skip items for pagination
            .limit(parseInt(limit));          // Limit number of items per page

        // Total number of photos
        const totalItems = await Photo.countDocuments();

        res.json({
            page: parseInt(page),
            limit: parseInt(limit),
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            data: photos
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching photos", error });
    }
};
