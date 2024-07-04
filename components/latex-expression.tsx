import React from 'react';
import Latex from "react-latex-next";
import 'katex/dist/katex.min.css';

interface LatexExpressionProps {
    text: string;
}

const LatexExpression = ({text}: LatexExpressionProps) => {
    return (
        <Latex>{"$" + text + "$"}</Latex>
    );
};

export default LatexExpression;