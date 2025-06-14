import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import Marketplace from './pages/Marketplace/Marketplace'
import MyPage from './pages/MyPage/MyPage'
import GlobalStyles from './styles/GlobalStyles'

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App 