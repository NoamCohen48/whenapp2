import axios from "axios"
import { useEffect, useState } from "react"


const useFetch = (url, method) => {
    const [isPending, setIsPending] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {
        setIsPending(true)

        let request = axios
        switch (method) {
            case "get":
                request = request.get(url)
                break
            case "post":
                request = request.post(url)
                break
            case "put":
                request = request.put(url)
                break
            case "delete":
                request = request.delete(url)
                break
            default:
                request = request.get(url)
                break
        }
        request.then(response => {
            setData(response.data)
        })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setIsPending(false)
            })
    }, [url, method])

    return {isPending, data, error};
}

export default useFetch