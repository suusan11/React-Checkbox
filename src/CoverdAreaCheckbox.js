import React, { Component } from 'react';

import Moon from './connection/Moon';
import ProvinceCheckbox from "./ProvinceCheckbox";

const moon = new Moon();

const classNames = require('classnames');

class CoveredAreaCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provinces: [],
            isChecked: ''
        };

        this.getCities = this.getCities.bind(this);
    }

    componentDidMount() {
        moon
            .get('api/area/all')
            .then(res =>{

                const provinces = [];

                for(let i = 0; i < res.data.length; i++) {
                    provinces.push({
                        id: res.data[i]._id,
                        name: res.data[i].name
                    })
                }

                // let newProvinceArray = Object.assign({}, this.state.provinces.province);
                // // newProvinceArray.provinces[key].province = provinces;
                // newProvinceArray = provinces;

                this.setState({ provinces }, () => {
                    console.log("🐷" + JSON.stringify(this.state.provinces)); //get province info about id and name
                })
            })
        // .catch(err => {
        //     this.disabledInput();
        //     console.log(JSON.stringify(err));
        // })
    }

    // componentDidMount() {
    //     this.getCities()
    // }

    // Get data by Province
    ////////////////////////////////////////
    getCities(e){

        const provId = e.target.value;
            moon
                .get(`api/area/search/citylist/byareaid/${provId}`)
                .then(res => {

                    // console.log("🍊" + prov.id);　//全部のprovinceのidが入ってる

                    const cities = [];

                    for(const cityData of res.data) {
                        cities.push(cityData.city);
                    }

                    const updatedProvinces = this.state.provinces;

                    for(let i = 0; i < updatedProvinces.length; i++) {
                        console.log("🍒" + JSON.stringify(updatedProvinces));
                        // console.log("🍙" + JSON.stringify(res.data));//cities information relation between province id

                        console.log("🍬" + JSON.stringify(updatedProvinces[i].id));

                        if(provId === updatedProvinces[i].id) {
                            updatedProvinces[i] = Object.assign({}, this.state.provinces[i], { cities });
                        }
                    }

                    this.setState({ provinces: updatedProvinces, }, () => {
                        console.log("🍤" + JSON.stringify(this.state.provinces));
                    })
                })

            const { isChecked } = e.target;
            this.setState({ isChecked });

    };
    ////////////////////////////////////////

    //get class name depend on checked state
    ////////////////////////////////////////
    getClassNames = () => {
        return classNames({
            'isShow': !this.state.isChecked,
            'isNotShow': this.state.isChecked
        });
    }
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

                {this.state.provinces.map((prov, index) => {
                    return (
                        <div className="coveredarea">
                            <ul className="input__parent">
                                <li>
                                    <input type="checkbox" key={index} value={prov.id} checked={this.state.isChecked} onClick={this.getCities}/>{prov.name}

                                    <ul className={this.getClassNames()}>
                                    {this.state.isChecked && prov.cities ? (
                                        prov.cities.map((city, index) => {

                                            return (

                                                    <li>
                                                        <input type="checkbox" key={index}/>{city}
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