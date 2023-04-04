export async function getNewWordFromDicolink(): Promise<MotdujourDicolink> {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append(
    "Cookie",
    "_csrf=ad67193db452f74684d419dc8779477e50a4295beb60d1ee9062f9bee8a5083ca%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%225tE6KsiAtYUligOANQgqE41eE1v6K92j%22%3B%7D"
  );

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const url: string =
    "https://api.dicolink.com/v1/mots/motdujour?date=" +
    new Date().toISOString().slice(0, 10) +
    "&api_key=F49u6WGSR1N4WV_w4Tb9vva_ENf2gc1I";

  const todayWord = await fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const word: MotdujourDicolink = JSON.parse(result);
      console.log("word", word);
      return word;
    })
    .catch((error) => console.log("error", error));

  if (todayWord === undefined) {
    alert("Erreur lors de la récupération du mot du jour");
    throw new Error("No word found");
  }
  return todayWord;
}

export interface MotdujourDicolink {
  mot: string;
  dicolinkUrl: string;
  date_publication: string;
  scorescrabble: number;
  definitions: Definition[];
  citations: Citation[];
  expressions: any[];
}

export interface Definition {
  nature: string;
  definition: string;
}

export interface Citation {
  citation: string;
  auteur: string;
}
