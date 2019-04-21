import React, { Component } from 'react';

import Moon from './connection/Moon';
import ProvinceCheckbox from "./ProvinceCheckbox";

const moon = new Moon();

const classNames = require('classnames');

class CoveredAreaCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProvArea: [],
            showCitiesArea: [],
            checkedArea: [],
            provChecked: new Map(),
            citiesChecked: new Map()
        };

        this.getCities = this.getCities.bind(this);
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

                    moon
                        .get(`api/area/search/citylist/byareaid/${res.data[i]._id}`)
                        .then(res => {
                            const cities = [];

                            for(const cityData of res.data) {
                                cities.push(cityData.city);
                            }
                            console.log("🍍" + cities);
                        })
                }

                this.setState({ showProvArea }, () => {
                    console.log("🐷PROV" + JSON.stringify(this.state.showProvArea)); //get province info about id and name
                })
            })

        .catch(err => {
            this.disabledInput();
            console.log(JSON.stringify(err));
        })

    }

    // Get data by Province
    ////////////////////////////////////////
    getCities(e){

        const provId = e.target.value;

        const isProvChecked = e.target.checked;
        this.setState(prevState => ({ provChecked: prevState.provChecked.set(provId, isProvChecked) }));
        console.log("🍖" + [...this.state.provChecked]);

            moon
                .get(`api/area/search/citylist/byareaid/${provId}`)
                .then(res => {

                    // console.log("🍊" + prov.id);　//全部のprovinceのidが入ってる

                    const cities = [];

                    for(const cityData of res.data) {
                        cities.push(cityData.city);
                    }

                    const updatedProvinces = this.state.showProvArea;
                    const updatedCities = this.state.showCitiesArea;

                    for(let i = 0; i < updatedProvinces.length; i++) {
                        // console.log("🍒" + JSON.stringify(updatedProvinces));
                        // console.log("🍙" + JSON.stringify(res.data));//cities information relation between province id

                        // console.log("🍬" + JSON.stringify(updatedProvinces[i].id));

                        //チェックに応じた処理→チェックの取り外しやsetStateなど
                        if(provId === updatedProvinces[i].id) {
                            updatedProvinces[i]  = Object.assign({}, this.state.showProvArea[i], {cities})
                            updatedCities[i] = Object.assign({}, this.state.showCitiesArea[i], { cities });

                            if(isProvChecked === true) {
                                this.setState({ citiesChecked: true })
                                updatedCities.push(this.state.citiesChecked);
                                this.setState({ showCitiesArea: updatedCities})
                                console.log("🍑" + cities + " " + this.state.citiesChecked);

                                for(let i = 0; i < this.state.citiesChecked.length; i++) {
                                    if(this.state.citiesChecked[i] === true) {
                                    }
                                }
                            } else {
                                this.setState({ citiesChecked: false })
                            }
                        }
                    }

                    this.setState({ showCitiesArea: updatedCities, }, () => {
                        console.log("🍤" + JSON.stringify(this.state.showProvArea));
                        console.log("🍤" + JSON.stringify(this.state.showCitiesArea));
                    })

                    // const checkedArea = [];

                    // for(let i = 0; i < this.state.showArea.length; i++) {
                    //     if(isChecked === true) {
                    //         checkedArea.push(this.state.showArea[e.target.value]);
                    //         this.setState({ checkedArea })
                    //     }
                    // }
                    // console.log("🥦" + JSON.stringify(this.state.checkedArea));


                    // if(this.state.provChecked.get(isChecked) === true) {
                    //     console.log("true!");
                    // }else {
                    //     console.log("false");
                    // }

                    // for(let i = 0; i < showArea.length; i++) {
                    //     if(showArea[i].checked === isChecked) {
                    //         console.log("checked");
                    //     }
                    // }
                })

    };
    ////////////////////////////////////////


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

        return(
            <div>
                {/*<ProvinceCheckbox*/}
                    {/*getCities = {this.getCities}*/}
                    {/*province = {this.state.province}*/}
                    {/*cities = {this.state.cities}*/}
                {/*/>*/}
                {/*{this.state.provinces.map((prov, index) => (*/}
                    {/*<ul>*/}
                        {/*<li><input key={index} type="checkbox" onClick={this.getCities} value={prov.name}/>{prov.name}</li>*/}
                        {/*<br/>*/}

                        {/*{prov.cities.map((cities, index) => (*/}
                            {/*<ul>*/}
                                {/*<li><input key={index} type="checkbox" onClick={this.getCities} value={cities}/>{cities}</li>*/}
                                {/*<br/>*/}
                            {/*</ul>*/}
                        {/*))}*/}

                    {/*</ul>*/}
                {/*))}*/}

                {this.state.showProvArea.map((prov, index) => {
                    return (
                        <div className="coveredarea">
                            <ul className="input__parent">
                                <li>
                                    <input type="checkbox" key={index} value={prov.id} checked={this.state.provChecked.get(prov.id)} onClick={this.getCities} />{prov.name}

                                    <ul>
                                    {prov.cities ? (
                                        prov.cities.map((city, index) => {

                                            return (

                                                    <li>
                                                        <input type="checkbox" key={index} value={city.id} checked={this.state.citiesChecked} onChange={this.itemChecked}/>{city}
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

export default CoveredAreaCheckbox;