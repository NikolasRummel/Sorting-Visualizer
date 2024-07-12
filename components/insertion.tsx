import React from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

const InsertionSortAverageCaseAnalysis = () => {
    const text = "\n" +
        "The outer loop of insertion sort will be executed $n$ times.\n" +
        "\n" +
        "How many times the inner loop will be executed depends on the order of input elements.\n" +
        "\n" +
        "The statements in each loop take constant time, $\\Theta(1)$.\n" +
        "\n" +
        "Define indicator random variable $I\\{A\\}$ associated with event $A[i] > A[p]$ (key $= A[p]$), i.e., it is necessary to swap $A[i]$ and $A[p]$. In other words, the order of $A[i]$ and $A[p]$ are inverted. Define $X_{ip}$ as\n" +
        "$\n" +
        "X_{ip} = I \\{ A[i] \\text{ and } A[p] \\text{ are inverted} \\} =\n" +
        "\\begin{cases}\n" +
        "1, & \\text{if } A[i] \\text{ and } A[p] \\text{ are inverted} \\\\\n" +
        "0, & \\text{if } A[i] \\text{ and } A[p] \\text{ are not inverted}\n" +
        "\\end{cases}\n" +
        "$\n" +
        "\n\n" +
        "Let $X$ be defined as\n" +
        "$\n" +
        "X = \\sum_{p=2}^{n} \\sum_{i=1}^{p-1} X_{ip}\n" +
        "$\n" +
        "\n" +
        "The running time of insertion sort can be described as\n" +
        "$\n" +
        "T(n) = \\Theta(n + X)\n" +
        "$\n" +
        "\n\n" +
        "The expected value of $X$ is\n" +
        "$\n" +
        "E[X] = E \\left[ \\sum_{p=2}^{n} \\sum_{i=1}^{p-1} X_{ip} \\right] = \\sum_{p=2}^{n} \\sum_{i=1}^{p-1} E[X_{ip}]\n" +
        "$\n" +
        "\n\n" +
        "Since we assume that the input elements are randomly distributed, $E[X_{ip}] = \\frac{1}{2}$.\n" +
        "\n\n\n" +
        "Therefore,\n" +
        "$\n" +
        "E[X] = \\sum_{p=2}^{n} \\sum_{i=1}^{p-1} \\frac{1}{2} = \\frac{1}{2} \\sum_{p=2}^{n} \\sum_{i=1}^{p-1} 1 = \\frac{1}{2} \\sum_{p=2}^{n} (p - 1) = \\frac{1}{2} \\sum_{p=1}^{n-1} p = \\Theta(n^2)\n" +
        "$\n\n" +
        "\n\n\n" +
        "Therefore, if the input elements are randomly distributed, the average-case running time of insertion sort is close to its worst case, $\\Theta(n^2)$.\n" +
        "\n"
    return (
        <Latex>{text}</Latex>
    );
};

export default InsertionSortAverageCaseAnalysis;
