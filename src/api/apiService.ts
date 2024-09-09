import axios from "axios";

const API_KEY = "RFarX9OTMijEKF5b5ycCJC2BueHLgO82O39v4nNE";
const BASE_URL = "https://countryapi.io/api";

const httpStatusCodes = {
  200: { status: "OK", description: "Request successful" },
  400: { status: "Bad Request", description: "Request was invalid" },
  401: { status: "Unauthorized", description: "No API key was found" },
  403: { status: "Forbidden", description: "The API key is invalid" },
  405: {
    status: "Method Not Allowed",
    description: "Incorrect HTTP method provided",
  },
  429: { status: "Too Many Requests", description: "Client is rate limited" },
  500: {
    status: "Internal Server Error",
    description: "Server error, please try again later or contact support",
  },
};

type StatusCode = keyof typeof httpStatusCodes; // 200 | 400 | 401 | 403 | 405 | 429 | 500;

export const fetchAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all?apikey=${API_KEY}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const responseCode: StatusCode = error.response.status as StatusCode;
      const statusInfo = httpStatusCodes[responseCode] || {
        status: "Unknown",
        description: "An unknown error occurred",
      };
      console.log(
        `Fetching data error:\nStatus: ${statusInfo.status}\nDescription: ${statusInfo.description}\nResponse: returning MOCK_DATA for the game`,
        error
      );
    } else {
      console.log(
        "An error occurred without a response from the server:",
        error
      );
    }
    return;
  }
};
