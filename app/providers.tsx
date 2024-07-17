"use client";

import * as React from "react";
import Navbar from "@/components/navigation/navbar";
import { ThemeProvider } from "@/components/theme-provider";

interface ProvidersProps {
    children: React.ReactNode;
}

interface ProvidersContextType {
    openSidebar: boolean;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProvidersContext = React.createContext<ProvidersContextType>({
    openSidebar: false,
    setOpenSidebar: () => {},
});

export function Providers({ children }: ProvidersProps) {
    const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);

    return (
        <ProvidersContext.Provider value={{ openSidebar, setOpenSidebar }}>
            <ThemeProvider attribute="class">
                <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                <main className={`min-h-screen ${openSidebar ? "ml-56" : ""}`}>
                    {children}
                </main>
            </ThemeProvider>
        </ProvidersContext.Provider>
    );
}
