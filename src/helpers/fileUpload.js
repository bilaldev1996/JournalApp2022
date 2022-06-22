

export const fileUpload = async(file) => {

    if(!file) throw new Error('No file to upload')

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dai8kzhvl/upload'

    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', 'journal-app')

    try {
        const response = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if(!response.ok) throw new Error('Something went wrong')

        const fileData = await response.json()
        return fileData.secure_url
        
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }



}