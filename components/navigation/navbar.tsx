"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import * as React from "react";
import {Disclosure} from "@headlessui/react";
import {MenuIcon, XIcon} from "lucide-react";
import Sidebar from "@/components/navigation/sidebar";
import ThemeToggle from "@/components/navigation/theme-toggle";
import logoBlack from "@/public/logo_black.png"
import logoWhite from "@/public/logo_white.png"
import {useTheme} from "next-themes";
import Image from "next/image";

interface Props {
    openSidebar: boolean
    setOpenSidebar: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({openSidebar, setOpenSidebar}: Props) => {
    let pathname = usePathname() || "/";

    const { resolvedTheme } = useTheme();
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setIsDarkTheme(resolvedTheme === "dark" || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
            && resolvedTheme !== "light");
    }, [resolvedTheme]);

    if (!mounted) {
        return null;
    }

    const getLogo = () => {
        if (resolvedTheme === "dark" || (isDarkTheme && resolvedTheme !== "light")) {
            return logoWhite;
        } else {
            return logoBlack;
        }
    };

    return (
        <>
            <Disclosure as="nav">
                {({open}) => (
                    <>
                        <div
                            className="px-8 lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-50 lg:backdrop-blur-2xl shadow bg-white dark:bg-black">
                            <div className="flex justfiy-between h-16">

                                {openSidebar && (
                                    <>
                                        <Link href={"/"} className={"h-12 w-32 px-2 mr-2 pt-2.5 self-center"}>
                                            <Image src={getLogo()} alt={"Logo"} width={897} height={262}/>
                                        </Link>
                                    </>
                                )}
                                <button
                                    onClick={() => {
                                        setOpenSidebar(!openSidebar);
                                    }}
                                    className="focus:outline-none"
                                >
                                    {openSidebar && (
                                        <XIcon className="h-6 w-6"/>
                                    )}
                                    {!openSidebar && (
                                        <MenuIcon className="h-6 w-6"/>
                                    )}

                                </button>

                                <div className="flex justify-start">
                                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                                    </div>
                                </div>
                                <div className="flex justify-end w-full">
                                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center justify-end ">
                                        <ThemeToggle/>
                                    </div>
                                </div>

                                <div className="-mr-2 flex items-center sm:hidden">
                                    <ThemeToggle/>
                                    <Disclosure.Button
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 dark:hover:bg-gray-800">
                                        {open ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                                />
                                            </svg>
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="pt-2 pb-3 space-y-1">
                                <Link
                                    href="/"
                                    prefetch
                                    className={`${
                                        pathname == "/"
                                            ? "bg-teal-50 border-teal-500 text-teal-500 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:bg-gray-800"
                                            : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-teal-500 block pl-3 pr-4 py-2 dark:hover:bg-gray-700 border-l-4 text-base font-medium dark:text-white"
                                    } `}
                                >
                                    Home
                                </Link>
                            </div>
                        </Disclosure.Panel>
                    </>

                )}
            </Disclosure>
            <Sidebar open={openSidebar}/>
        </>
    );
}

export default Navbar;