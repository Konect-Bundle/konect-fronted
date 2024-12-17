import * as Yup from "yup";

export const UserCompanySchema = Yup.object().shape({
    role: Yup.string()

        .min(2, "Too Short!")

        .max(50, "Too Long!"),

    phone_ext: Yup.number()
        .integer("Must be a number")

        .min(2, "Too Short!")

        .max(50, "Too Long!"),

    company_email: Yup.string().email("Invalid email"),
});
