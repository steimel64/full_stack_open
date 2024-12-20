import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


/**
 * Main application component for the blog list application.
 * Handles user authentication and blog display functionality.
 * @returns {JSX.Element} Rendered application
 */
const App = () => {
  // Authentication related states
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  // Blog Related states
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // UI states
  const [notification, setNotification] = useState(null)

  // Helper functions (utilities)
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  // Effect Hooks
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      
      blogService.getAll()
        .then(blogs => {
          setBlogs(blogs)
        })
    }
  }, [])

  // Authentication Handlers
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      console.log('Login response:', user)
    
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )


      blogService.setToken(user.token)
      setUser(user)
      const blogs = await blogService.getAll()
      setBlogs(blogs)

      setUsername('')
      setPassword('')
      showNotification('Successfully logged in!')
    } catch (error) {
      showNotification('wrong username or password', 'error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // Blog Handlers
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title, author, url
    }
    await blogService.create(blogObject)
    showNotification(`A new blog ${title} by ${author} added`)
  }

  // UI Component Render Functions
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
      <Notification notification={notification} />
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logoutForm = () => (
    <button onClick={handleLogout}>logout</button>
  )

  const loginStatus = () => (
    <div>
    <h2>blogs</h2>
    <Notification notification={notification} />
    {user.name} logged in {logoutForm()}
  </div>
  )

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title: <input value={title} onChange={({ target }) => setTitle(target.value)} />
        <br />
        author: <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        <br />
        url: <input value={url} onChange={({ target }) => setUrl(target.value)} />
        <br />
        <button type="submit">create</button>
      </form>
    </div>

  )

  const blogList = () => (
    <div>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  // Main Render

  return (
    <div>
      {user === null ?
        loginForm() :
        <>
          {loginStatus()}
          {blogForm()}
          {blogList()}
        </>
      }
    </div>
  )
}

export default App


// 5.1 complete 12/15/2024
// 5.2 complete 12/16/2024
// 5.3 complete 12/18/2024
// 5.4 complete 12/21/2024

