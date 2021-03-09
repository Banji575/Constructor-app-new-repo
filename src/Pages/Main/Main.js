import React from 'react'
import BlockEditor from '../../components/BlockEditor/BlockEditor'
import SiteBody from '../../components/SiteBody/SiteBody'
import { VidjetAddWrapper } from '../../ContextAddBlock'
import Body from '../../HOC/SiteBody'



const Main = ({ state, vidjetData, replaceVidj, setVidjetData, mobileMode }) => {
  return (
    <Body state={state}>
      <div>
        <VidjetAddWrapper>
          {vidjetData ? <SiteBody replaceVidj={replaceVidj} setVidjetData={setVidjetData} vidjArr={vidjetData} mobileMode={mobileMode} /> : null}
          <BlockEditor setVidjetData={setVidjetData} vidjArr={vidjetData} />
        </VidjetAddWrapper>
      </div>
    </Body>
  )
}
export default Main