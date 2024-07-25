import { IChatMessage } from "./IChatMessage";
import { IPatient } from "./IPatient";


export interface IMessageControl {
  patient: IPatient
  queue: string
  topic: string
  subscribed: boolean
  messages: IChatMessage[]
  amountNewMessages: number
}