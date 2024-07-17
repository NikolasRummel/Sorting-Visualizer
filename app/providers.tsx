"use client"

import * as React from "react"
import {Inter} from "next/font/google";
import Navbar from "@/components/navigation/navbar";
import {ThemeProvider} from "@/components/theme-provider";

interface ProvidersProps {
    children: React.ReactNode;
}

const inter = Inter({subsets: ["latin"]});

export function Providers({children}: ProvidersProps) {

    const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);
    return (
        <ThemeProvider attribute="class">
            <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
            <main className={`min-h-screen z-50 ${openSidebar? "ml-56" : ""}`}>
                {children}
            </main>
        </ThemeProvider>
    );
}