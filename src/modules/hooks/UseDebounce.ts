import { useEffect, useState } from "react";

const useDebouce = <T>(value: T, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const debouncer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(debouncer);
    }, [value, delay]);
    return debouncedValue;
};

export default useDebouce;
