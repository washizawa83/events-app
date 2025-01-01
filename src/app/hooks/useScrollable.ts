import { RefObject, useEffect, useState } from "react"

export type State = {
    top: boolean,
    bottom: boolean
}

export const useScrollable = (ref: RefObject<HTMLElement | null>): State => {
    const [state, setState] = useState<State>({top: false, bottom: false})
    
    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const {scrollTop, scrollHeight, clientHeight} = ref.current
                setState({
                    top: scrollTop > 0,
                    bottom: clientHeight !== scrollHeight && scrollTop + clientHeight < scrollHeight
                })
            }
        }
        handleScroll()

        if (ref.current) {
            ref.current.addEventListener('scroll', handleScroll)
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener('scroll', handleScroll)
            }
        }
    }, [ref.current])

    return state
}