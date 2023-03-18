import { useEffect, useState } from "react"

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export default function useBreakpoint() {

    const [breakpoint, setBreakpoint] = useState<Breakpoint>();


    function getBreakpoint(width: number) {
        switch(true) {
            case width >= 1400:
                return 'xxl';
            case width < 1400 && width >= 1200:
                return 'xl';
            case width < 1200 && width >= 992:
                return 'lg';
            case width < 992 && width >= 768:
                return 'md';
            default:
                return 'sm';
            
        }
    }

    useEffect(() => {
        if (!breakpoint) {
            setBreakpoint(getBreakpoint(window.innerWidth))
        }
        const handleWindowResize = () => {
            const newBreakpoint = getBreakpoint(window.innerWidth);
            if (newBreakpoint !== breakpoint) setBreakpoint(newBreakpoint)
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return breakpoint;

}