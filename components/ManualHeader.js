import { useMoralis } from "react-moralis"
import { useEffect } from "react"
export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis()

    useEffect(()=>{
        if(isWeb3Enabled) return
        if(typeof window !== "undefined"){
            if(window.localStorage.getItem("connected")){
                enableWeb3()
            }
        }
        // enableWeb3()
    }, [isWeb3Enabled])

    // no dependency array: run anytime something re-renders
    // CAREFUL! this can get you into circular renders
    // blank dependency array, run once on load
    // dependencies in array, run anytime something in there changes its value

    useEffect(()=>{
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if(account == null) {
                // disconnected
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? 
                (<div>
                    Connected! to {account.slice(0,6)}...{account.slice(account.length - 4)}
                </div>) : 
                (<button 
                    onClick={async () => {
                        await enableWeb3()
                        if(typeof window !== "undefined"){
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    disabled = {isWeb3EnableLoading}
                >
                    Connect
                </button>)
            }
            
        </div>
    )
}
