import blogService from '../services/blogs'

export const blogReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE':
      return state.map(blog =>
        blog.id === action.data.id ? action.data : blog
      )
    case 'NEW_COMMENT':
      return state.map(blog =>
        blog.id === action.data.id ? action.data : blog
      )
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const createNew = blog => {
  return async (dispatch, getState) => {
    try {
      const newBlog = await blogService.create(blog)
      const username = getState().user.username
      const userObj = {
        username,
        name: getState().user.name,
        id: newBlog.user
      }

      dispatch({
        type: 'NEW_BLOG',
        data: {...newBlog, user: userObj}
      })
    } catch (e) {
      console.log('#@!#@! ', e.message)
    }
  }
}

export const newComment = blogObj => {
  return async dispatch => {
    try {
      const comment = blogObj.comments
        ? blogObj.comment
        : [blogObj.comments, blogObj.comment]
      const newBlog = {...blogObj, comments: comment}
      await blogService.comment(newBlog)
      dispatch({
        type: 'NEW_COMMENT',
        data: blogObj
      })
    } catch (e) {
      console.log('#@!#@! ', e.message)
    }
  }
}

export const like = blogObj => {
  return async dispatch => {
    try {
      const newBlog = {...blogObj, likes: blogObj.likes + 1}
      await blogService.update(newBlog)
      dispatch({
        type: 'LIKE',
        data: newBlog
      })
    } catch (e) {
      console.log('#@!#@! ', e.message)
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      })
    } catch (e) {
      console.log('#@!#@! ', e.message)
    }
  }
}

export const remove = blogObj => {
  return async dispatch => {
    try {
      await blogService.remove(blogObj)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blogObj
      })
    } catch (e) {
      console.log('#@!#@! ', e.message)
    }
  }
}

export default blogReducer
