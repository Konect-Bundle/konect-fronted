import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

interface ErrorInterface {
    state: boolean;
    status: number;
    data: object;
}
export default class ApiErrorsManagement {

    public state: boolean;
    public status: number;
    public data: any;


    constructor(errors: any) {
        const rs: ErrorInterface = errors.response.data;
        this.state = rs.state;
        this.status = rs.status;
        this.data = rs.data;
    }

    public proccess(): string | Array<string> {
        {
            var rs: Array<string> = [];

            if (this.status == StatusCodes.UNPROCESSABLE_ENTITY) {
                for (const key in this.data) {
                    if (Object.prototype.hasOwnProperty.call(
                        this.data,
                        key,)) {
                        const error = this.data[key];
                        rs.push(`${error}`);
                    }
                }
            } else {
                rs = this.data.msg;
            }

            // Return
            if (rs.length > 1) {
                return rs;
            } else {
                return rs[0];
            }
        }
    }
}