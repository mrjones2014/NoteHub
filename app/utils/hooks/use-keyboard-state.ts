import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";

export default function useKeyboardState() {
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const keyboardOpenListener = (e: KeyboardEvent) => {
            setKeyboardOpen(true);
            setKeyboardHeight(e.endCoordinates.height);
        };
        const keyboardCloseListener = () => setKeyboardOpen(false);
        Keyboard.addListener("keyboardWillShow", keyboardOpenListener);
        Keyboard.addListener("keyboardWillHide", keyboardCloseListener);

        return () => {
            Keyboard.removeListener("keyboardWillShow", keyboardOpenListener);
            Keyboard.removeListener("keyboardWillHide", keyboardCloseListener);
        };
    }, []);

    return {
        keyboardOpen,
        keyboardHeight,
    };
};
