import React, {useState, useEffect} from 'react'
// import ReactDOM from 'react-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blog'
import useField from './hooks'

const App = () => {
  const username = useField('text')
  const password = useField('password')
  const blogTitle = useField('text')
  const blogAuthor = useField('text')
  const blogUrl = useField('text')

  const [showAll, setShowAll] = useState(true)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setShowAll(false)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: blogTitle.value,
      author: blogAuthor.value,
      url: blogUrl.value,
      user: user.id
    }
    try {
      blogService.create(blogObject).then(() => {
        blogTitle.reset()
        blogAuthor.reset()
        blogUrl.reset()
        blogService.getAll().then(updatedBlogs => {
          setBlogs(updatedBlogs)
          setSuccessMessage(`${blogObject.title} added`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 2000)
        })
      })
    } catch (e) {
      setErrorMessage(String(e))
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = id => {
    try {
      const blog = blogs.find(n => n.id === id)
      blog.likes++
      const changedBlog = {
        ...blog
      }

      blogService.setToken(user.token)

      blogService
        .update(id, changedBlog)
        .then(() => {
          blogService.getAll().then(updatedBlogs => {
            setBlogs(updatedBlogs)
            setSuccessMessage(`${blog.title} liked, nice!`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 800)
          })
        })
        .catch(error => {
          setErrorMessage(`Error updating '${blog.title}' - '${error}'`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setBlogs(blogs.filter(n => n.id !== id))
        })
    } catch (e) {
      setErrorMessage(String(e))
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = id => {
    try {
      const blog = blogs.find(n => n.id === id)
      if (!window.confirm(`remove blog '${blog.title}' by '${blog.author}`))
        return ''
      blogService.setToken(user.token)

      blogService
        .remove(id)
        .then(() => {
          blogService.getAll().then(updatedBlogs => {
            setBlogs(updatedBlogs)
            setSuccessMessage(`${blog.title} removed!`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 800)
          })
        })
        .catch(error => {
          setErrorMessage(`Error deleting '${blog.title}' - '${error}'`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setBlogs(blogs.filter(n => n.id !== id))
        })
    } catch (e) {
      setErrorMessage(String(e))
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const usr = username.value
      const pwd = password.value
      const user = await loginService.login({
        username: usr,
        password: pwd
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      setShowAll(false)
      setSuccessMessage('Logged in')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 2000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogsToShow =
    showAll || user === null
      ? blogs
      : blogs.filter(
          blog =>
            blog.user.username.toLowerCase() === user.username.toLowerCase()
        )

  const rows = () =>
    blogsToShow
      .sort((a, b) => a.likes < b.likes)
      .map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          onClick={() => handleLike(blog.id)}
          onMouseDown={() => handleDelete(blog.id)}
          user={user}
        />
      ))

  return (
    <div>
      <h1> Blogs </h1>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            onSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p>
            {user.name}
            logged in
          </p>
          <button
            onClick={() => {
              window.localStorage.clear()
              setUser(null)
            }}
          >
            log out
          </button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              title={blogTitle}
              author={blogAuthor}
              url={blogUrl}
              onSubmit={addBlog}
            />
          </Togglable>
        </div>
      )}
      {user !== null ? rows() : ''}
    </div>
  )
}

export default App
