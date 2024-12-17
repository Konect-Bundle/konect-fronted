import * as Yup from "yup";

export const OrderSchema = Yup.object().shape({
    name: Yup.string().required("Required"),

    firstname: Yup.string().required("Required"),

    title: Yup.string().required("Required"),

    quantity: Yup.number().integer("Not Integer"),
    withcustomLogo: Yup.boolean(),
    // file: Yup.object().shape({
    //     attachment: Yup.mixed().test("fileSize", "The file is too large", (value: any) => {
    //         if (!value.length) return true // attachment is optional
    //         return value[0].size <= 2000000
    //     })
    // })
});
