import React, { useState, useContext } from 'react';
import SiteLogo from '../../UI/SiteLogo/SiteLogo';
import logo from '../../../src/image/newLogoDecktop.png'
import './viewSetting.css'
import PreviewBlock from './PreviewBlock/PreviewBlock';
import PreviewMode from './PreviewMode/PreviewMode';
import SaveSetting from './SaveSetting/SaveSetting';
import Context from '../../Context'
import InfoModal from '../InfoModal/InfoModal';

const ViewSetting = ({ decktopOrMobileMode }) => {
    const { state, infoModalState, setInfoModalState, changeState, setState, catalogId, setVidjetData, vidjArr, decktopMode, setDecktopMode } = useContext(Context)
    const [viewMode, setViewMode] = useState(false)
    const changeViewMode = (viewMode) => {
        console.log('change view', decktopMode, viewMode)
        /* Отключил для включения сначала десктоп версии предпросмотра */
        /* decktopOrMobileMode() */
        setDecktopMode(s => !s)
        setViewMode(state => !state)
        console.log(decktopMode)
    }


    const saveSite = () => {
        setInfoModalState(s => ({
            ...s,
            isOpen: true, // Флаг отображения
            content: 'Ваш каталог будет сохранен на сервисе. Вы сможете его опубликовать или внести перейдя в категорию <b>МОИ ВЕБ-САЙТЫ</b> ', // Видимый контент
            title: 'Сохранение каталога',
            showFooter: false,
        }))

        setTimeout(() => {
            setInfoModalState(s=>({ 
                ...s, isOpen: false 
            }))
            window.location.replace('https://cloudsgoods.com/work/user/my/siteBuilder.php')
        }, 1000)
    }

    const typeViewMode = (type) => {
        console.log(type)
    }

    return (
        <div className='view-setting d-flex'>
            { !viewMode ? (
                <React.Fragment>
                    <div className='view-setting-left-block d-flex'>
                        <SiteLogo img={logo} link={'https://cloudsgoods.com/'} />
                        {/* <DirectionSetting /> */}
                        {/*  <ColorSetting leftBorder={false} title='backgroundColor' /> */}
                        {/*  <ColorSetting leftBorder = {false} title = 'titleBackground'/> */}
                    </div>
                    <div className='view-setting-right-block d-flex'>
                        <PreviewBlock changeViewMode={changeViewMode} />
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <PreviewMode decktopOrMobileMode={decktopOrMobileMode} typeViewMode={typeViewMode} changeViewMode={changeViewMode} />
                </React.Fragment>

            )}
            <SaveSetting onClickHandler={saveSite} />
        </div>
    )
}
export default ViewSetting