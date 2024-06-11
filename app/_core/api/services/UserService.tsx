import { axiosInstance } from "../axios";
import { SERVER_API_URL } from "../constants";

export class UserService {
  static async getUser(uuid: string) {
    try {
      const response = await axiosInstance.get(SERVER_API_URL + "/user/" + uuid);
      return response.data;
    } catch (error) {
      console.error('Error retrieving data:', error);
      throw new Error('Could not get data');
    }
  }
}
