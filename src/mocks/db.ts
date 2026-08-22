import type {
  HighlightsData,
  StarsData,
  NewsData,
  CustomChartProps,
} from "@/types"

export interface MockUser {
  id: number
  name: string
  email: string
  phone: string
  password: string
}

export interface MockLead {
  id: number
  userId: number
  name: string
  email: string
  phone: string
}

interface MockDB {
  users: MockUser[]
  leads: MockLead[]
  nextUserId: number
  nextLeadId: number
}

const STORAGE_KEY = "sales-dashboard-mock-db"

const seedDB: MockDB = {
  users: [
    {
      id: 1,
      name: "Tester Cypress",
      email: "tester_cypress@dnc.com.br",
      phone: "11999990000",
      password: "@DNCReact178#",
    },
  ],
  leads: [
    {
      id: 1,
      userId: 1,
      name: "Ana Beatriz Souza",
      email: "ana.souza@exemplo.com",
      phone: "11988887777",
    },
    {
      id: 2,
      userId: 1,
      name: "Carlos Eduardo Lima",
      email: "carlos.lima@exemplo.com",
      phone: "21977776666",
    },
    {
      id: 3,
      userId: 1,
      name: "Fernanda Torres",
      email: "fernanda.torres@exemplo.com",
      phone: "31966665555",
    },
  ],
  nextUserId: 2,
  nextLeadId: 4,
}

export function loadDB(): MockDB {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    saveDB(seedDB)
    return structuredClone(seedDB)
  }
  try {
    return JSON.parse(raw) as MockDB
  } catch {
    saveDB(seedDB)
    return structuredClone(seedDB)
  }
}

export function saveDB(db: MockDB): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}

export const highlightsData: HighlightsData[] = [
  { value: 128450.75, subtitle: "+ 12% em relação ao mês passado" },
  { value: 150000, subtitle: "success" },
  { value: 47, subtitle: "leads aguardando contato" },
]

export const monthChartData: CustomChartProps = {
  labels: Array.from({ length: 30 }, (_, i) => String(i + 1)),
  data: [
    3200, 2800, 4100, 3900, 5200, 4700, 3600, 4900, 5300, 6100, 4800, 5700,
    6200, 5900, 6800, 7100, 6400, 7300, 7800, 7200, 8100, 8600, 7900, 8400,
    9100, 8700, 9500, 10200, 9800, 10500,
  ],
  type: "line",
}

export const yearChartData: CustomChartProps = {
  labels: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  data: [
    98000, 105000, 112000, 99500, 121000, 118500, 128450, 0, 0, 0, 0, 0,
  ],
  type: "bar",
}

export const starsData: StarsData[] = [
  { name: "Juliana Alves", value: 32400 },
  { name: "Rafael Nogueira", value: 28950 },
  { name: "Camila Ribeiro", value: 24100 },
  { name: "Bruno Cardoso", value: 19800 },
  { name: "Larissa Pontes", value: 16700 },
]

// gera uma variação que tende a subir mas pode cair, simulando venda/estorno
function oscillate(range: number, upBias = 0.35): number {
  return (Math.random() - upBias) * range
}

export function simulateSale(): void {
  highlightsData[0].value = Math.max(
    0,
    Math.round((highlightsData[0].value + oscillate(1500)) * 100) / 100
  )

  const leadsDelta = Math.random() < 0.5 ? -1 : 1
  highlightsData[2].value = Math.max(0, highlightsData[2].value + leadsDelta)

  const dayIndex = Math.floor(Math.random() * monthChartData.data.length)
  monthChartData.data[dayIndex] = Math.max(
    0,
    Math.round(monthChartData.data[dayIndex] + oscillate(800))
  )

  const currentMonthIndex = new Date().getMonth()
  if (currentMonthIndex < yearChartData.data.length) {
    yearChartData.data[currentMonthIndex] = Math.max(
      0,
      Math.round(yearChartData.data[currentMonthIndex] + oscillate(2000))
    )
  }

  starsData.forEach((star) => {
    star.value = Math.max(
      0,
      Math.round((star.value + oscillate(900, 0.45)) * 100) / 100
    )
  })
  starsData.sort((a, b) => b.value - a.value)
}

export const newsData: NewsData[] = [
  {
    title: "Mercado de vendas B2B cresce 18% no último trimestre",
    date: Date.now() - 1000 * 60 * 60 * 6,
    link: "https://exame.com",
  },
  {
    title: "Como times de vendas de alta performance usam dados",
    date: Date.now() - 1000 * 60 * 60 * 30,
    link: "https://exame.com",
  },
  {
    title: "5 tendências de CRM para o próximo ano",
    date: Date.now() - 1000 * 60 * 60 * 52,
    link: "https://exame.com",
  },
  {
    title: "Automação comercial: o que muda na rotina do vendedor",
    date: Date.now() - 1000 * 60 * 60 * 80,
    link: "https://exame.com",
  },
]
