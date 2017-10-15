import {Person} from "../../share/data/interfaces/person";
import {IdName} from "../../share/data/interfaces/id-name";
import {ClaimStatus} from "../../share/data/interfaces/claim-status";
import {Claim} from "../../share/data/interfaces/claim";
import v4 = require("uuid/v4");

export function mockIdName(name: string): IdName {
  const id = v4();
  return {id, name};
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPersom(): Person {
  const index = getRandomInt(0, PEOPLE_MOCK.length);
  return PEOPLE_MOCK[index];
}

function getRandomStatus(): ClaimStatus {
  const index = getRandomInt(0, CLAIM_STATUSES_MOCK.length);
  return CLAIM_STATUSES_MOCK[index];
}

export const PEOPLE_MOCK: Array<Person> = [
  mockIdName("Иванов И.И."),
  mockIdName("Петров П.П."),
  mockIdName("Путин В.В."),
  mockIdName("Пушкин А.С."),
  mockIdName("Менделеев Д.И.")
];

export const CLAIM_STATUSES_MOCK: Array<ClaimStatus> = [
  mockIdName("Черновик"),
  mockIdName("В работе"),
  mockIdName("Приостановлена"),
  mockIdName("Обработана")
];

function generateClaims(): Array<Claim> {
  const res: Array<Claim> = [];
  for (let i = 0; i < 10; i++) {
    const docNum = `#${i + 1}`;
    const claim = mockIdName(`Сгенерированная заявка ${docNum}`);
    const from = getRandomPersom();
    const to = getRandomPersom();
    const status = getRandomStatus();
    res.push({...claim, docNum, from, to, status});
  }
  return res;
}

export const CLAIMS_MOCK: Array<Claim> = generateClaims();