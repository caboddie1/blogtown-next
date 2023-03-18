import React, { useState } from 'react';
import Loading from './loading';

export default function LoadingTest() {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <>
            <div style={{ width: 800, height: 400}}>
                <Loading isLoading={isLoading}>
                    <div>
                        Some content
                    </div>
                </Loading>
            </div>
            <button 
                onClick={() => setIsLoading(state => !state)}
            >
                Toggle
            </button>
        </>

    )
}
