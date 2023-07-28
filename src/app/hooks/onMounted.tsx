import { useEffect, useState } from 'react'

export function onMounted(callback: () => unknown) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        if (!mounted) {
            setMounted(true)
            callback()
        }
    }, [])
}