import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {useField} from '../hooks'
import {setNotification} from '../reducers/notificationReducer'
import {createNew} from '../reducers/blogReducer'
import {Form, Button} from 'semantic-ui-react'

const NewBlog = props => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const createBlog = async blog => {
    await props.createNew(blog)
  }

  const handleSubmit = event => {
    event.preventDefault()
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
      comments: []
    })
    props.setNotification(`New blog added: ${title.value}!`, 4000)
    props.newBlogRef.current.toggleVisibility()
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <div>
      <h2>create new</h2>

      <Form onSubmit={handleSubmit}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <Button primary type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  createNew,
  setNotification
}

const ConnectedNewBlog = connect(mapStateToProps, mapDispatchToProps)(NewBlog)

NewBlog.propTypes = {
  createNew: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default ConnectedNewBlog
