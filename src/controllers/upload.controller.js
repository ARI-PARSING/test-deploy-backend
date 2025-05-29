
const uploadFile = (req, res)=>{
    try{
        return res.status(200).send({
            message: "File uploaded successfully",
            path: req.file?.path,
            file: req.file,
        });
    }catch(err){
        console.error("Error uploading file:", err);
        return res.status(400).send({ message: "File upload failed", error: err.message });
    }
}

export { uploadFile };