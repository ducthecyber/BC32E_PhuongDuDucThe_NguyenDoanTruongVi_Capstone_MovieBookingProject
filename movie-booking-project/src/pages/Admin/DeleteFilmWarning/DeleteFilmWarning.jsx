import React from 'react'
import { confirm } from "react-confirm-box";

const DeleteFilmWarning = () => {
    const options = {
        render: (message, onConfirm, onCancel) => {
            return (
                <>
                    <h1> Replace with {message} </h1>
                    <button onClick={onConfirm}> Yes </button>
                    <button onClick={onCancel}> No </button>
                </>
            );
        }
    }

    const onClick = async () => {
        const result = await confirm("Are you sure?", options);
        if (result) {
            console.log("You click yes!");
            return;
        }
        console.log("You click No!");
    };
    return (
        <div>
            
        </div>
    )
}

export default DeleteFilmWarning