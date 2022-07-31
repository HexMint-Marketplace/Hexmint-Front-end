import React from 'react'
import CommonHeader from '../components/ui/CommonHeader/CommonHeader'
import ExploreList from '../components/ui/ExploreList/ExploreList'

function Explore() {
  return (
    <div>
    <CommonHeader title={'Explore Collections'}/>
    <ExploreList/>
    </div>
  )
}

export default Explore