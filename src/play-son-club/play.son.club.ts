import axios from "axios";
import { generateSecChUa, generateUserAgent } from "../utils/userAgent";

export class PlaySonClubSite {
  constructor() { }

  async singIn(username: string, password: string) {
    let url = "https://portal.taison01.com/api/Account/Login";
    let dataOrigin = {
      LoginType: 1,
      UserName: username,
      Password: password,
      DeviceId: "627bec5e-917d-49cf-b9ae-d1723b203233",
      DeviceType: 1,
      PackageName: "http://null",
    };
    let data = JSON.stringify(dataOrigin);
    let headers = {
      authority: "portal.taison01.com",
      accept: "*/*",
      "accept-language":
        "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
      "content-type": "application/json; charset=UTF-8",
      origin: "https://play.son.club",
      referer: "https://play.son.club/",
      "sec-ch-ua": generateSecChUa(),
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "user-agent": generateUserAgent()
    };
    var response = await axios
      .post(url, data, { headers, maxBodyLength: Infinity })
      .then((response) => {
        return response.data.Token;
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  async getBankInfo(
    token: string,
    amount: number,
    chargeType: string = "bank",
    subType: string = "VCB"
  ) {
    let url = `https://portal.taison01.com/api/charge/getInfor?amount=${amount}&chargeType=${chargeType}&subType=${subType}&access_token=${token}`;
    let config = {
      maxBodyLength: Infinity,
      headers: {
        authority: "portal.taison01.com",
        accept: "*/*",
        "accept-language":
          "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
        "content-type": "application/json; charset=UTF-8",
        origin: "https://play.son.club",
        referer: "https://play.son.club/",
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
      .get(url, config)
      .then((response) => {
        //case deposit rare limit
        if ((response.data.ResponseCode = -99)) {
          return "This account have suspended. Please login another account.";
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }
}
