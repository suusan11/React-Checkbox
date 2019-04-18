import React, { Component } from 'react';

import Moon from './connection/Moon';
import ProvinceCheckbox from "./ProvinceCheckbox";

const moon = new Moon();

const classNames = require('classnames');

class CoveredAreaCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showArea: [],
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

                const showArea = [];

                for(let i = 0; i < res.data.length; i++) {
                    showArea.push({
                        id: res.data[i]._id,
                        name: res.data[i].name
                    })
                }

                this.setState({ showArea }, () => {
                    console.log("🐷" + JSON.stringify(this.state.showArea)); //get province info about id and name
                })
            })
        // .catch(err => {
        //     this.disabledInput();
        //     console.log(JSON.stringify(err));
        // })
    }

    // Get data by Province
    ////////////////////////////////////////
    getCities(e){

        const provId = e.target.value;

        const isChecked = e.target.checked;
        this.setState(prevState => ({ provChecked: prevState.provChecked.set(provId, isChecked) }));
        console.log("🍖" + [...this.state.provChecked]);


            moon
                .get(`api/area/search/citylist/byareaid/${provId}`)
                .then(res => {

                    // console.log("🍊" + prov.id);　//全部のprovinceのidが入ってる

                    const cities = [];

                    for(const cityData of res.data) {
                        cities.push(cityData.city);
                    }

                    const updatedProvinces = this.state.showArea;

                    for(let i = 0; i < updatedProvinces.length; i++) {
                        // console.log("🍒" + JSON.stringify(updatedProvinces));
                        // console.log("🍙" + JSON.stringify(res.data));//cities information relation between province id

                        // console.log("🍬" + JSON.stringify(updatedProvinces[i].id));

                        if(provId === updatedProvinces[i].id) {
                            updatedProvinces[i] = Object.assign({}, this.state.showArea[i], { cities });

                            if(isChecked === true) {
                                this.setState({ citiesChecked: true })
                                console.log("🍑" + cities + " " + this.state.citiesChecked);
                            } else {
                                this.setState({ citiesChecked: false })
                            }
                        }
                    }



                    this.setState({ showArea: updatedProvinces, }, () => {
                        console.log("🍤" + JSON.stringify(this.state.showArea));
                    })

                    // const checkedArea = [];

                    // for(let i = 0; i < this.state.showArea.length; i++) {
                    //     if(isChecked === true) {
                    //         checkedArea.push(this.state.showArea[e.target.value]);
                    //         this.setState({ checkedArea })
                    //     }
                    // }
                    // console.log("🥦" + JSON.stringify(this.state.checkedArea));
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

                {this.state.showArea.map((prov, index) => {
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