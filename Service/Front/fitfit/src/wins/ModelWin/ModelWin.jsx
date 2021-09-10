import React from 'react';
import FormHorizontal from "../../components/FormHorizontal";
import SizeTable from "../../components/SizeTable";
import Model from "../../components/Model";
import DogModelLabel from "../../components/DogModelLabel";
import {modelWindowHelpText} from "../../data/helpContent";
import './ModelWin.css';
import HelpContent from "../../components/HelpContent";
import {helpClick} from "../../components/HelpContent/HelpContent";


const ModelWin = ({params, clothesType, sizes}) => {

    return (
        <div className="modal fade" id="Model" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
             aria-labelledby="ModelLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
                <div className="modal-content" >
                    <div className="modal-header" style={{borderBottom: "none"}}>
                        <span className="clickable item-inactive" data-bs-toggle="collapse" data-bs-target="#helpModelWindow"
                              aria-expanded="false" aria-controls="helpModelWindow"
                              onClick={(el) => helpClick(el, 'model-win')}>Помощь</span>
                        <button type="button" className="btn-close float-end" data-bs-dismiss="modal"
                                data-bs-target="#mainWin" data-bs-toggle="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body window-color">
                        <div className="container-lg rounded px-5 px-lg-0 window">

                            <div className="collapse" id="helpModelWindow" >
                                <HelpContent helpText={modelWindowHelpText} />
                            </div>

                            <div className="row row-cols-lg-2" id="model-win">
                                <div className="col col-lg-8 container px-0 mb-5 mb-lg-0" style={{height: "80vh"}}>
                                    <div className="" style={{marginRight: "20px", height: "480px"}}>
                                        <Model/>
                                    </div>
                                    <div className="container-fluid mx-0 py-2">
                                        <FormHorizontal prevParams={params.params}/>
                                    </div>
                                </div>
                                <div className="col col-lg-4 position-relative table-pos" style={{height: "74vh"}}>
                                    <div className="container-fluid">
                                        {/*<div className="mb-3 fw-bold">Размеры</div>*/}
                                        <div className="text-small" style={{overflowX: "auto"}}>
                                            <SizeTable hover={true} sizes = {sizes.sizes} clothesType={clothesType}
                                                       titles = {sizes.titles} dogParams={params.params? params.params : null}
                                                       selected={{'first' : params.selected ? params.selected.first : ""}}/>
                                        </div>
                                    </div>
                                    <DogModelLabel />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModelWin;

