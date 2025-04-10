import axios from "axios";
import {
  generateSecurePassword,
  generateVietnameseUsername,
} from "../utils/generateString";
import { generateSecChUa, generateUserAgent } from "../utils/userAgent";
import https from "https";
import http from "http";
import { HttpProxyAgent } from "http-proxy-agent";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Temporary workaround: disable SSL verification (not recommended for production)
  minVersion: "TLSv1.2", // Force minimum TLS version
  maxVersion: "TLSv1.3", // Force maximum TLS version
});

const httpAgent = new http.Agent({
  keepAlive: true, // Keep connections alive for reuse
  maxSockets: 10, // Maximum number of concurrent sockets
  timeout: 60000, // 60 seconds timeout
});
export class PlayIwinBioSite {
  constructor() { }

  async register(proxy: any | null): Promise<{
    xtoken: string;
    username: string;
    password: string;
  }> {
    let username = generateVietnameseUsername();
    let password = generateSecurePassword();
    let url = "https://getquayaybiai.gwyqinbg.com/user/register.aspx";
    let dataOrigin = {
      fullname: username,
      username: username,
      password: password,
      app_id: "iwin.club",
      avatar: "Avatar_22",
      os: "Windows",
      device: "Computer",
      browser: "chrome",
      // fg: "7b80ae6318d28db0efd3b342c6de8841",
      aff_id: "iwin",
      version: "2.31.1",
    };
    let data = JSON.stringify(dataOrigin);
    let config = {
      maxBodyLength: Infinity,
      headers: {
        authority: "getquayaybiai.gwyqinbg.com",
        accept: "*/*",
        "accept-language":
          "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
        "content-type": "text/plain;charset=UTF-8",
        origin: "https://play.iwin.bio",
        referer: "https://play.iwin.bio/",
        "sec-ch-ua": generateSecChUa(),
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "user-agent": generateUserAgent(),
      },
    };

    let response = await axios
      .post(url, data, {
        ...config,
        proxy,
        httpAgent,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error: any) => {
        console.log(error?.message);
      });

    let newAccount = {
      xtoken: "",
      username: "",
      password: "",
    };
    if (response?.code == 257) {
      console.log(
        "Bạn đã đăng ký quá nhiều tài khoản, vui lòng thử lại sau.\nCần đổi proxy. "
      );
      return newAccount;
    }

    if (response?.data[0]?.session_id) {
      newAccount = {
        xtoken: response?.data[0]?.session_id.toString() ?? "",
        username: dataOrigin.username ?? "",
        password: dataOrigin.password ?? "",
      };
    }
    return newAccount;
  }

  async updateUsername(
    username: string,
    xtoken: string,
    proxy: any = null
  ): Promise<void> {
    let url = "https://getquayaybiai.gwyqinbg.com/user/update.aspx";
    let data = JSON.stringify({
      fullname: username,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      headers: {
        authority: "getquayaybiai.gwyqinbg.com",
        accept: "*/*",
        "accept-language":
          "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
        "content-type": "application/json",
        origin: "https://play.iwin.bio",
        referer: "https://play.iwin.bio/",
        "sec-ch-ua": generateSecChUa(),
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "user-agent": generateUserAgent(),
        "x-token": `${xtoken}`,
      },
    };

    await axios
      .post(url, data, { ...config, proxy, httpAgent })
      .then((response) => {
        return response.data
      })
      .catch((error: any) => {
        console.log(error?.message);
      });
  }

  async signIn(
    username: string,
    password: string,
    proxy: any = null
  ): Promise<any> {
    let url = "https://getquayaybiai.gwyqinbg.com/user/login.aspx";
    let dataOrigin = {
      username: username,
      password: password,
      app_id: "iwin.club",
      os: "Windows",
      device: "Computer",
      browser: "chrome",
      fg: "8f2777955068b42039855089b9c77513",
      aff_id: "iwin",
      version: "2.31.1",
    };
    let data = JSON.stringify(dataOrigin);
    let config = {
      maxBodyLength: Infinity,
      headers: {
        authority: "getquayaybiai.gwyqinbg.com",
        accept: "*/*",
        "accept-language":
          "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
        "content-type": "text/plain;charset=UTF-8",
        origin: "https://play.iwin.bio",
        referer: "https://play.iwin.bio/",
        "sec-ch-ua": generateSecChUa(),
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "user-agent": generateUserAgent(),
        //  Cookie: "ci_session=0dlgeb7fllkno304ptu7jlmosvs1fojg",
      },
    };

    let response = await axios
      .post(url, data, { ...config, proxy, httpAgent, httpsAgent })

      .then((response) => {
        if (response.data.data[0].session_id != null)
          console.log(`Login Successfully.`);
        return response.data.data[0].session_id;
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  async getBankCode(token: string, proxy: any = null): Promise<any> {
    let url =
      "https://baymentgwapy.gwyqinbg.com/payment/bnp?xtoken=ee19ad3888b75bd46e98bc26e7cdb86f";
    let config = {
      maxBodyLength: Infinity,
      headers: {
        authority: "baymentgwapy.gwyqinbg.com",
        accept: "*/*",
        "accept-language":
          "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
        "content-length": "0",
        "content-type": "application/json",
        origin: "https://play.iwin.bio",
        referer: "https://play.iwin.bio/",
        "sec-ch-ua": generateSecChUa(),
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "user-agent": generateUserAgent(),
        "x-token": `${token}`,
      },
    };

    await axios
      .post(url, null, { ...config, proxy, httpAgent, httpsAgent })
      .then((response) => {
        console.log(JSON.stringify(response.data.rows));
        return response.data.rows;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async deposit(
    token: string,
    amount: number = 500000,
    bankCode: string = "BIDV",
    proxy: any = null
  ): Promise<{
    account_no?: string;
    account_name?: string;
    bank_name?: string;
    message?: string;
  }> {
    let data = JSON.stringify({
      amount: amount,
      bank_code: bankCode,
    });
    let url = `https://baymentgwapy.gwyqinbg.com/payment/np?xtoken=${token}`;
    let config = {
      maxBodyLength: Infinity,
      headers: {
        authority: "baymentgwapy.gwyqinbg.com",
        accept: "*/*",
        "accept-language":
          "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
        "content-type": "application/json",
        origin: "https://play.iwin.bio",
        referer: "https://play.iwin.bio/",
        "sec-ch-ua": generateSecChUa(),
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "user-agent": generateUserAgent(),
        "x-token": `${token}`,
      },
    };

    let response = await axios
      .post(url, data, { ...config, httpAgent: new HttpProxyAgent(`http://${proxy?.host}:${proxy?.port}`) })
      .then((response) => {
        return response.data;
      })
      .catch((error: any) => {
        console.log(`ERROR API AXIOS POST DEPOSIT`, error?.message);
      });
    let res = response?.rows;
    let resResult: {
      account_no: string;
      account_name: string;
      bank_name: string;
    } = {
      account_no: res?.account_no,
      account_name: res?.account_name,
      bank_name: res?.bank_name,
    };
    if (response.code == 400) {
      return {
        message: `This account have suspended. Please login another account.`,
      };
    }
    return resResult;
  }
}
