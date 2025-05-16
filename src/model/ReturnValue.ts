import ResponseEntity from "./ResponseEntity"

type ReturnValue = {
    response: ResponseEntity | null
    error: string
}

export default ReturnValue;