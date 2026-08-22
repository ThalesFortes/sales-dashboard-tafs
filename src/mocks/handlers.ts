import type { AxiosInstance, AxiosRequestConfig } from "axios"
import MockAdapter from "axios-mock-adapter"

import type {
  CreateProfileData,
  LeadsPostData,
  LoginPostData,
  ProfileEditableData,
} from "@/types"

import {
  loadDB,
  saveDB,
  highlightsData,
  monthChartData,
  yearChartData,
  starsData,
  newsData,
  simulateSale,
} from "./db"
import { createMockJwt, getUserIdFromAuthHeader } from "./token"

let salesEngineStarted = false
function startSalesEngine(): void {
  if (salesEngineStarted) return
  salesEngineStarted = true
  setInterval(simulateSale, 4000)
}

function parseBody<T>(config: AxiosRequestConfig): T {
  return typeof config.data === "string"
    ? (JSON.parse(config.data) as T)
    : (config.data as T)
}

function authenticate(config: AxiosRequestConfig): number | null {
  const headers = config.headers as Record<string, unknown> | undefined
  return getUserIdFromAuthHeader(headers?.Authorization)
}

export function setupMockApi(instance: AxiosInstance): MockAdapter {
  const mock = new MockAdapter(instance, { delayResponse: 400 })
  startSalesEngine()

  mock.onPost("login").reply((config) => {
    const { email, password } = parseBody<LoginPostData>(config)
    const db = loadDB()
    const user = db.users.find(
      (u) => u.email === email && u.password === password
    )
    if (!user) return [401, { message: "Email e/ou senha inválidos" }]
    return [200, { jwt_token: createMockJwt(user.id) }]
  })

  mock.onPost("profile/create").reply((config) => {
    const body = parseBody<CreateProfileData>(config)
    const db = loadDB()
    if (db.users.some((u) => u.email === body.email)) {
      return [409, { message: "Email já cadastrado" }]
    }
    db.users.push({
      id: db.nextUserId++,
      name: body.name,
      email: body.email,
      phone: body.phone,
      password: body.password,
    })
    saveDB(db)
    return [201, "OK"]
  })

  mock.onGet("profile").reply((config) => {
    const userId = authenticate(config)
    if (userId === null) return [401]
    const db = loadDB()
    const user = db.users.find((u) => u.id === userId)
    if (!user) return [401]
    return [200, { name: user.name, email: user.email, phone: user.phone }]
  })

  mock.onPut("profile/update").reply((config) => {
    const userId = authenticate(config)
    if (userId === null) return [401]
    const db = loadDB()
    const user = db.users.find((u) => u.id === userId)
    if (!user) return [401]
    const body = parseBody<ProfileEditableData>(config)
    user.name = body.name
    user.phone = body.phone
    saveDB(db)
    return [200, { name: user.name, phone: user.phone }]
  })

  mock.onDelete("profile/delete").reply((config) => {
    const userId = authenticate(config)
    if (userId === null) return [401]
    const db = loadDB()
    db.users = db.users.filter((u) => u.id !== userId)
    db.leads = db.leads.filter((l) => l.userId !== userId)
    saveDB(db)
    return [200, {}]
  })

  mock
    .onGet("sales/highlights")
    .reply(() => [200, structuredClone(highlightsData)])
  mock.onGet("sales/month").reply(() => [200, structuredClone(monthChartData)])
  mock.onGet("sales/year").reply(() => [200, structuredClone(yearChartData)])
  mock.onGet("sales/stars").reply(() => [200, structuredClone(starsData)])
  mock.onGet("news").reply(() => [200, newsData])

  mock.onGet("leads").reply((config) => {
    const userId = authenticate(config)
    if (userId === null) return [401]
    const db = loadDB()
    return [200, db.leads.filter((l) => l.userId === userId)]
  })

  mock.onPost("leads/create").reply((config) => {
    const userId = authenticate(config)
    if (userId === null) return [401]
    const db = loadDB()
    const body = parseBody<LeadsPostData>(config)
    const lead = {
      id: db.nextLeadId++,
      userId,
      name: body.name,
      email: body.email,
      phone: body.phone,
    }
    db.leads.push(lead)
    saveDB(db)
    return [201, lead]
  })

  mock.onDelete("leads/delete").reply((config) => {
    const userId = authenticate(config)
    if (userId === null) return [401]
    const id = Number(config.params?.id)
    const db = loadDB()
    db.leads = db.leads.filter((l) => !(l.id === id && l.userId === userId))
    saveDB(db)
    return [200, {}]
  })

  return mock
}
