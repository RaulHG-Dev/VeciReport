import { useState } from "react";

export function MyAwesomeApp() {
    const [count, setCount] = useState(0);

    const name = "Raul HG";
    const handleClick = () => {
        setCount(count + 1);
    }

    return (
        <>
            <h1>Hecho por {name}</h1>
            <button
                onClick={handleClick}
            >Click me</button>
            <p>Has hecho click {count} veces</p>
        </>
    )
}