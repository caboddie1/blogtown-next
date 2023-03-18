import React, { useState, Dispatch, SetStateAction, MouseEventHandler } from "react";

type HookReturn = [boolean, MouseEventHandler<HTMLButtonElement>, Dispatch<SetStateAction<boolean>>]

// Custom hooks such start with 'use' to allow React to enforce hook rules
// I am also allowing a default state to be passed in
export default function useToggle(defaultState = false): HookReturn {
    const [active, setActive] = useState<boolean>(defaultState);

    // The toggle method sets the state to the opposite when called
    const toggle = () => setActive((active) => !active);

    // Return an array containing the value, dispatch and toggle
    // This allows you to give appropriate names depending on the use case
    return [active, toggle, setActive ];
}
