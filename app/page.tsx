"use client";
import React, {useEffect} from 'react';
import {Button, buttonVariants} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Check, GithubIcon} from "lucide-react";
import Link from "next/link";
import {ProvidersContext} from "@/app/providers";
import Visualizer from "@/components/vizualizer";
import {mergeSort} from "@/lib/algorithms";
import {generateRandomArray} from "@/lib/utils";
import {AuroraBackground} from "@/components/aurora";
import {motion} from "framer-motion";
import {BackgroundBeams} from "@/components/ui/background-beams";
import {Spotlight} from "@/components/ui/spotlight";

const App: React.FC = () => {
    const {setOpenSidebar} = React.useContext(ProvidersContext);

    const handleOpenSidebar = () => {
        setOpenSidebar(true);
    };

    useEffect(() => {
        setOpenSidebar(false)
    }, []);

    return (
        <div className="App">
            <motion.div
                initial={{opacity: 0.0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
            >
                <div className="relative">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="#9EC9CF"
                    />
                    <div className="absolute h-[40rem] w-full">
                        <BackgroundBeams/>
                    </div>
                    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
                        <div className="text-center lg:text-start space-y-6">
                            <main className="text-3xl font-bold">
                                <h1 className="dark:text-white">
                        <span
                            className="inline bg-gradient-to-r from-[#3DB1FF]  to-[#1F73F9] text-transparent bg-clip-text text-8xl">
                            Algo Explorer
                        </span>{" "}
                                </h1>{" "}
                                <h2 className="inline dark:text-white">
                                    learn{" "}
                                    <span
                                        className="inline bg-gradient-to-r from-[#a61005]  to-[#ff4929] text-transparent bg-clip-text">
                            sorting and searching
                        </span>{" "}
                                    algorithms
                                </h2>
                            </main>

                            <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                                Visualize and understand sorting and search algorithms with interactive animations
                                and clear
                                explanations.
                            </p>

                            <div className="space-y-4 md:space-y-0 md:space-x-4">
                                <Link href={"/quadratic/insertionsort"} passHref legacyBehavior>
                                    <Button className="w-full md:w-1/3" onClick={handleOpenSidebar}>Get
                                        Started</Button>
                                </Link>

                                <a
                                    rel="noreferrer noopener"
                                    href="https://github.com/NikolasRummel/Sorting-Visualizer"
                                    target="_blank"
                                    className={`w-full dark:text-white md:w-1/3 ${buttonVariants({
                                        variant: "outline",
                                    })}`}
                                >
                                    Github Repository
                                    <GithubIcon className="ml-2 w-5 h-5"/>
                                </a>
                            </div>
                        </div>

                        {/* Hero cards sections */}
                        <div className="z-10">
                            <HeroCards/>
                        </div>

                    </section>
                    <div className={"px-16"}>
                        <motion.div
                            initial={{opacity: 0.0}}
                            whileInView={{opacity: 1}}
                            transition={{
                                delay: 0.9,
                                duration: 1.0,
                                ease: "easeInOut",
                            }}>
                            <Visualizer algorithm={"MergeSort"} array={generateRandomArray(100)} isPaused={false}
                                        sortFunction={mergeSort} delay={100} soundMuted={true}/>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default App;

const HeroCards = () => {
    return (

        <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
            {/* Testimonial */}
            <motion.div
                initial={{opacity: 0.0}}
                whileInView={{opacity: 1}}
                transition={{
                    delay: 0.5,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="absolute w-[340px] -top-[15px] left-[5px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <Avatar>
                            <AvatarImage
                                alt=""
                                src="https://avatars.githubusercontent.com/u/11598919?v=4 "
                            />
                            <AvatarFallback>SH</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <CardTitle className="text-lg">Marcel Dittmann</CardTitle>
                            <CardDescription>@lenboxxi</CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent>This tool made understanding algorithms so much easier!</CardContent>
                </Card>
            </motion.div>
            {/* Team */}
            <motion.div
                initial={{opacity: 0.0}}
                whileInView={{opacity: 1}}
                transition={{
                    delay: 0.6,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <Card>
                    <CardHeader className="mt-8 flex justify-center items-center pb-2">
                        <img
                            src="https://avatars.githubusercontent.com/u/51167048?v=4"
                            alt="user avatar"
                            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                        />
                        <CardTitle className="text-center">Nikolas Rummel</CardTitle>
                        <CardDescription className="font-normal text-primary">
                            Creator
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="text-center pb-2 text-sm">
                        <p>
                            I hope you like my small project I have made for the datastructures and algorithms lecture.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
            {/* Features */}
            <motion.div
                initial={{opacity: 0.0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{
                    delay: 0.6,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className={"absolute top-[170px] -left-[5px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10"}
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="flex item-center justify-between">
                            Open Source
                        </CardTitle>
                        <CardDescription>
                            Access all features for free and learn at your own pace.
                        </CardDescription>
                    </CardHeader>
                    <hr className="w-4/5 m-auto mb-4"/>
                    <CardFooter className="flex">
                        <div className="space-y-4">
                            {["Interactive Visualizations", "Comprehensive Descriptions", "Proofs for correctness", "Unlimited Access"].map(
                                (benefit: string) => (
                                    <span
                                        key={benefit}
                                        className="flex"
                                    >
                                    <Check className="text-green-500"/>{" "}
                                        <span className="ml-2">{benefit}</span>
                                </span>
                                )
                            )}
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>

            <motion.div
                initial={{opacity: 0.0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{
                    delay: 0.8,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className={"absolute w-[350px] right-[40px] bottom-[35px] drop-shadow-xl shadow-black/10 dark:shadow-white/10"}
            >
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <Avatar>
                            <AvatarImage
                                alt=""
                                src="https://avatars.githubusercontent.com/u/47144150?v=4"
                            />
                            <AvatarFallback>SH</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <CardTitle className="text-lg">Tim Kleinhans</CardTitle>
                            <CardDescription>@kleinthi</CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent>This tool made understanding algorithms so much easier!</CardContent>
                </Card>
            </motion.div>
        </div>
    );
};
