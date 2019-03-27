import React, { Component } from 'react';
import ReactDOM from "react-dom";

import Moon from './connection/Moon';

const moon = new Moon();

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showArea: [],
            coveredArea: [],
            prov: [],
            areaList: [],
            isLoading: false,
            isChecked: false
        };

        this.handleCheck = this.handleCheck.bind(this);
        this.getProv = this.getProv.bind(this);
    }


    // ////////////////////////////////////////
    // disabledInput = () => {
    //     var element = ReactDOM.findDOMNode(this.input);
    //     element.setAttribute('disabled', 'true');
    // };
    // ////////////////////////////////////////


    ////////////////////////////////////////
    handleCheck() {
        this.setState({isChecked: !this.state.isChecked});
    }
    ////////////////////////////////////////

    componentWillMount() {
        moon
            .get('api/area/all')
            .then(res =>{

                let provArray = [];

                for(let i = 0; i < res.data.length; i++) {
                    let obj = {};
                    obj['id'] = res.data[i]._id;
                    obj['name'] = res.data[i].name;
                    provArray.push(obj);
                }

                this.setState({
                    prov: provArray });

                console.log("🐷" + JSON.stringify(this.state.prov));

            })
            // .catch(err => {
            //     this.disabledInput();
            //     console.log(JSON.stringify(err));
            // })
    }

    // Get data by Province
    ////////////////////////////////////////
    getProv(e){

        this.setState({isLoading:true})

        e.persist();

        console.log("🍒" + JSON.stringify(this.state.prov));

        this.state.prov.forEach(prov => {

            if(this.state.isChecked === true ){

                moon
                    .get(`api/area/search/citylist/byareaid/${prov.id}`)
                    .then(res =>{
                        this.setState({isLoading:false})
                        // this.state.areaList.push(res.city);

                        let arrayCity = [];
                        res.data.map( eachCity => {
                            console.log(eachCity);
                            return arrayCity.push(eachCity.city);
                        });

                        this.setState({areaList:arrayCity});
                        console.log("🐼" + JSON.stringify(this.state.areaList));
                    })

                    // .catch(err => {
                    //     this.disabledInput();
                    //     this.setState({isLoading:false})
                    //     console.log(JSON.stringify(err));
                    // })

            } else return 0

        })
        // console.log("🐼" + JSON.stringify(this.state.areaList));
    };
    ////////////////////////////////////////



    render() {
        return(
            <div className='App'>
                <div>

                    {this.state.prov.map((prov, index) =>
                    <div onChange={this.getProv}>
                        <input type="checkbox" name="areaList" key={index} value='' onChange={this.handleCheck} defaultChecked={this.state.checked} />{prov.name}

                        {this.state.areaList.map((city, index) =>
                        <div>
                            <input type="checkbox" key={index}/>{city}
                        </div>
                        )}

                    </div>
                    )}


                </div>
            </div>
        );
    }
}

export default Checkbox;