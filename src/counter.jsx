import { useState } from "react";

function counter(){

    const[ count, setCount] = useState(0)
        return(
            <>
            <button onClick={ count+1}>+</button></>
        )
}