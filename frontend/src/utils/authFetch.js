const authFetch = async (url, options = {}) => {
  const { headers = {}, ...rest } = options
  let token = localStorage.getItem('authToken')

  let res = await fetch(url, {
    ...rest,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })

  if (res.status === 401) {
    const refreshRes = await fetch('http://localhost:5000/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    })

    if (refreshRes.ok) {
      const data = await refreshRes.json()
      localStorage.setItem('authToken', data.token)

      return fetch(url, {
        ...rest,
        headers: {
          ...headers,
          Authorization: `Bearer ${data.token}`,
        },
        credentials: 'include',
      })
    }
  }

  return res
}

export default authFetch
