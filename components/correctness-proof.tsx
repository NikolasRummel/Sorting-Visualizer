import React from 'react';

const CorrectnessProof = () => {
    return (
        <div>
            <span className="text-xl font-semibold">Proof of Correctness</span>
            <span className="block mt-2">
                In order to prove the correctness of an algorithm, i.e., that it will work for any input set, we construct a loop invariant, which is a condition that holds for each iteration of the loop (thus the name invariant). Then the proof consists of verifying that the algorithm maintains the loop invariant for three conditions:
            </span>
            <ol className="list-decimal ml-5 mt-2">
                <li><strong>Initialization:</strong> The loop invariant holds prior to the first iteration.</li>
                <li><strong>Maintenance:</strong> If the loop invariant is true prior to an iteration, then it is still true after the iteration.</li>
                <li><strong>Termination:</strong> The loop invariant is true when the loop terminates, i.e., after the last iteration, thus producing the desired result.</li>
            </ol>
            <span className="block mt-2">
                Note: This procedure is similar to an inductive proof with a base case and induction step but with an added termination criterion.
            </span>
            <span className="block mt-2">
                The loop invariant for insertion sort can be stated as follows:
            </span>
            <span className="block ml-5 mt-2">
                At each step, A[1..j-1] contains the first j-1 elements in SORTED order.
            </span>
            <span className="block mt-2">
                The proof of correctness is then straightforward:
            </span>
            <ol className="list-decimal ml-5 mt-2">
                <li><strong>Initialization:</strong> Prior to the loop j = 2 ⇒ A[1..j-1] = A[1], which contains only the A[1..j-1] elements (of which there is only one), and since there is only a single element, they are trivially sorted.</li>
                <li><strong>Maintenance:</strong> The outer for loop selects element A[j] and positions it properly into A[1..j-1] via the while loop. Since the array A[1..j-1] began sorted, inserting element A[j] into the proper place produces A[1..j] in sorted order (and contains the first j elements).</li>
                <li><strong>Termination:</strong> The loop terminates when j = n + 1 ⇒ A[1..j-1] = A[1..(n+1)-1] = A[1..n], which since the array remains sorted after each iteration, gives A[1..n] is sorted when the loop terminates (and contains all the original elements) ⇒ the entire original array is sorted.</li>
            </ol>
        </div>
    );
};

export default CorrectnessProof;
