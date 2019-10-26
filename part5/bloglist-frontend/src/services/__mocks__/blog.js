const blogs = [
  {
    title: 'This is a test',
    author: 'Daniel Biagi',
    url: 'www.danielbiagi.dev',
    likes: 14,
    user: {
      username: 'batman',
      name: 'batman.. batman...',
      id: '5d92bc40f1ae44733e54b07c'
    },
    id: '5d93c634ed1635291be626b6'
  },
  {
    title: 'How to make enemies',
    author: 'Daniel Biagi',
    url: 'www.danielbiagi.dev/test2',
    likes: 7,
    user: {
      username: 'melpaulo',
      name: 'Mel Paulo Jocklous',
      id: '5d93a435f250481ce69fbdc8'
    },
    id: '5d9518c2ebba72168f3e9e19'
  },
  {
    title: 'Mongo DB Collections',
    author: 'MongoDB Team',
    url: 'https://cloud.mongodb.com/',
    likes: 0,
    user: {
      username: 'hihihi',
      name: 'Felizberto',
      id: '5d9cea05765c6c1c51fc8b48'
    },
    id: '5d9d23f13d1236334e3da87b'
  },
  {
    title: 'Agora vai',
    author: 'Daniel Biagi',
    url: 'Ou não??',
    likes: 16,
    user: {
      username: 'hihihi',
      name: 'Felizberto',
      id: '5d9cea05765c6c1c51fc8b48'
    },
    id: '5d9d243f3d1236334e3da87d'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default {getAll}
