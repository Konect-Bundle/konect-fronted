import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from "http-status-codes";

interface ErrorInterface {
    state: boolean;
    status: number;
    data: object;
    msg: string;
}
export default class ApiErrorsManagement {
    public state: boolean;
    public status: number;
    public data: any;
    public msg: string;

    constructor(errors: any) {
        console.log(errors);
        const rs: ErrorInterface = errors.response.data;
        this.state = rs.state;
        this.status = rs.status;
        this.data = rs.data;
        this.msg = rs.msg;
    }

    public proccess(): string | Array<string> {
        {
            var rs: Array<string> | string = [];

            if (this.status == StatusCodes.UNPROCESSABLE_ENTITY) {
                for (const key in this.data) {
                    if (Object.prototype.hasOwnProperty.call(this.data, key)) {
                        const error = this.data[key];
                        rs.push(`${error}`);
                    }
                }
            } else {
                rs = this.msg;
            }

            // Return
            if (rs.length > 1) {
                return rs;
            } else {
                return rs;
            }
        }
    }
}
