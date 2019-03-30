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
                    province: [],
                    cities: []
                }
            ],
            isChecked: false
        }

        this.getCities = this.getCities.bind(this);
    }

    componentWillMount() {
        moon
            .get('api/area/all')
            .then(res =>{

                let provinces = [Object.assign({}, this.state.provinces)];

                for(let i = 0; i < res.data.length; i++) {
                    let obj = {};
                    obj['province.id'] = res.data[i]._id;
                    obj['province.name'] = res.data[i].name;
                    provinces.push(obj);
                }


                this.setState({
                    provinces: provinces });

                console.log("🐷" + JSON.stringify(this.state.provinces)); //get province info about id and name

            })
        // .catch(err => {
        //     this.disabledInput();
        //     console.log(JSON.stringify(err));
        // })
    }

    // Get data by Province
    ////////////////////////////////////////
    getCities(e){

        this.setState({isLoading:true})
        this.setState({isChecked: !this.state.isChecked});
        console.log("🤬"+e.target.value);
        console.log("🍰" + e.target.id);

        e.persist();

        this.state.province.forEach(prov => {

            if( prov.name === e.target.value ){

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
                <ProvinceCheckbox
                    province = {this.state.provinces.province}
                    cities = {this.state.provinces.cities}
                />
            </div>
        );
    }
}

export default CoveredAreaCheckbox;