import {SERVER_API_URL} from "../constants";

export class UserService {

    static async getAll() {
        const res = await fetch(SERVER_API_URL + "/kwidget", {cache: 'force-cache'})

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        return res.json()
    }

    static async getKwidget(name: string) {
        const res = await fetch(SERVER_API_URL + "/kwidget/" + name, {cache: 'force-cache'})

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        return res.json()

    }
}


//AXIOS OLD
// try {
//   cache( async() => {
//     const response = await axiosInstance.get(SERVER_API_URL + "/user/" + uuid);
//     return response.data;
//   });
// } catch (error) {
//   console.error('Error retrieving data:', error);
//   throw new Error('Could not get data');
// }