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
  return (
    <div className="flex h-screen border-2">
      <nav className="w-[100px] border-2">sidebar</nav>
      <div className="w-full">
        <nav className="h-[80px] w-full border-2">Navbar</nav>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default GuardLayout
