import { useState, useEffect } from "react"
import axios, { type AxiosRequestConfig } from "axios"
import Cookies from "js-cookie"
import { setupMockApi } from "@/mocks/handlers"

const axioInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
})

if (import.meta.env.VITE_USE_MOCK_API !== "false") {
  setupMockApi(axioInstance)
}

export const usePost = <T, P>(endpoint: string, withAuth: boolean) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<number | null>(null)

  const postData = async (postData: P, config?: AxiosRequestConfig) => {
    setData(null)
    setLoading(true)
    setError(null)

    try {
      const headers = withAuth
        ? {
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
            "Content-Type": "application/json",
            ...config?.headers,
          }
        : {
            "Content-Type": "application/json",
            ...config?.headers,
          }
      const response = await axioInstance({
        url: endpoint,
        method: "POST",
        data: postData,
        headers: headers,
      })
      setData(response.data)
    } catch (e: any) {
      setError(e.response.status ?? 500)
    } finally {
      setLoading(false)
    }
  }
  return { data, loading, error, postData }
}

export const useGet = <T>(
  endpoint: string,
  config?: AxiosRequestConfig,
  pollMs?: number
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<number | null>(null)

  const getData = async (silent = false) => {
    if (!silent) {
      setData(null)
      setLoading(true)
    }
    setError(null)

    try {
      const response = await axioInstance({
        url: endpoint,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("Authorization")}`,
          ...config?.headers,
        },
        ...config,
      })
      setData(response.data)
    } catch (e: any) {
      setError(e.response.status ?? 500)
    } finally {
      if (!silent) setLoading(false)
    }
  }

  useEffect(() => {
    getData()

    if (!pollMs) return

    const intervalId = setInterval(() => getData(true), pollMs)
    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, pollMs])

  return { data, loading, error, getData }
}

export const usePut = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<number | null>(null)

  const putData = async (putData: T, config?: AxiosRequestConfig) => {
    setData(null)
    setLoading(true)
    setError(null)

    try {
      const response = await axioInstance({
        url: endpoint,
        method: "PUT",
        data: putData,
        headers: {
          Authorization: `Bearer ${Cookies.get("Authorization")}`,
          "Content-Type": "application/json",
          ...config?.headers,
        },
      })
      setData(response.data)
    } catch (e: any) {
      setError(e.response.status ?? 500)
    } finally {
      setLoading(false)
    }
  }
  return { data, loading, error, putData }
}

export const useDelete = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)

  const deleteData = async (config?: AxiosRequestConfig) => {
    setData(null)
    setLoading(true)

    try {
      const response = await axioInstance.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${Cookies.get("Authorization")}`,
          ...config?.headers,
        },
        ...config,
      })
      setData(response.data)
      return response.data
    } catch (e: any) {
      console.error("DELETE error:", e)
      throw e.response?.status ?? 500
    } finally {
      setLoading(false)
    }
  }
  return { data, loading, deleteData }
}
