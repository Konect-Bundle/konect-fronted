"use client";
import * as React from "react";

import { useTranslations } from "next-intl";
import { string } from "yup";

export interface IErrorsViewerProps {
    errors: string | Array<string>;
}

export default function ErrorsViewer({ errors }: IErrorsViewerProps) {
    if (typeof errors == "string") {
        return (
            <span className='py-2 text-center'>
                <span className='text-red-500'>{errors}</span>
            </span>
        );
    } else {
        return (
            <ul className='py-2 text-center'>
                {errors.map((error, key) => {
                    return (
                        <li className='text-red-500' key={key}>
                            {error}
                        </li>
                    );
                })}
            </ul>
        );
    }
}
