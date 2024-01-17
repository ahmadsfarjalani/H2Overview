export default function ErrorFallback({error}:{error: Error}) {
    return (
        <>
        <p>
            Error Stack {error.stack} 
        </p>
        <p>
            Error Message {error.message}
        </p>
        </>


    )
    }