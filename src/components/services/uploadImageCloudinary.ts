const uploadImageCloudinary = async (file: any) => {

    const fd = new FormData();
    fd.append("file", file);
    fd.append(
        "upload_preset",
        "ml_default"
    );
    fd.append("cloud_name", "djdlzz7hw");

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/djdlzz7hw/image/upload`,
            {
                method: "POST",
                body: fd,
            }
        );
        const res = await response.json();
        return [true, res];
    } catch (error) {
        return [false, error];
    }

}

export default uploadImageCloudinary;