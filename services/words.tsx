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
  console.log("User account id : " + userAccountID);
  if (!userAccountID) {
    console.error("User account id is not defined");
    throw new Error("User account id is not defined");
  }

  const word = await getCurrentDayWordFromSurreal();

  console.log("Word first phase : ");
  console.log(word?.word);

  if (!word) {
    const newWord = await getNewWordFromDicolink();
    await importNewWordFromDicolink(newWord, userAccountID);
    const word = await getCurrentDayWordFromSurreal();
    console.log("Word second phase : ");
    console.log(word?.word);
    return word as Word;
  }

  if (!word.id) {
    throw new Error("Word id is not defined");
  }

  getLearningWordListForAccount(userAccountID);

  return word as Word;
}

export async function getLearningWordListForAccount(
  userAccountID: string
): Promise<string[] | void> {
  // console.log("\n\n      Start of getWordRelations");
  await connectSurreal().then(async () => {
    const res: RelateResponse<LearnsRelation> | null = await db
      .query("SELECT ->learns->word FROM " + userAccountID)
      .then((res: any) => {
        // console.log("Word relation : ");
        // console.log(JSON.stringify(res));
        if (res[0].status === "ERR") {
          console.error("Error while getting word relation : " + res[0]);
          throw new Error("Error while getting word relation : " + res[0]);
        }
        return res[0] as RelateResponse<LearnsRelation>;
      })
      .catch((err) => {
        console.error("Catched error : " + err);
        return null;
      });

    if (!res) {
      console.error("No result for word relation request");
      return null;
    }

    // console.log("Res : " + JSON.stringify(res));
    const parsedRes: RelateResponse<LearnsRelation> = JSON.parse(
      JSON.stringify(res)
    );
    const learnedWordsIdList = res.result[0]["->learns"]["->word"];

    // console.log("Parsed res : " + JSON.stringify(parsedRes));
    // console.log("Learned words id list" + JSON.stringify(learnedWordsIdList));

    // console.log("End of getWordRelations");

    return learnedWordsIdList;
  });
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
