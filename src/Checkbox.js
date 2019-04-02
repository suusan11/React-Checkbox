import React, { Component } from 'react';
// import ReactDOM from "react-dom";

import Moon from './connection/Moon';


import ProvinceCheckBox from './ProvinceCheckbox';

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

        // this.handleCheck = this.handleCheck.bind(this);
        this.getProv = this.getProv.bind(this);
    }


    // ////////////////////////////////////////
    // disabledInput = () => {
    //     var element = ReactDOM.findDOMNode(this.input);
    //     element.setAttribute('disabled', 'true');
    // };
    // ////////////////////////////////////////


    ////////////////////////////////////////
    // handleCheck(e) {
    //     this.setState({isChecked: !this.state.isChecked});
    //     console.log("🤬"+e.target.value);
    // }
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

                // console.log("🐷" + JSON.stringify(this.state.prov));

            })
        // .catch(err => {
        //     this.disabledInput();
        //     console.log(JSON.stringify(err));
        // })
    }

    // Get data by Province
    ////////////////////////////////////////
    getProv(e){

        // this.setState({isLoading:true})
        this.setState({isChecked: !this.state.isChecked});
        console.log("🤬"+e.target.value);
        console.log("🍰" + e.target.id);

        e.persist();

        this.state.prov.forEach(prov => {

            if( prov.name === e.target.value ){

                moon
                    .get(`api/area/search/citylist/byareaid/${prov.id}`)
                    .then(res =>{
                        this.setState({isLoading:false})
                        // this.state.areaList.push(res.city);

                        console.log("🥝" + JSON.stringify(res.data));

                        let arrayCity = [];
                        res.data.map( eachCity => {
                            return arrayCity.push(eachCity.city);
                        });

                        if(prov.id === e.target.id) {
                            this.setState({areaList:arrayCity});
                        }



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
            <div className='App'>
                <div>

                    {/*{this.state.prov.map((prov, index) =>*/}
                        {/*<div onChange={this.getProv}>*/}
                            {/*<ul key={index}>*/}
                                {/*<li>*/}
                                    {/*<input type="checkbox" name="areaList" key={index} id={prov.id} value={prov.name} defaultChecked={this.state.isChecked} />*/}
                                    {/*{prov.name}*/}
                                    {/*<ul>*/}
                                        {/*<li>*/}
                                            {/*{this.state.areaList.map((city, index) =>*/}
                                                {/*<label>*/}
                                                    {/*<input type="checkbox" key={index}  checked={this.state.isChecked}/>*/}
                                                    {/*{city}*/}
                                                    {/*<br/>*/}
                                                {/*</label>*/}
                                            {/*)}*/}
                                        {/*</li>*/}
                                    {/*</ul>*/}
                                {/*</li>*/}
                                {/*<br/>*/}
                            {/*</ul>*/}

                        {/*</div>*/}
                    {/*)}*/}


                <ProvinceCheckBox
                    prov = {this.state.prov}
                    areaList = {this.state.areaList}
                />
                </div>
            </div>
        );
    }
}

export default Checkbox;