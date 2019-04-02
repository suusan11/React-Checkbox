import React, { Component } from 'react';

import Moon from './connection/Moon';
import ProvinceCheckbox from "./ProvinceCheckbox";

const moon = new Moon();

class CoveredAreaCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provinces:[
                {
                    province: "",
                    cities: []
                }
            ],
            isChecked: false
        };

        this.getCities = this.getCities.bind(this);
    }

    componentWillMount() {
        moon
            .get('api/area/all')
            .then(res =>{

                let provinces = [];

                for(let i = 0; i < res.data.length; i++) {
                    let obj = {
                        province: {},
                        cities: []
                    };
                    obj.province = { id: res.data[i]._id, name: res.data[i].name };
                    provinces.push(obj);
                }

                // let newProvinceArray = Object.assign({}, this.state.provinces.province);
                // // newProvinceArray.provinces[key].province = provinces;
                // newProvinceArray = provinces;

                this.setState({ provinces: provinces });

                console.log("🐷" + JSON.stringify(this.state.provinces)); //get province info about id and name
                console.log(this.state.provinces[0]);
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

        this.setState({isLoading:true})
        this.setState({isChecked: !this.state.isChecked});
        console.log("🤬"+ e.target.value);
        console.log("🍰" + e.target.id);
        console.log("🍥" + JSON.stringify(this.state.provinces));
        e.persist();

        this.state.provinces.map(prov => {

            if( prov.province.name === e.target.value ){

                moon
                    .get(`api/area/search/citylist/byareaid/${prov.id}`)
                    .then(res =>{
                        this.setState({isLoading:false})
                        // this.state.areaList.push(res.city);

                        console.log("🥝" + JSON.stringify(res.data));

                        let citiesArray = [];
                        res.data.map( eachCity => {
                            return citiesArray.push(eachCity.city);
                        });

                        console.log(this.state.areaList.length);
                        console.log("🍤" + this.state.areaList);
                    })

                // .catch(err => {
                //     this.disabledInput();
                //     this.setState({isLoading:false})
                //     console.log(JSON.stringify(err));
                // })

            } else return 0

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
                {this.state.provinces.map((prov, index) => (
                    <label>
                        <input key={index} type="checkbox" onClick={this.getCities} value={prov.province.name}/>{prov.province.name}
                        <br/>
                    </label>
                    )
                )}
            </div>
        );
    }
}

export default CoveredAreaCheckbox;