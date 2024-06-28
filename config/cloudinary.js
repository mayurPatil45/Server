const cloudinary = require('cloudinary')

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.TZ_CLOUDINARY_API_SECRET
});

const uploadImage = (banner) => {
    try {
        const result = cloudinary.v2.uploader.upload(banner)
        return result.secure_url;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to upload image")
    }
}

module.exports = uploadImage;