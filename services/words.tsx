import { connectSurreal, db, getSurrealCompatibleDate } from "../surrealdb";
import {
  Definition,
  MotdujourDicolink,
  getNewWordFromDicolink,
} from "./dicolink";

export async function getCurrentDayWordFromSurreal(): Promise<Word | null> {
  return await connectSurreal().then(async () => {
    const res = await db
      .select("word:" + getSurrealCompatibleDate(new Date()))
      .catch(async (err) => {
        console.log("Error while getting current day word : " + err);
        return;
      });

    if (!res) {
      return null;
    }

    console.log("Current day new word : ");
    console.log(res);
    return res[0] as Word;
  });
}

export async function getTodayWordForEndUser(
  userAccountID: string
): Promise<Word> {
  const word = await getCurrentDayWordFromSurreal();

  console.log("Word first phase : ");
  console.log(word);

  if (!word) {
    const newWord = await getNewWordFromDicolink();
    await importNewWordFromDicolink(newWord, userAccountID);
    const word = await getCurrentDayWordFromSurreal();
    console.log("Word second phase : ");
    console.log(word);
    return word as Word;
  }

  if (!word.id) {
    throw new Error("Word id is not defined");
  }

  console.log("User account id : " + userAccountID);

  await connectSurreal().then(async () => {
    const wordRelation: RelateResponse<LearnsRelation> | void = await db
      .query("SELECT ->learns->word FROM " + userAccountID)
      .then((res: any) => {
        console.log("Word relation : ");
        console.log(JSON.stringify(res));
        console.log(res[0].status);
        if (res[0].status === "ERR") {
          console.log("Error while getting word relation : " + res[0].result);
          throw new Error(
            "Error while getting word relation : " + res[0].result
          );
        }

        return res as RelateResponse<LearnsRelation>;
      })
      .catch((err) => {
        console.log("Catched error : " + err);
        return;
      });

    if (!wordRelation) {
      console.error("Word relation is not defined");
      return word as Word;
    }

    // const res = await db.query("").catch(async (err) => {
    //   console.log("Error while getting word relation : " + err);
    //   return;
    // });

    console.log("Current users new word : ");
    console.log(JSON.stringify(wordRelation));
  });

  return word as Word;
}

export async function importNewWordFromDicolink(
  dicolinkWord: MotdujourDicolink,
  userAccountID: string
): Promise<any> {
  return await connectSurreal().then(async () => {
    const date = new Date();
    const surrealDate = getSurrealCompatibleDate(date);

    const res = await db.create(
      "word:" + surrealDate,

      {
        word: dicolinkWord.mot,
        definitions: dicolinkWord.definitions,
        scoreScrabble: dicolinkWord.scorescrabble,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: userAccountID,
      }
    );
    console.log("Create word response : " + JSON.stringify(res));
    return res;
  });
}

export interface Word {
  word: string;
  definitions: Definition[];
  scoreScrabble: number;
  created_at: string;
  updated_at: string;
  created_by: string;
  id?: string;
}

export interface RelateResponse<T> {
  time: string;
  status: string;
  result: [T];
}

export interface LearnsRelation {
  "->learns": {
    "->word": [string];
  };
}
