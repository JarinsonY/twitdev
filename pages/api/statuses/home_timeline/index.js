const timeline = [
  {
    id: "0",
    avatar: "https://avatars.githubusercontent.com/u/19658821?v=4",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%

    (gzipped size went from 16.6 KB down to 2.7 KB!!)
    
    * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "1",
    avatar:
      "https://pbs.twimg.com/profile_images/1083714591752941568/Q7LnIANs_reasonably_small.jpg",
    username: "midudev",
    message: "Wow, twitdev está funcionando y vivo 🦉",
    name: "Miguel Ángel Durán",
  },
  {
    id: "2",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar: "https://avatars.githubusercontent.com/u/19658821?v=4",
    message: `Abro paraguas Paraguas
    
    Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
  {
    id: "3",
    avatar: "https://avatars.githubusercontent.com/u/19658821?v=4",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%

    (gzipped size went from 16.6 KB down to 2.7 KB!!)
    
    * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "4",
    avatar:
      "https://pbs.twimg.com/profile_images/1083714591752941568/Q7LnIANs_reasonably_small.jpg",
    username: "midudev",
    message: "Wow, twitdev está funcionando y vivo 🦉",
    name: "Miguel Ángel Durán",
  },
  {
    id: "5",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar: "https://avatars.githubusercontent.com/u/19658821?v=4",
    message: `Abro paraguas Paraguas
    
    Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
  {
    id: "6",
    avatar: "https://avatars.githubusercontent.com/u/19658821?v=4",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%

    (gzipped size went from 16.6 KB down to 2.7 KB!!)
    
    * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "7",
    avatar:
      "https://pbs.twimg.com/profile_images/1083714591752941568/Q7LnIANs_reasonably_small.jpg",
    username: "midudev",
    message: "Wow, twitdev está funcionando y vivo 🦉",
    name: "Miguel Ángel Durán",
  },
  {
    id: "8",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar: "https://avatars.githubusercontent.com/u/19658821?v=4",
    message: `Abro paraguas Paraguas
    
    Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
  {
    id: "9",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar: "https://avatars.githubusercontent.com/u/19658821?v=4",
    message: `Abro paraguas Paraguas
    
    Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
  {
    id: "10",
    avatar: "https://avatars.githubusercontent.com/u/19658821?v=4",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%

    (gzipped size went from 16.6 KB down to 2.7 KB!!)
    
    * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "11",
    avatar:
      "https://pbs.twimg.com/profile_images/1083714591752941568/Q7LnIANs_reasonably_small.jpg",
    username: "midudev",
    message: "Wow, twitdev está funcionando y vivo 🦉",
    name: "Miguel Ángel Durán",
  },
  {
    id: "12",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar: "https://avatars.githubusercontent.com/u/19658821?v=4",
    message: `Abro paraguas Paraguas
    
    Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
]

export default (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(timeline))
}
