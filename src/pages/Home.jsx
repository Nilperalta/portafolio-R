import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Technologies from '../components/sections/Technologies'
import About from '../components/sections/About'
import Services from '../components/sections/Services'
import Projects from '../components/projects/Projects'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Technologies />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
