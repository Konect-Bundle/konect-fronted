"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import Swal from "sweetalert2";

const CopyToClipboard: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const __a = useTranslations("Actions");
    const __ = useTranslations("Text");

    const handleCopy = () => {
        if (inputValue) {
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-right",
                showConfirmButton: false,
                timer: 3500,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: "success",
                title: __("text_clipbaord"),
            });
            navigator.clipboard.writeText(inputValue).then(
                () => {
                    alert("Texte copié dans le presse-papiers !");
                },
                (err) => {
                    // alert('Erreur lors de la copie : ' + err);
                },
            );
        } else {
            // alert("L'entrée est vide. Veuillez entrer du texte.");
        }
    };

    return (
        <div>
            <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Tapez quelque chose ici'
            />
            <button onClick={handleCopy}>{__a("copy")}</button>
        </div>
    );
};

export default CopyToClipboard;
