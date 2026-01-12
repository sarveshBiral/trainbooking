"use client";

import { useEffect } from 'react';

export default function EnvSync({ env }: { env: Record<string, string> }) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            (window as any).__ENV = env;
        }
    }, [env]);

    // Also initialize immediately for synchronous access if possible, 
    // though useEffect is safer for hydration. 
    // We can attach to a script tag to be faster.
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `window.__ENV = ${JSON.stringify(env)}`,
            }}
        />
    );
}
