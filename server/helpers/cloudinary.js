const cloudinary = require('cloudinary').v2
const multer = require('multer');

cloudinary.config({
    cloud_name : 'dlpl3tikm',
    api_key : '438172292921458',
    api_secret : "11QTCWH05vc1dXfPoW_mgsErB6g"
});


const storage = new multer.memoryStorage();

async function imageUploadutil(file) {
    const result = await cloudinary.uploader.upload(file, {resource_type : 'auto'}
    )

    return result;
}

const upload = multer({ storage })

module.exports = { upload, imageUploadutil};