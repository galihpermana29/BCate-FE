import { message } from "antd"

interface CheckConnectedWalletAddressI {
  walletWhitelists: string[]
  disconnect: () => void
  connectedAccount: string
}

export function CheckConnectedWalletAddress(params: CheckConnectedWalletAddressI) {
  const { walletWhitelists, disconnect, connectedAccount } = params

  if (walletWhitelists.length === 0) return

  if (walletWhitelists.indexOf(connectedAccount) < 0) {
    message.error("Mismatched Wallet")
    disconnect()
    return
  }
}

export function truncateText(text: string, maxWords: number): string {
  const words = text.split(" ")
  const truncatedText = words.slice(0, maxWords).join(" ")

  if (words.length > maxWords) {
    return `${truncatedText} ...`
  }

  return truncatedText
}

export function extractCloudinaryId(url: string): string {
  const segments = url.split("/")
  return segments[segments.length - 1]
}
