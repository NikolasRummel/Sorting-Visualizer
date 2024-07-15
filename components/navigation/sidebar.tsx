"use client";

import React from "react";
import SidebarLink from "@/components/navigation/sidebar-link";
import {
    AlignCenterHorizontalIcon,
    BetweenVerticalStartIcon,
    CircleIcon,
    FastForwardIcon,
    GitCompareIcon, GitForkIcon, GitMergeIcon,
    HomeIcon, NetworkIcon
} from "lucide-react";

interface SidebarProps {
    open: boolean;
}

export default function Sidebar({open}: SidebarProps) {
    let sidebarStyle = open
        ? "transform translate-x-0 w-56 h-full"
        : "transform -translate-x-full";

    return (
        <>
            <div
                className={`fixed top-16 p-4 pl-2 bg-white dark:bg-black transition-transform duration-300 ${sidebarStyle}`}>
                <nav>
                    <ul className="gap-2 mt-2 pl-2">
                        <p className={"text-blue-600 text-sm font-bold uppercase mb-2"}>General</p>
                        <SidebarLink link="/" label="Home" lucidIcon={HomeIcon}/>
                        <SidebarLink link="/all" label="Compare All" lucidIcon={GitCompareIcon}/>

                        <p className={"text-blue-600 text-sm font-bold uppercase mb-2 mt-5"}>Logarithmic</p>
                        <SidebarLink link="/logarithmic/quicksort" label="QuickSort" lucidIcon={FastForwardIcon}/>
                        <SidebarLink link="/logarithmic/mergesort" label="MergeSort" lucidIcon={GitMergeIcon}/>
                        <SidebarLink link="/logarithmic/heapsort" label="Heapsort" lucidIcon={NetworkIcon}/>

                        <p className={"text-blue-600 text-sm font-bold uppercase mt-5"}>Quadratic</p>
                        <SidebarLink link="/quadratic/insertionsort" label="InsertionSort"
                                     lucidIcon={BetweenVerticalStartIcon}/>
                        <SidebarLink link="/quadratic/bubblesort" label="BubbleSort" lucidIcon={CircleIcon}/>
                        <SidebarLink link="/quadratic/odd_even" label="Odd-EvenSort"
                                     lucidIcon={AlignCenterHorizontalIcon}/>

                        <p className={"text-blue-600 text-sm font-bold uppercase mt-5"}>Searching</p>
                        <SidebarLink link="/search/bfs" label="Breadth-First Search" lucidIcon={GitCompareIcon}/>
                        <SidebarLink link="/search/dfs" label="Depth-First Search" lucidIcon={GitForkIcon}/>

                    </ul>
                </nav>
            </div>
        </>
    );
}