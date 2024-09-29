import React, { ReactElement, ReactNode } from "react";
import InputWithLabel from "../Form/InputWithLabel";
import InputField from "../Form/InputField";

interface VcardJobFormProps extends React.PropsWithChildren {}

const VcardJobForm: React.FC<VcardJobFormProps> = ({}: VcardJobFormProps) => {
    return (
        <div className='grid grid-cols-6 col-span-2 gap-4'>
            <div className='sm:col-span-4 col-span-6'>
                <InputWithLabel labelFor={"text"} labelTitle={"Qualification"}>
                    <InputField labelFor='text' name='work.text' id='text' />
                </InputWithLabel>
            </div>
        </div>
    );
};

export default VcardJobForm;
