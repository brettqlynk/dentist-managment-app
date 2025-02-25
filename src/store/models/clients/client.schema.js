import { formatDate } from "../../../utils/formatDate";
import { v4 } from "uuid";
export const thootNumbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
];
export const sessionSchema = (
  toothNumber,
  intervention,
  price,
  received,
  reste
) => {
  return {
    date: formatDate(new Date(), "_"), //store as strung following DD_MM_YYYY
    toothNumber: toothNumber,
    intervention: intervention,
    price: price || 0,
    received: received || 0,
    reste: reste || 0,
  };
};

//[TODO_BEKRINE]add attended(true/false) field here
// db.collection('chatDocs').where("chatMembers", "array-contains", { userId: "xyz", userName: "abc" });
export const appointmentSchema = (date) => {
  return {
    date, // store as strung following DD_MM_YYYY
    control: false,
    attended: false,
  };
};

const getPropertyIfHas = (object, property) => {
  if (!object) return undefined;
  if (object.hasOwnProperty(property)) return object.property;
  return undefined;
};

export const personalInfoSchema = (
  firstName,
  lastName,
  phone,
  age,
  profession,
  address,
  isOrthoClient,
  CIN
) => ({
  fullName: firstName + " " + lastName || "",
  firstName,
  lastName,
  phone,
  age,
  profession,
  address,
  CIN,
  isOrthoClient: isOrthoClient || false,
});

export const shapeSchema = (shapeName, left, top, angle) => ({
  shapeName,
  left,
  top,
  angle: angle || 0,
  id: v4(),
});
export const clientSchema = (
  reference,
  firstName,
  lastName,
  CIN,
  phone,
  age,
  profession,
  address,
  sessions,
  _extraInfo,
  firstAppointment,
  isOrthoClient,
  firstPayment
) => {
  return {
    reference,
    id: v4(),
    perosnalInfo: personalInfoSchema(
      firstName,
      lastName,
      phone,
      age,
      profession,
      address,
      isOrthoClient,
      CIN
    ),
    extraInfo: {
      healthProblems: getPropertyIfHas(_extraInfo, "healthProblems") || "",
      anesthesia: getPropertyIfHas(_extraInfo, "anesthesia") || false,
      péncilineAllergie:
        getPropertyIfHas(_extraInfo, "péncilineAllergie") || false,
      bleeding: getPropertyIfHas(_extraInfo, "bleeding") || false,
      pregnant: getPropertyIfHas(_extraInfo, "pregnant") || false,
      observation: getPropertyIfHas(_extraInfo, "observation") || "",
    },
    shapes: [],
    initialBalance: 0,
    sessions: sessions || [],
    created_at: formatDate(new Date(), "_"), //stored as DD_MM_YYYY
    updated_at: formatDate(new Date(), "_"), //use firestor's date
    appointments: (firstAppointment && [firstAppointment]) || [],
    payments: (firstPayment && [firstPayment]) || [],
  };
};
