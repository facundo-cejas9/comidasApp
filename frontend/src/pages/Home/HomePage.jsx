import { useContext, useState } from 'react'
import { ExploreMenu } from '../../components/ExploreMenu/ExploreMenu'
import { Header } from '../../components/Header/Header'
import './Home.css'
import { FoodDisplay } from '../../components/FoodDisplay/FoodDisplay'
import { AppDownload } from '../../components/AppDownload/AppDownload'
import { StoreContext } from '../../context/StoreContext'


function HomePage({ searchTerm }) {

  const [category, setCategory] = useState('All')
  
  
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} searchTerm={searchTerm} />
    
    </div>
  );
}

export default HomePage