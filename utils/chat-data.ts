export interface ChatI {
  from: string
  text: string
  date: string
  id?: number | string
}

export interface ChatDataI {
  id: number
  type: "group" | "personal"
  date: string
  chat: ChatI[]
  total: number
  name: string
}

export type DataI = ChatDataI[]

export const ChatData: DataI = [
  {
    id: 1,
    type: "group",
    name: "109220-Naturalization",
    date: "01/06/2021 12:19",
    chat: [
      {
        from: "Obaidullah",
        text: "Lorem Ipsum is simply dummy text of ",
        date: "01/06/2021 12:19",
        id: 1,
      },
      {
        from: "Me",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially uncha",
        date: "01/06/2021 13:19",
        id: 2,
      },
      {
        from: "Mary Hilda",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially uncha",
        date: "01/06/2021 14:19",
        id: 3,
      },
    ],
    total: 3,
  },
  {
    id: 2,
    type: "personal",
    name: "FastVisa Support",
    date: "01/06/2021 19:19",
    chat: [
      {
        from: "Me",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially uncha",
        date: "01/06/2021 13:19",
        id: 1,
      },
      {
        from: "FastVisa Support",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially uncha",
        date: "01/06/2021 14:19",
        id: 2,
      },
    ],
    total: 0,
  },
]
