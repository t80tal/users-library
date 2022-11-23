interface Person {
  name: {
    title: string
    first: string
    last: string
  }
  email: string
  picture: {
    medium: string
  }
  location: {
    country: string
    city: string
    street: {
      number: string
      name: string
    }
  }
  login: {
    uuid: string
  }
}

export default Person
