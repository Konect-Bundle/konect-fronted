import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { useFormikContext } from "formik";
import { base64ToBlob, getCroppedImg } from "@/app/_core/utils/functions";
import { UserVcardInterface } from "@/app/_core/interfaces/vcardInterfaces";
import { Avatar, FileInput, Label } from "flowbite-react";
import { ROOT_FILES_URL } from "@/app/_core/config/constants";
import { customAvatarTheme } from "@/app/_styles/flowbite/avatar";
import { TbEdit, TbX } from "react-icons/tb";
import { customFileInputTheme } from "@/app/_styles/flowbite/form";
import { useTranslations } from "next-intl";

const ImageCropper = ({
    initialImage,
}: {
    initialImage: string | undefined;
}) => {
    const { setFieldValue } = useFormikContext<UserVcardInterface>(); // Utilisation de Formik avec TypeScript
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const TAction = useTranslations("Actions");

    // Capture le fichier sélectionné et initialise l'image
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageDataUrl = await readFile(file);
            setImageSrc(imageDataUrl as string);
            setIsVisible(true);
        }
    };

    const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Fonction pour sauvegarder l'image recadrée dans Formik
    const handleSave = async () => {
        if (imageSrc && croppedAreaPixels) {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
            );
            setImageSrc(croppedImage);
            const blob: Blob = base64ToBlob(croppedImage);

            setFieldValue("profilImage", blob); // Met l'image recadrée dans Formik
            setIsVisible(false);
        }
    };

    return (
        <div>
            <div className='flex md:flex-row md:justify-start justify-center flex-col items-center md:space-x-8 space-x-0 px-8 pb-8 pt-5'>
                <div className='w-40 h-40 flex justify-center rounded-xl overflow-hidden'>
                    {initialImage || imageSrc ? (
                        <Avatar
                            img={
                                imageSrc
                                    ? imageSrc
                                    : ROOT_FILES_URL + "/" + initialImage
                            }
                            size={"pxl"}
                            alt='Kuser Image'
                            theme={customAvatarTheme}
                        />
                    ) : (
                        <Avatar theme={customAvatarTheme} size={"pxl"} />
                    )}
                </div>

                <div className='md:mt-0 mt-4'>
                    <div className='flex flex-col md:items-start items-center'>
                        <div className='cursor-pointer rounded-md flex items-center space-x-1 bg-gray-50 text-gray-500 w-max px-4 py-1 border border-gray-300/40 hover:text-gray-600 transition-colors'>
                            <TbEdit />
                            <Label
                                className='text-gray-500 font-normal cursor-pointer hover:text-gray-600 transition-colors'
                                htmlFor='file-upload-helper-text'
                                value={TAction("choose_image")}
                            />
                        </div>
                        <FileInput
                            className='hidden'
                            accept='.jpg,.jpeg,.png'
                            theme={customFileInputTheme}
                            color={"gray"}
                            id='file-upload-helper-text'
                            helperText='PNG or JPEG  (MAX. 800x400px).'
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
            </div>
            {isVisible && imageSrc && (
                <div className='fixed z-[55] top-0 left-0 w-full h-full bg-black-bold flex flex-col justify-start items-center'>
                    <div className='w-full flex justify-between items-center px-4 py-4 text-gray-200 border-b border-gray-800 mb-16'>
                        <TbX className='text-xl ' />
                        <h2 className='font-semibold'>Resize image</h2>
                        <button type='button' onClick={handleSave}>
                            Save
                        </button>
                    </div>
                    <div
                        className='bg-black-light rounded-md overflow-hidden md:w-4/6 w-full h-[500px] md:h-5/6'
                        style={{
                            position: "relative",
                        }}
                    >
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// Fonction utilitaire pour lire le fichier image en Base64
const readFile = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
};

export default ImageCropper;
