import React, { Component } from 'react';

import Moon from './connection/Moon';
import ProvinceCheckbox from "./ProvinceCheckbox";

const moon = new Moon();

const classNames = require('classnames');

class CoverdAreaCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProvArea: [],
            showCitiesArea: [],
            // checkedArea: [],
            provChecked: new Map(),
            // citiesChecked: new Map()
        };

        // this.getCities = this.getCities.bind(this);
    }

    componentDidMount() {
        moon
            .get('api/area/all')
            .then(res =>{

                const showProvArea = [];

                for(let i = 0; i < res.data.length; i++) {

                    showProvArea.push({
                        id: res.data[i]._id,
                        name: res.data[i].name
                    })

                    const id = res.data[i]._id;

                    moon
                        .get(`api/area/search/citylist/byareaid/${id}`)
                        .then(res => {

                            let showCitiesArea = {};

                            for(let i = 0; i < id.length; i++) {
                                // let obj = {};
                                // obj['id'] = res.data[i].area_id;
                                // cities.push({
                                //     id: res.data[i].area_id,
                                //     name:cityData.city,
                                //     isChecked:false
                                // });
                                // showCitiesArea.push(obj);
                            }
                            console.log(showCitiesArea);

                            const updatedProvinces = this.state.showProvArea;
                            const updatedCities = this.state.showCitiesArea;


                            for(let j = 0; j < updatedProvinces.length; j++) {


                                //チェックに応じた処理→チェックの取り外しやsetStateなど
                                // if(id === updatedProvinces[j].id) {
                                //     updatedProvinces[j]  = Object.assign({}, this.state.showProvArea[j], {cities})
                                //     updatedCities[j]  = Object.assign({}, this.state.showCitiesArea[j], {cities})
                                //     // updatedCities[j].push(cities);
                                // }　
                            }

                            this.setState({ showCitiesArea: updatedCities, }, () => {
                                // console.log("🐷CITIES" + JSON.stringify(this.state.showCitiesArea));
                            })
                        })
                }

                this.setState({ showProvArea }, () => {
                    // console.log("🐷PROV" + JSON.stringify(this.state.showProvArea)); //get province info about id and name
                })
            })

            // .catch(err => {
            //     this.disabledInput();
            //     console.log(JSON.stringify(err));
            // })
        console.log(this.state.showCitiesArea);
        console.log(this.state.showProvArea);

    }

    // Get data by Province
    ////////////////////////////////////////
    // getCities(e){
    //
    //     const provId = e.target.value;
    //
    //     const isProvChecked = e.target.checked;
    //     this.setState(prevState => ({ provChecked: prevState.provChecked.set(provId, isProvChecked) }));
    //     console.log("🍖" + [...this.state.provChecked]);
    //
    //         moon
    //             .get(`api/area/search/citylist/byareaid/${provId}`)
    //             .then(res => {
    //
    //                 // console.log("🍊" + prov.id);　//全部のprovinceのidが入ってる
    //
    //                 const cities = [];
    //
    //                 for(const cityData of res.data) {
    //                     cities.push(cityData.city);
    //                 }
    //
    //                 const updatedProvinces = this.state.showProvArea;
    //                 const updatedCities = this.state.showCitiesArea;
    //
    //                 for(let i = 0; i < updatedProvinces.length; i++) {
    //                     // console.log("🍒" + JSON.stringify(updatedProvinces));
    //                     // console.log("🍙" + JSON.stringify(res.data));//cities information relation between province id
    //
    //                     // console.log("🍬" + JSON.stringify(updatedProvinces[i].id));
    //
    //                     //チェックに応じた処理→チェックの取り外しやsetStateなど
    //                     if(provId === updatedProvinces[i].id) {
    //                         updatedProvinces[i]  = Object.assign({}, this.state.showProvArea[i], {cities})
    //                         updatedCities[i] = Object.assign({}, this.state.showCitiesArea[i], { cities });
    //
    //                         if(isProvChecked === true) {
    //                             this.setState({ citiesChecked: true })
    //                             updatedCities.push(this.state.citiesChecked);
    //                             this.setState({ showCitiesArea: updatedCities})
    //                             console.log("🍑" + cities + " " + this.state.citiesChecked);
    //
    //                             for(let i = 0; i < this.state.citiesChecked.length; i++) {
    //                                 if(this.state.citiesChecked[i] === true) {
    //                                 }
    //                             }
    //                         } else {
    //                             this.setState({ citiesChecked: false })
    //                         }
    //                     }
    //                 }
    //
    //                 this.setState({ showCitiesArea: updatedCities, }, () => {
    //                     console.log("🍤" + JSON.stringify(this.state.showProvArea));
    //                     console.log("🍤" + JSON.stringify(this.state.showCitiesArea));
    //                 })
    //
    //                 // const checkedArea = [];
    //
    //                 // for(let i = 0; i < this.state.showArea.length; i++) {
    //                 //     if(isChecked === true) {
    //                 //         checkedArea.push(this.state.showArea[e.target.value]);
    //                 //         this.setState({ checkedArea })
    //                 //     }
    //                 // }
    //                 // console.log("🥦" + JSON.stringify(this.state.checkedArea));
    //
    //
    //                 // if(this.state.provChecked.get(isChecked) === true) {
    //                 //     console.log("true!");
    //                 // }else {
    //                 //     console.log("false");
    //                 // }
    //
    //                 // for(let i = 0; i < showArea.length; i++) {
    //                 //     if(showArea[i].checked === isChecked) {
    //                 //         console.log("checked");
    //                 //     }
    //                 // }
    //             })
    //
    // };
    ////////////////////////////////////////

    handleAllChecked = (e) => {

        const provId = e.target.value;
        const isProvChecked = e.target.checked;
        this.setState(prevState => ({ provChecked: prevState.provChecked.set(provId, isProvChecked) }));
        console.log("🍖" + [...this.state.provChecked]);


        console.log("🍊" + this.state.showCitiesArea);
        // if(isProvChecked === true && provId === ) {
        //     this.setState({ citiesChecked: true })
        // }

    }


    //Check checkbox checked
    ////////////////////////////////////////
    // itemChecked = (e) => {
    //     let cities = this.state.provinces;
    //     cities.for(city => {
    //         if(city.value === e.target.value) {
    //             city.isChecked = e.target.checked
    //         }
    //     })
    //
    //     this.setState({ provinces: cities });
    //
    // }
    ////////////////////////////////////////


    render() {

        // console.log(this.state.showProvArea);
        // console.log(this.state.showCitiesArea);

        return(
            <div>

                {this.state.showProvArea.map((prov, index) => {
                    return (
                        <div className="coveredarea">
                            <ul className="input__parent">
                                <li>
                                    <h1>{prov.name}</h1>
                                    <input type="checkbox" value={prov.id} checked={this.state.provChecked.get(prov.id)} onClick={this.handleAllChecked}/>all

                                    <ul>
                                        {prov.cities ? (
                                            prov.cities.map((city, index) => {

                                                return (

                                                    <li>
                                                        <input type="checkbox" value={city.id} checked={this.state.citiesChecked}/>{city.name}
                                                        <br/>
                                                    </li>
                                                )
                                            })
                                        ) : ( " " )
                                        }
                                    </ul>

                                </li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default CoverdAreaCheckbox;