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

  let word = await getCurrentDayWordFromSurreal();

  console.log("Word first phase : ");
  console.log(word?.word);

  if (!word) {
    const newWord = await getNewWordFromDicolink();
    await importNewWordFromDicolink(newWord, userAccountID);
    word = await getCurrentDayWordFromSurreal();
    console.log("Word second phase : ");
    console.log(word?.word);
  }

  if (!word) {
    throw new Error("Word is not defined after second phase");
  }

  console.log(word.id);
  if (!word.id) {
    throw new Error("Word id is not defined");
  }

  try {
    const isLearningWord = await isWordCurrentlyLearned(userAccountID, word.id);
    if (!isLearningWord) {
      console.log("Word is not learned yet");
      addWordToLearnedWordsList(word.id, userAccountID);
    } else {
      console.log("Word is already learned");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }

  return word as Word;
}

export async function getWordHistory(
  wordIDlist: string[]
): Promise<Word[] | null> {
  return await connectSurreal().then(async () => {
    let wordList: Word[] = [];

    for (const wordID of wordIDlist) {
      const res = await db.select(wordID).catch((err) => {
        console.log("Error while getting word in history : " + err);
      });

      if (!res) {
        return null;
      }

      if (
        (res[0] as Word).word &&
        (res[0] as Word).definitions &&
        (res[0] as Word).scoreScrabble &&
        (res[0] as Word).id
      ) {
        console.log("Word added to history : ");
        console.log(res);
        wordList.push((await res[0]) as Word);
        console.log("Word list : " + wordList);
      } else {
        throw new Error("Invalid response type");
      }
    }

    console.log("Returned word history : ");
    console.log(wordList);
    return wordList;
  });
}

export async function addWordToLearnedWordsList(
  wordId: string,
  userAccountID: string
): Promise<void> {
  console.log("Add word to learned words list");
  console.log("Word id : " + wordId);
  console.log("User account id : " + userAccountID);
  await connectSurreal().then(async () => {
    const res = await db
      .query(
        "RELATE " +
          userAccountID +
          "->learns->" +
          wordId +
          " CONTENT {created_at: time::now(), guessedRight: false}"
      )
      .catch((err) => {
        console.log("Error while adding word to learned words list : " + err);
        return;
      });

    if (!res) {
      return null;
    }

    console.log("Add word to learned words list : ");
    console.log(res);
    return;
  });
}

export async function isWordCurrentlyLearned(
  accountID: string,
  wordID: string
) {
  console.log("Account ID : " + accountID);
  console.log("Word ID : " + wordID);
  return await connectSurreal().then(async () => {
    const res: RelateResponse<LearnsObject> | Error = await db
      .query(
        "SELECT * FROM learns WHERE out == " +
          wordID +
          " AND in == " +
          accountID
      )
      .then((res: any) => {
        console.log(JSON.stringify(res));
        if (res[0].status === "ERR") {
          console.error("Error while getting word relation : " + res[0]);
          throw new Error("Error while getting word relation : " + res[0]);
        }
        return res[0] as RelateResponse<LearnsObject>;
      })
      .catch((err) => {
        console.error(err);
        return new Error(err);
      });

    if (!res) {
      return new Error("Error while getting word relation : res is empty");
    } else if (res instanceof Error) {
      return new Error("Error while getting word relation : " + res);
    }

    return res.result.length ? true : false;
  });
}

export async function isWordCurrentlyGuessedRight(
  accountID: string,
  wordID: string
): Promise<boolean | Error> {
  console.log("iwWordCurrentlyGuessedRight function started");
  console.log("Account ID : " + accountID);
  console.log("Word ID : " + wordID);
  return await connectSurreal().then(async () => {
    const res: RelateResponse<LearnsObject> | Error = await db
      .query(
        "SELECT * FROM learns WHERE out == " +
          wordID +
          " AND in == " +
          accountID
      )
      .then((res: any) => {
        if (res[0].status === "ERR") {
          console.error("Error while getting word relation : " + res[0]);
          throw new Error("Error while getting word relation : " + res[0]);
        }

        return res[0] as RelateResponse<LearnsObject>;
      })
      .catch((err) => {
        console.error(err);
        return new Error(err);
      });

    if (!res) {
      return new Error("Error while getting word relation : res is empty");
    } else if (res instanceof Error) {
      return new Error("Error while getting word relation : " + res);
    }
    console.log("iwWordCurrentlyGuessedRight function stopped");

    if (res.result[0].guessedRight) {
      return true;
    } else {
      return false;
    }
  });
}

export async function getLearningWordListForAccount(
  userAccountID: string
): Promise<string[] | Error> {
  return await connectSurreal().then(async () => {
    const res: RelateResponse<LearnsRelation> | Error = await db
      .query("SELECT ->learns->word FROM " + userAccountID)
      .then((res: any) => {
        if (res[0].status === "ERR") {
          console.error("Error while getting word relation : " + res[0]);
          throw new Error("Error while getting word relation : " + res[0]);
        }
        return res[0] as RelateResponse<LearnsRelation>;
      })
      .catch((err) => {
        console.error(err);
        return new Error(err);
      });

    if (res instanceof Error) {
      return res;
    }

    const learnedWordsIdList = res.result[0]["->learns"]["->word"].sort(
      (a: string, b: string) => b.localeCompare(a)
    );

    return learnedWordsIdList;
  });
}

export async function getLastLearningWordIDForAccount(
  userAccountID: string
): Promise<string | null | Error> {
  const wordIDlist = await getLearningWordListForAccount(userAccountID);
  if (wordIDlist instanceof Error) {
    return wordIDlist;
  }

  let firstWordSkipTrigger: boolean = true;

  for (const wordID of wordIDlist) {
    // console.log("Word ID check if is learned: " + wordID);
    const trigger = await isWordCurrentlyGuessedRight(userAccountID, wordID);
    // console.log("Trigger for " + wordID + " : " + JSON.stringify(trigger));
    if (!trigger) {
      if (firstWordSkipTrigger) {
        console.log("First word not learned skipped : " + wordID);
        firstWordSkipTrigger = false;
        continue;
      } else {
        console.log("Word not learned found : " + wordID);
        return wordID;
      }
    } else {
      // console.log("Word learned skipped : " + wordID);
    }
  }

  console.log("No word found");
  return null;
}

export async function getWordFromID(wordID: string): Promise<Word | Error> {
  console.log("Get word from ID function started");
  console.log("Word ID : " + wordID);
  return await connectSurreal().then(async () => {
    const res: Word | Error = await db
      .select(wordID)
      .then((res: any) => {
        if (res[0].status === "ERR") {
          console.error("Error while getting word : " + res[0]);
          throw new Error("Error while getting word : " + res[0]);
        }
        return res[0] as Word;
      })
      .catch((err) => {
        console.error(err);
        return new Error(err);
      });

    console.log("Get word from ID function stopped");

    return res;
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

export interface LearnsObject {
  created_at: string;
  guessedRight: boolean;
  id: string;
  in: string;
  out: string;
}

export interface LearnsRelation {
  "->learns": {
    "->word": [string];
  };
}
