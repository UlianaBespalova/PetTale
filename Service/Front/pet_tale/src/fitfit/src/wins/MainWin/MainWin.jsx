import React, {useEffect, useState} from 'react';
import Tab from "../../components/Tab";
import SizeTab from "../../components/SizeTab";
import PhotoTab from "../../components/PhotoTab";
import RecommendsTab from "../../components/RecommendsTab";
import { mainWindowHelpText } from "../../data/helpContent";
import './MainWin.css';
import HelpContent from "../../components/HelpContent";
import {helpClick} from "../../components/HelpContent/HelpContent";


const MainWin = ({updateParams, clothesType, fitfitSimilarList, fitfitRecomsList, sizes, itemImg, userId}) => {

    const [userParams, setUserParams] = useState();

    return (
        <div className="modal fade" id="mainWin" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
             aria-labelledby="mainWinLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header" style={{borderBottom: "none"}}>
                        <span className="clickable item-inactive" data-bs-toggle="collapse" data-bs-target="#helpMainWindow"
                              aria-expanded="false" aria-controls="helpMainWindow"
                              onClick={(el) => helpClick(el, 'tabs')}>Помощь</span>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body window-color">
                        <div className="container-lg rounded py-3 px-0 min-vh-100 window">

                            <div className="collapse" id="helpMainWindow">
                                <HelpContent helpText={mainWindowHelpText} />
                            </div>

                            <div className="row mx-0 accordion" id="tabs">
                                <div className="col-lg-5 mt-0">
                                    <div style={{height: "400px", overflow: "hidden"}}>
                                        <img style={{minHeight: "400px", overflow: "hidden", marginTop: '-20%'}} src={itemImg}
                                             className="card-img-top" alt="..." />
                                    </div>
                                    <div className="mt-3" id="leftList">
                                        <div className="size" hidden={true}><Tab title="Подбор размера" label="size" /></div>
                                        <div className="photo"><Tab title="Похожие товары" label="photo" /></div>
                                        <div className="recommendations"><Tab title="Рекомендации" label="recommendations" /></div>
                                    </div>
                                </div>
                                <div className="col-lg-7 pt-4 p-lg-0">
                                    <div className="col-lg-8" id="rightList">
                                        <div className="size"><Tab title="Подбор размера" label="size"/></div>
                                        <div className="photo" hidden={true}><Tab title="Похожие товары" label="photo"/></div>
                                        <div className="recommendations" hidden={true}><Tab title="Рекомендации" label="recommendations"/></div>
                                    </div>
                                    <SizeTab updateParams={updateParams} setUserParams={setUserParams} clothesType={clothesType} sizes={sizes}/>
                                    <PhotoTab itemList={fitfitSimilarList} params={userParams}/>
                                    <RecommendsTab itemList={fitfitRecomsList} params={userParams} userId={userId}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MainWin;

