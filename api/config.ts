export const config = (token: string) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  }
}
