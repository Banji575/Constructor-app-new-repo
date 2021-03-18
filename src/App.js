import React, { useEffect, useState } from 'react'
import ViewSetting from './components/ViewSetting/ViewSetting';
import Context from './Context'
import SiteHeader from './components/SiteHeader/SiteHeader'
import MenuCreation from './components/MenuCreation/MenuCreation';
import useFetch from './hooks/useFetch'
import Adapter from './scripts/Adapter';
import Main from './Pages/Main/Main';
import Items from './Pages/Items/Items'
import { Route, Switch } from 'react-router-dom'
import MobilePreview from './Pages/MobilePreview/MobilePreview';
import './app.css'
import BreadCrumbs from './components/BreadCrumbs/BreadCrumbs';
import { getUrlParams } from './scripts/Common';
import InfoModal from './components/InfoModal/InfoModal';





const URL = '/work/user/site-creator/index.php/'
// const catalogId = window.location.href.split('?').slice(1).map(i => i.split('='))[0][1]
const catalogId = getUrlParams()['id']
const menuId = getUrlParams()['menu_id']
const MOBILE_GET_PARAM = 'mobile-mode'
const isFrameMode = window.location.href.split('?').indexOf(MOBILE_GET_PARAM) + 1


function App() {
  const [response, doFetch] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog&catalog_id=${catalogId}`)
  const [respReplace, doFetchReplace] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=replace_order_landing_prop_data&catalog_id=${catalogId}`)
  const [responseVidjetData, doFetchVidjetData] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog_landing_props_data_in_catalog&catalog_id=${catalogId}`)
  const [dataLoading, setDataLoading] = useState(false)
  const [vidjecLoading, setVidjetLoading] = useState(false)
  const [stateApp, setStateApp] = useState('')
  const [vidjetData, setVidjetData] = useState(null)
  const [mobileMenuIsOpen, setMobilemenuIsOpen] = useState(true)

  /* const [decktopMode, setDecktopMode] = useState(false) */
  const [decktopMode, setDecktopMode] = useState(isFrameMode > 0 ? false : true)
  const [mobileMode, setMobileMode] = useState(false)
  const [urlCatalogId, setUrlCatalogId] = useState(menuId || 2501)
  /* const href = window.location.href.split('?')[1].split('&')[1].split('=')[1] */
  // console.log('catalogId', urlCatalogId)
  const apiKey = 'api_key=mwshe2txo5nlz5dw6mvflji7y0srqyrn2l04l99v--tb3ys30i7m9bis2t0aoczw2a280e2e2ddedf8fe9acfe5625949396';

/**
 * README
 * При использовании setInfoModalState
 * необходимо передавать предыдущий infoModalState
 * пример: setInfoModalState(...infoModalState, [key]: value)
 * 
 */
  const [infoModalState, setInfoModalState] = useState({
    isOpen: false, // Флаг отображения
    content: 'Пусто', // Видимый контент
    title: 'Пустой тайтл', // Тайтл окна
    saveButtonText: 'Сохранить', // Текст кнопки сохранить
    showFooter: true, // Флаг отображения Footera с кнопками
    onSave: (e) => console.log('Сохранено', e) // Функция, при нажатии на сохранить вид: (e) => false 
  })

  const DEMO_STATE = {
    bread_crumbs_settings: {},
    count_objects: null,
    create_date: null,
    default_language_id: null,
    footer: null,
    google_analytics_id: null,
    id: null,
    languages_translate: null,
    login: null,
    menuDirection: null,
    menu_settings: {},
    origin_language_id: null,
    remove_date: null,
    removed: null,
    settings: {},
    siteLogo: null,
    siteMenu: {},
    siteTitle: null,
    siteVidjets: null,
    status: null,
    titleBackground: null,
    update_date: null,
    user_id: null,
  }

  const [state, setState] = useState(DEMO_STATE)

  useEffect(() => {
    doFetch()
  }, [])

  useEffect(() => {
    doFetchVidjetData()
  }, [])

  useEffect(() => {
    if (!responseVidjetData) {
      return
    }
    setVidjetLoading(true)
    const adapter = new Adapter(responseVidjetData)
    const data = adapter.createVidjetData()

    setVidjetData(data)
  }, [responseVidjetData])




  useEffect(() => {
    if (!response && !responseVidjetData) {
      return
    }
    setStateApp(response)
  }, [response])


  //перемещение виджета

  const replaceVidj = (direction, id) => {
    const list = [...vidjetData]

    let i;
    let elId;
    list.forEach((el, index) => {
      if (!el) return
      if (direction === 'up' && index == 0) return
      if (direction !== 'up' && index == list.length - 1) return

      if (el.id == id) {
        elId = el.id
        i = index
      }
    })
    direction === 'up' ? [list[i], list[i - 1]] = [list[i - 1], list[i]] : [list[i], list[i + 1]] = [list[i + 1], list[i]]


    const formData = new FormData()
    formData.set('landing_prop_data_id', elId)
    formData.set('order_num', direction === 'up' ? i : i + 2)
    doFetchReplace(formData)
    setVidjetData(list)
  }


  // Для Header сайта
  const changeState = (props) => {
    if (typeof props === 'object') {
      const propsName = Object.keys(props)[0]
      const newState = { ...state }
      newState[propsName] = props[propsName]
      setState(newState)

    }
    switch (props) {
      case 'checked':
        const verticalMenu = !state.verticalMenu
        const newState = { ...state, verticalMenu }
        setState(newState)
        break
      default:
        break
    }
  }


  const menuDirectionClasses = ['d-flex']
  const styleClassHeader = []

  if (state.menuDirection == '1') {
    menuDirectionClasses.push('verticalDirection')
  } else {
    styleClassHeader.push('horizontalDirection')
    menuDirectionClasses.push('horizontalDirection')
  }

  //десктопное -мобильное отображение
  const decktopOrMobileMode = () => {
    setDecktopMode(s => !s)
    setMobileMode(s => !s)
  }

  //Функция только для фрейма

  const findMobileGetParam = () => {
    const href = window.location.href.split('?')
    console.log(href, ';ladkjsflkjasdfljasdflkjasdfkljasfkljadsklfjdasklfjdaskljfdskljdskljdfs')
    const isMobile = href.indexOf(MOBILE_GET_PARAM) + 1
    return isMobile
  }

  console.log(findMobileGetParam(), 'firndmobilegetpos')

  useEffect(() => {
    fetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog&catalog_id=${catalogId}&${apiKey}`)
      .then(resp => resp.json())
      .then(json => {
        if (!json) return
        const adapter = new Adapter(json)
        const datass = adapter.createData()

        setState(datass)
        console.log('useEffectssss', datass)
      })
  }, [])

  const contextValue = {
    state, 
    changeState, 
    setState, 
    catalogId, 
    setVidjetData, 
    vidjetData, 
    decktopMode, 
    setDecktopMode, 
    setUrlCatalogId, 
    mobileMode, 
    infoModalState, 
    setInfoModalState
  }
  return (
    <React.Fragment>
     {!state.id &&
        <div className='d-flex h-100' >
          <div class="spinner-border mx-auto my-auto" role="status">
            <span class="sr-only ">Loading...</span>
          </div>
        </div>
      }
      {state.id &&
        <Context.Provider value={contextValue}>
          <div className="app">
            {!isFrameMode ? <ViewSetting decktopOrMobileMode={decktopOrMobileMode} /> : null}

            {!mobileMode ? <SiteHeader menuIsClose={mobileMenuIsOpen} styleClassHeader={styleClassHeader} changeViewMenu={setMobilemenuIsOpen} /> : null}
            <div className={menuDirectionClasses.join(' ')}>
              {!mobileMode ? <MenuCreation changeViewMenu={setMobilemenuIsOpen} menuIsClose={mobileMenuIsOpen} /> : null}

              <Switch>
                <Route exact path='/work/user/site-creator/index.php'>
                  {mobileMode ? <MobilePreview /> : null}
                  <Main state={state} vidjetData={vidjetData} replaceVidj={replaceVidj} setVidjetData={setVidjetData} mobileMode={mobileMode} />
                </Route>
                <Route path='/work/user/site-creator/items'>
                  <BreadCrumbs catalogId={catalogId} currentId={urlCatalogId} />
                  <Items menuId={urlCatalogId} />
                </Route>
              </Switch>

            </div>
          </div>

          <InfoModal />
          {/* <button className="" onClick={() => setInfoModalState({ ...infoModalState, saveButtonText: 'Попробуй нажми', content: 'Vasy жи есть', title: 'Нет документации', isOpen: true, showFooter: false })}>Открыть окно</button> */}
        </Context.Provider>
      }
    </React.Fragment>
  )
}


export default App;
