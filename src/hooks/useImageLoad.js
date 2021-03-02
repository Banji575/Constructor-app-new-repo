const { useEffect, useState } = require("react")

export default (file) => {
    const [imageFile, setImageFile] = useState(file)
    const [url, setUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const doLoad = (file) =>{
            setImageFile(file)
    }

    useEffect(() => {
        if (!imageFile) return

        const fr = new FileReader()
        fr.readAsDataURL(imageFile)
        fr.addEventListener('load', function () {
            setUrl(fr.result)
        /*     isLoading(true) */
        })
    },[imageFile])

    return [url,doLoad]
}