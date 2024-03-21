const GuardLayout = ({ children }: { children: React.ReactNode }) => {
  /**
   * TODO: please after integrate the login page, activate this
   */
  // const isAuthenticated = localStorage.getItem("jwt_token")

  const isAuthenticated = true

  if (!isAuthenticated) {
    return children
  }
  /**
   * TODO: please slicing the sidebar and navbar content with fixed position
   */
  return <>{children}</>
}

export default GuardLayout
