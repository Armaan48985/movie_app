import { Poppins, Roboto } from 'next/font/google'
 
const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
  })

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

export default roboto