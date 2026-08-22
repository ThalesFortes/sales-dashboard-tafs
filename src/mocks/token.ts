function base64UrlEncode(value: object): string {
  const json = JSON.stringify(value)
  const base64 = btoa(unescape(encodeURIComponent(json)))
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function base64UrlDecode(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/")
  return decodeURIComponent(escape(atob(base64)))
}

const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7

export function createMockJwt(userId: number): string {
  const header = { alg: "HS256", typ: "JWT" }
  const iat = Math.floor(Date.now() / 1000)
  const payload = { userId, iat, exp: iat + SEVEN_DAYS_IN_SECONDS }
  const signature = base64UrlEncode({ mock: true })
  return `${base64UrlEncode(header)}.${base64UrlEncode(payload)}.${signature}`
}

export function getUserIdFromAuthHeader(
  authorizationHeader: unknown
): number | null {
  if (typeof authorizationHeader !== "string") return null
  const token = authorizationHeader.replace(/^Bearer\s+/i, "")
  const [, payloadPart] = token.split(".")
  if (!payloadPart) return null

  try {
    const payload = JSON.parse(base64UrlDecode(payloadPart)) as {
      userId?: number
      exp?: number
    }
    if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) {
      return null
    }
    return typeof payload.userId === "number" ? payload.userId : null
  } catch {
    return null
  }
}
