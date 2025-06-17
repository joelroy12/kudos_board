import React from "react";
import { useState } from "react";
import './BoardCreate.css';

function BoardCreate({onCreate}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [author, setAuthor] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const newBoard = {
            
        }
    }
}