
const { useEffect, useState } = require("react")

export default (url) => {
    const urlpref = '&api_key=mwshe2txo5nlz5dw6mvflji7y0srqyrn2l04l99v--tb3ys30i7m9bis2t0aoczw2a280e2e2ddedf8fe9acfe5625949396'
    const [response, setResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [option, setOption] = useState({})
    const doFetch = (option) => {
        setOption(option)
        setIsLoading(true)
    }

    useEffect(() => {
        if (!isLoading) {
            return
        }
        const body = option ? {
            method: 'POST',
            body: option
        } : null
        fetch(url+urlpref, body ).then(resp => resp.json())
            .then(json => {
                setResponse(json)
                setIsLoading(false)
            })
    }, [isLoading,option, url])
    return [response, doFetch]
}

