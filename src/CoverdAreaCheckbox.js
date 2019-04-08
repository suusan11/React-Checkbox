import React, { Component } from 'react';

import Moon from './connection/Moon';
import ProvinceCheckbox from "./ProvinceCheckbox";

const moon = new Moon();

class CoveredAreaCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provinces: [],
            isChecked: false
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

    };
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

                {this.state.provinces.map((prov, index) => (
                    <label>
                        <input type="checkbox" key={index} value={prov.id} onClick={this.getCities}/>{prov.name}
                        <br/>
                        <input type="checkbox" key={index} />
                    </label>
                ))}

            </div>
        );
    }
}

export default CoveredAreaCheckbox;